import { Router } from 'express'
import {registroInmueble, actualizarInmueble, upload, consultarInmuebles, verInmueble} from '../controller/realEstate.controller.js'

const router = Router()
router.post('/registroInmueble', upload.single('images'), registroInmueble)
router.patch('/actualizarInmueble/:id', upload.single('images'), actualizarInmueble)
router.get('/verInmuebles', consultarInmuebles)
router.get('/verInmueble/:idInmueble', verInmueble)

export default router