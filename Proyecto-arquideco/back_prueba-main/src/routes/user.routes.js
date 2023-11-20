import { Router } from 'express'
import {inicioSession, consultar, validateToken, registrar, consultarInfoUsuario, inactivarUsuario, activarUsuario, actualizarDatos} from '../controller/login.controller.js'


//Definición de rutas 
const router = Router()
router.post('/login', inicioSession)
router.get('/inicio', validateToken);
router.get('/consult', consultar)
router.post('/registro', registrar)
router.get('/consultUser/:id', consultarInfoUsuario)
router.post('/inactivateUser/:id', inactivarUsuario)
router.post('/activateUser/:id', activarUsuario)
router.put('/updateUser/:id', actualizarDatos)



export default router
