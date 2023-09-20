//multer 
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'src/uploads/'); // Directorio donde se almacenarán las imágenes
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Renombrar el archivo
    }
  });
  
export const upload = multer({ storage });

//Funcion para registrar inmuebles
export const registroInmueble=async(req,res)=>{
    const {barrio,direccion,areaConstruida,areaLote,dimensiones,estadoConstruccion,numPisos,numHabitaciones,numBaños,estrato,garaje}=req.body;
    const { file } = req.file;
    try{
    const [rows]=await pool.query('insert into inmuebles (barrio,direccion,areaConstruida,areaLote,dimensiones,estadoConstruccion,numPisos,numHabitaciones,numBaños,estrato,garaje,imagen) values(?,?,?,?,?,?,?,?,?,?,?,?)',
    [barrio,direccion,areaConstruida,areaLote,dimensiones,estadoConstruccion,numPisos,numHabitaciones,numBaños,estrato,garaje,file])
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

//funcion para actualizar e inactivar 

export const actualizarInmueble =async(req,res)=>{
    const {id} = req.params
    const {barrio,direccion,areaConstruida,areaLote,dimensiones,estadoConstruccion,numPisos,numHabitaciones,numBaños,estrato,garaje,estado}=req.body;
    const { file } = req.file;
    try{
    const [rows]=await pool.query('update inmuebles set barrio = IFNULL(?, name), direccion = IFNULL(?,direccion), areaConstruida = IFNULL(?,areaConstruida), areaLote = IFNULL(?,areaLote), dimensiones = IFNULL(?, dimensiones), estadoConstruccion = IFNULL(?,estadoConstruccion), numPisos = IFNULL(?,numPisos), numHabitaciones = (?, numHabitaciones), numBaños = IFNULL(?,numBaños), estrato = (?,estrato), garaje = IFNULL(?,garaje), imagen = IFNULL(?,imagen) estado = IFNULL(?,estado) where id = ?',
    [barrio,direccion,areaConstruida,areaLote,dimensiones,estadoConstruccion,numPisos,numHabitaciones,numBaños,estrato,garaje,file,estado, id])
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

export const consultarInmuebles = async(req, res)=>{
    const [rows] = await pool.query('select*from imuebles')
    res.send(rows)
}