import express from "express";
import cors from "cors"
import {PORT} from './config.js'
import user from './routes/user.routes.js';
import realEstate from './routes/realEstate.routes.js'
import request from './routes/request.routes.js'

//Inicializamos express
const app = express()
//Usando cors en la aplicación 
app.use(cors())
//usar archivos estaticos para que esta carpeta pueda ser accedida desde el navegaor
app.use(express.static('src/dbImages/')) 
//Vaalidar archivos json en la app
app.use(express.json())
//Usar las rutas en la app
app.use(user, realEstate, request)


//Ejecutar el puerto
app.listen(PORT, ()=>{
    console.log("se esta ejecutando en el puerto", PORT)
})