import { Router } from 'express'
import {registroInmueble, actualizarInmueble, upload} from '../controller/realEstate.controller.js'

const router = Router()
router.post('/registroInmueble', upload.single('image'),registroInmueble)
router.patch('/actualizarInmueble/:id', actualizarInmueble)

export default router