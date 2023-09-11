import { pool } from '../bd.js';
import jwt from 'jsonwebtoken'; 
import { config } from 'dotenv';
config();

//Funcion para generar un token mediante una palabra secreta

function generateAccessToken(user) {
    return jwt.sign(user,' process.env.SECRET', { expiresIn: '10s' });
}

//Funcion para iniciar sesion con validacion de errores 
export const inicioSession = async (req, res) => {
    const { name, password } = req.body;
    try {
        const [rows] = await pool.query('select * from usuario where nombre=? and contra=?', [name, password]);
        if (rows.length === 0) return res.status(404).json();

        const user = { username: name };

        const accessToken = generateAccessToken(user);

        res.status(200).json({
            token: accessToken
        });
        
    } catch (error) {
        return res.status(500).json({
            message: 'something goes wrong',
            error
        });
    }
}

//funcion para validar el token 

export function validateToken(req, res, next) {
    const accessToken = req.header('Authorization');
    if (!accessToken) return res.status(401).send('Access denied: Token missing'); // Mensaje claro para token faltante

    jwt.verify(accessToken, process.env.SECRET, (err, user) => {
        if (err) {
            return res.status(403).send('Access denied: Token expired or incorrect'); // Mensaje claro para token inválido
        } else {
            // Si el token es válido, puedes almacenar el usuario en req.user si lo necesitas.
            req.status(200).user = user;
            console.log("El token es válido");
            next();
        }
    });
}



export const inicio = (req, res) => {
    res.status(200).json({
        username: req.user
    })
}
  
//funcion para consultar todos los usuarios registrados en la base de datos 

export const consultar = async (req, res)=>{
    try{11
        const [rows] =  await pool.query('select * from usuario')
        res.send(rows)
    }
    catch(error){
        return res.status(500).json({
            message: "something goes wrong",
            error
        })
    }
}


//Funcion que registra un usuario 
export const registrar = async(req, res)=>{
    const { name, password } = req.body;
    try{
    const [rows]= await pool.query('insert into usuario values(?,?)',[name, password])
    if (rows.affectedRows === 1) return res.status(404).json();
    res.send(rows)
    }
    catch(error){
        return res.status(500).json({
            message: 'something goes wrong',
            error
        });
    }
}


//Funcion para registrar inmuebles
export const registroInmueble=async(req,res)=>{
    const {nombre,pisos,material}=req.body;
    try{
    const [rows]=await pool.query('insert into inmuebles values(?,?,?)',[nombre,pisos,material])
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


