import { pool } from '../bd.js';
//multer 
import multer from 'multer';

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
    const {barrio, direccion, areaConstruida, areaLote, dimensiones, estadoConstruccion, numPisos, numHabitaciones, numBanos, estrato, garaje,}=req.body;
    const { filename } = req.file;
    try{
        const [rows]=await pool.query('insert into inmueble (barrio, direccion, areaConstruida, areaLote, dimensiones, estadoConstruccion, numPisos, numHabitaciones, numBaños, estrato, garaje, imagen) values(?,?,?,?,?,?,?,?,?,?,?,?)', 
        [barrio, direccion, areaConstruida, areaLote, dimensiones,estadoConstruccion,numPisos, numHabitaciones, numBanos, estrato, garaje, filename])
    if (rows.affectedRows === 0) return res.status(404).json();
    res.send(rows)
    }
    catch(error){
        return res.status(500).json({
            message: 'something goes wrong',error
        })
    }
}

