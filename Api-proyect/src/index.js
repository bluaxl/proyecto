import express from "express";
import cors from "cors"
import {PORT} from './config.js'
import loginRoutes from './routes/login.routes.js'

//Inicializamos express
const app = express()
//Usando cors en la aplicación 
app.use(cors())
//Vaalidar archivos json en la app
app.use(express.json())
//Usar las rutas en la app
app.use(loginRoutes)

//Ejecutar el puerto
app.listen(PORT, ()=>{
    console.log("se esta ejecutando en el puerto", PORT)
})