// Importa los módulos necesarios
import { pool } from '../bd.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads/imageRealEstate/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

export const upload = multer({ storage });



// Función para registrar inmuebles
export const registroInmueble = async (req, res) => {
  const { numPisos, estadoConstruccion, areaConstruida, areaLote, numHabitaciones, numBanos, direccion, barrio, precio, tipoInmueble } = req.body;

  try {
    // Verifica si hay un archivo adjunto
    if (!req.file) {
      return res.status(400).json({ message: 'No se ha proporcionado un archivo de imagen.' });
    }

    const { filename } = req.file;
    const imagePath = 'src/uploads/imageRealEstate/' + filename;

    // Lee los datos binarios de la imagen
    const imageBuffer = fs.readFileSync(imagePath);

    // Llama al procedimiento almacenado para insertar el inmueble
    const [rows] = await pool.query('CALL sp_insert_inmueble(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [numPisos, estadoConstruccion, areaLote, areaConstruida, numHabitaciones, imageBuffer, numBanos, direccion, barrio, precio, tipoInmueble]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json();
    } else {
      res.send(rows);
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Algo salió mal',
      error: error.message // Devuelve el mensaje de error específico
    });
  }
};


//funcion para actualizar e inactivar 
export const actualizarInmueble = async (req, res) => {
  const { id } = req.params
  const { numPisos, estadoConstruccion, areaConstruida, areaLote, numHabitaciones, numBanos, direccion, precio, barrio, tipoInmueble } = req.body;
  const filename = req.file ? req.file.filename : null;
  const imagePath = 'src/uploads/imageRealEstate/' + filename;

  try {
    // Lee los datos binarios de la imagen
    const imageBuffer = req.file ? fs.readFileSync(imagePath) : null;

    const [rows] = await pool.query('call sp_update_inmueble(?,?,?,?,?,?,?,?,?,?,?,?)',
      [numPisos, estadoConstruccion, areaConstruida, areaLote, numHabitaciones, imageBuffer, numBanos, direccion, barrio, precio,tipoInmueble,  id])
    if (rows.affectedRows === 0) return res.status(404);
    res.send([rows])
  }
  catch (error) {
    return res.status(500).json({
      message: 'something goes wrong',
      error
    })
  }

}


//consultar todos los inmuebles
export const consultarInmuebles = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Inmueble');

    const images = [];

    for (const img of rows) {
      const imagePath = `${img.idInmueble}.jpg`;

      // Asegúrate de que img.imagenes contiene datos binarios
      const imageBuffer = Buffer.from(img.imagenes, 'base64');

      await fs.promises.writeFile(path.join('src/dbFiles/images/', imagePath), imageBuffer);

      images.push({
        id: img.idInmueble,
        imagen: imagePath
      });
    }

    console.log(images)
    res.json({ rows, images });

  } catch (error) {
    console.error('Error al consultar inmuebles:', error);
    res.status(500).json({
      message: 'Something went wrong',
      error,
    });
  }
};


export const verInmueble = async (req, res) => {
  const { idInmueble } = req.params;
  try {
    let [rows] = await pool.query('SELECT * FROM Inmueble WHERE idInmueble = ?', [idInmueble]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Inmueble no encontrado' });
    }

    const img = rows[0];
    const imagePath = `${img.idInmueble}.jpg`;

    // Asegúrate de que img.imagenes contiene datos binarios
    const imageBuffer = Buffer.from(img.imagenes, 'base64');

    await fs.promises.writeFile(path.join('src/dbFiles/images/', imagePath), imageBuffer);

    const imageResult = {
      id: img.idInmueble,
      imagen: imagePath
    };

    rows = rows[0]

    console.log({ rows, imageResult }); // Resultado de la imagen individual
    res.json({ rows, imageResult });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el inmueble' });
  }
};
