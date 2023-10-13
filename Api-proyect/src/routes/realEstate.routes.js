import { Router } from 'express'
import {registroInmueble, actualizarInmueble, upload, consultarInmuebles} from '../controller/realEstate.controller.js'

const router = Router()
router.post('/registroInmueble', upload.single('imagen'), registroInmueble)
router.patch('/actualizarInmueble/:id', upload.single('imagen'), actualizarInmueble)
router.get('/verInmuebles', consultarInmuebles)

export default router