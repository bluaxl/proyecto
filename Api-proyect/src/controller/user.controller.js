import { pool } from '../bd.js';
import jwt from 'jsonwebtoken'; 
import { config } from 'dotenv';
config();

//Funcion para generar un token mediante una palabra secreta


function generateAccessToken(user) {
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);

    // Establecer tiempo de expiración en 5 segundos
    const expirationTimeInSeconds = currentTimeInSeconds + 10*60;

    // Agregar tiempo de creación y expiración al token
    const tokenPayload = {
        ...user, //están copiando todas las propiedades del objeto user en el nuevo objeto tokenPayload
        iat: currentTimeInSeconds,  // Tiempo de creación
        exp: expirationTimeInSeconds,  // Tiempo de expiración
    };

    const token = jwt.sign(tokenPayload, process.env.SECRET);

    console.log('Token creation time:', currentTimeInSeconds);
    console.log('Token expiration time:', expirationTimeInSeconds);

    return token;
}

export function validateToken(req, res, next) {
    const accessToken = req.header('Authorization');

    if (!accessToken) {
        return res.status(401).send('Access denied: Token missing');
    }

    jwt.verify(accessToken, process.env.SECRET, (err, decoded) => {
        if (err) {
            console.error('Error al verificar el token:', err);
            return res.status(403).send('Access denied: Token expired or incorrect');
        } else {
            const currentTimeInSeconds = Math.floor(Date.now() / 1000);
            const tokenCreationTime = decoded.iat;
            const expirationTimeInSeconds = decoded.exp * 60;

            console.log('Current Time:', currentTimeInSeconds);
            console.log('Token Creation Time:', tokenCreationTime);
            console.log('Expiration Time:', expirationTimeInSeconds);

            // Verificar manualmente si el token ha expirado
            if (currentTimeInSeconds <= expirationTimeInSeconds) {
                console.log("El token es válido");
                res.status(200).json({ decodeToken: decoded });
                next();
            } else {
                return res.status(403).send('Access denied: Token expired');
            }
        }
    });
}


//Funcion para iniciar sesion con validacion de errores 
export const inicioSession = async (req, res) => {
    console.log("si entre")
    const { email,password } = req.body;
    try {
        const [rows] = await pool.query('select * from Usuario where correoElectronico=? and contraseña=?', [email, password]);
        if (rows.length === 0) return res.status(404).json();
        console.log([rows]);

        //credenciales para el token
        const user = { 
            username: email,
            rolUser: rows[0].idRolFK,
            idUser: rows[0].idUsuario 
        };

        const accessToken = generateAccessToken(user);
        //para decodificar el token const decodeToken = jwt.decode(accessToken)

        res.status(200).json({
            token: accessToken,
            rolUser: rows[0].idRolFK,
        });
        
    } catch (error) {
        return res.status(500).json({
            message: 'something goes wrong',
            error
        });
    }
}






export const inicio = (req, res) => {
    res.status(200).json({
        username: req.user
    })
}
  
//funcion para consultar todos los usuarios registrados en la base de datos 

export const consultar = async (req, res)=>{
    try{
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
    const { name, lastName, email, numId, typeId, password, num} = req.body;
  
    try {
      // Lee los datos binarios de la imagen

    const [rows]= await pool.query('INSERT INTO Usuario (nombre, apellido, correoElectronico, numIdentificacion, tipoIdentificacion, contraseña, numeroContacto) VALUES (?,?,?,?,?,?,?)',
    [name, lastName, email, numId, typeId, password, num])
    if (rows.affectedRows === 0) return res.status(404).json();
    res.send(rows)
    }
    catch(error){
        return res.status(500).json({
            message: 'something goes wrong',
            error
        });
    }
}

export const consultarInfoUsuario = async(req, res)=>{
    const {id} = req.params
    console.log(id)
    try{
        const [rows]= await pool.query('select * from usuario where idUsuario = ?', [id])
        res.send(rows)
        }
        catch(error){
            return res.status(500).json({
                message: 'something goes wrong',
                error
            });
        }

}