import { Router } from 'express'
import {inicioSession, consultar, validateToken, registrar, consultarInfoUsuario} from '../controller/user.controller.js'


//Definición de rutas 
const router = Router()
router.post('/login', inicioSession)
router.get('/inicio', validateToken);
router.get('/consult', consultar)
router.post('/registro', registrar)
router.get('/consultUser/:id', consultarInfoUsuario)

export default router
