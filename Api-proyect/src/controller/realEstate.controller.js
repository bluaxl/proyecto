import { pool } from '../bd.js';
//multer 
import multer from 'multer';
import fs from 'fs'
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'src/uploads/imageRealEstate/'); // Directorio donde se almacenarán las imágenes
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Renombrar el archivo
    }
  });
  
export const upload = multer({ storage });

//Funcion para registrar inmuebles
export const registroInmueble=async(req,res)=>{
    const {numPisos, estadoConstruccion, areaConstruida, areaLote, numHabitaciones, numBanos, direccion, barrio, descripcion, tipoInmueble, clasificacion}=req.body;
    const { filename } = req.file;
    const imagePath = 'src/uploads/imageRealEstate/' + filename;
  
    try {
      // Lee los datos binarios de la imagen
    const imageBuffer = fs.readFileSync(imagePath);

    const [rows]=await pool.query('insert into inmueble(numpisos, estadoconstruccion, areaConstruida, areaLote, numHabitaciones, imagenes, numBaños, direccion ,barrio, descripcionProyecto, tipoInmueble, clasificacion) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
    [numPisos, estadoConstruccion, areaConstruida, areaLote, numHabitaciones, imageBuffer, numBanos, direccion, barrio, descripcion, tipoInmueble, clasificacion])
    if (rows.affectedRows === 0) return res.status(404).json();
    res.send(rows)
    }
    catch(error){
        return res.status(500).json({
            message: 'something goes wrong',error
        })
    }
}

export const actualizarInmueble =async(req,res)=>{
  const {id} = req.params
  const {numPisos, estadoConstruccion, areaConstruida, areaLote, numHabitaciones, numBanos, direccion, barrio, descripcion, tipoInmueble, clasificacion}=req.body;
  const filename = req.file ? req.file.filename : null;
  const imagePath = 'src/uploads/imageRealEstate/' + filename;

  try {
    // Lee los datos binarios de la imagen
  const imageBuffer = fs.readFileSync(imagePath);

  const [rows]=await pool.query('update Inmueble set numpisos = IFNULL(?,numpisos), estadoconstruccion = IFNULL(?, estadoconstruccion), areaLote =  IFNULL(?, areaLote), numHabitaciones = IFNULL(?, numHabitaciones), imagenes = IFNULL(?, imagenes), numBaños = IFNULL(?, numBaños), direccion = IFNULL(?, direccion), barrio = IFNULL(?,barrio), descripcionProyecto = IFNULL(?, descripcionProyecto), tipoInmueble = IFNULL(?, tipoInmueble), clasificacion = IFNULL(?,clasificacion) where idInmueble = ? ',
  [numPisos, estadoConstruccion, areaConstruida, areaLote, numHabitaciones, imageBuffer, numBanos, direccion, barrio, descripcion, tipoInmueble, clasificacion, id])
  if (rows.affectedRows === 0) return res.status(404).json();
  res.send(rows)
  }
  catch(error){
      return res.status(500).json({
          message: 'something goes wrong',
          error
      })
  }
  
}

//consultar todos los inmuebles

// export const consultarInmuebles = async (req, res) => {
//   try {
//       const [rows] = await pool.query('SELECT * FROM Inmueble');

//       const images = rows.map((img) => {
//           return {
//               id: img.idInmueble,
//               imagen: img.imagen.toString('base64'), // Convertir a base64 para enviar como cadena
//           };
//       });

//       res.json(images);
//   } catch (error) {
//       console.error('Error al consultar inmuebles:', error);
//       res.status(500).json({
//           message: 'Something went wrong',
//           error,
//       });
//   }
// };





export const consultarInmuebles = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Inmueble');

    const images = [];

    for (const img of rows) {
      const imagePath = `${img.idInmueble}.jpg`; // Asegúrate de tener una extensión de archivo adecuada

      // Asegúrate de que img.imagenes contiene datos binarios
      const imageBuffer = Buffer.from(img.imagenes, 'base64');

      await fs.promises.writeFile(path.join('src/dbImages/',imagePath), imageBuffer);

      images.push({
        id: img.idInmueble,
        imagen: imagePath
      });
    }

    console.log(images);
    res.json(images);

  } catch (error) {
    console.error('Error al consultar inmuebles:', error);
    res.status(500).json({
      message: 'Something went wrong',
      error,
    });
  }
};



