import { pool } from '../bd.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'src/uploads/imageProyects/'); // Directorio donde se almacenarán las imágenes 
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Renombrar el archivo
    }
  });
  
export const upload = multer({ storage });

//Funcion para registrar inmuebles
export const registroProyect=async(req,res)=>{
    const {numPisos, estadoConstruccion, areaLote, areaConstruida, numHabitaciones, numBanos, direccion, barrio, precio, tipoInmueble, descripcion}=req.body;
    const filename = req.file ? req.file.filename : null;
    const imagePath = 'src/uploads/imageProyects/' + filename;
  
    try {
      // Lee los datos binarios de la imagen
      const imageBuffer = req.file ? fs.readFileSync(imagePath) : null;

        const [rows]=await pool.query('call sp_insert_proyecto (?,?,?,?,?,?,?,?,?,?,?,?)', 
        [numPisos, estadoConstruccion, areaLote, areaConstruida, numHabitaciones, imageBuffer, numBanos, direccion, barrio, precio, tipoInmueble, descripcion])
    if (rows.affectedRows === 0) return res.status(404).json();
    res.send(rows)
    }
    catch(error){
        return res.status(500).json({
            message: 'something goes wrong',error
        })
    }
}

//funcion para actualizar e inactivar 
export const actualizarProyecto = async (req, res) => {
  const { id } = req.params
  const {numPisos, estadoConstruccion, areaLote, areaConstruida, numHabitaciones, numBanos, direccion, barrio, precio, tipoInmueble, descripcion} = req.body;
  const filename = req.file ? req.file.filename : null;
  const imagePath = 'src/uploads/imageRealEstate/' + filename;

  try {
    // Lee los datos binarios de la imagen
    const imageBuffer = req.file ? fs.readFileSync(imagePath) : null;

    const [rows] = await pool.query('call sp_update_proyecto(?,?,?,?,?,?,?,?,?,?,?,?)',
      [numPisos, estadoConstruccion, areaLote, areaConstruida, numHabitaciones, imageBuffer, numBanos, direccion, barrio, precio,tipoInmueble, descripcion, id])
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

export const verProyectos = async (req, res) => {
  try {
    const [rows] = await pool.query('select * from inmueble where clasificacion = 0')
    if (rows.affectedRows === 0) return res.status(404);
    res.send(rows)
    console.log(rows)
  }
  catch (error) {
    return res.status(500).json({
      message: 'something goes wrong',
      error
    })
  }
}


export const verProyecto = async (req, res) => {
  const { id} = req.params;
  try {
    let [rows] = await pool.query('SELECT * FROM Inmueble WHERE idInmueble = ? and clasificacion = 0', [id]);
    console.log(rows);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
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
    res.status(500).json({ error: 'Error al obtener el proyecto' });
  }
};

export const publicarProyecto = async (req, res) => {

  const { id } = req.params;
  console.log(id);

  try {
      const [result] = await pool.query('UPDATE inmueble SET clasificacion = 1 WHERE idinmueble = ?', [id]);

      if (result.affectedRows > 0) {
          res.send({ success: true, message: 'Proyecto Publicado correctamente' });
          console.log("publico el inmueble")

      } else {
          res.status(404).json({ success: false, message: 'Proyecto no encontrado' });
          console.log("no publico el inmueble")
      }
  } catch (error) {
      console.error('Error al publicar el proyecto:', error);
      res.status(500).json({ success: false, message: 'Ocurrió un error al publicar el proyecto', error });
  }
};