import { Router } from 'express'
import {inicioSession, consultar, validateToken, inicio, registrar} from '../controller/login.controller.js'


//Definición de rutas 
const router = Router()
router.post('/login', inicioSession)
router.get('/inicio', validateToken, inicio);
router.get('/consult', consultar)
router.post('/registro', registrar)

export default router
