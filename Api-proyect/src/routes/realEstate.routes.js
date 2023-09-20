import { Router } from 'express'
import {registroInmueble, actualizarInmueble} from '../controller/realEstate.controller.js'

const router = Router()
router.post('/registroInmueble', registroInmueble)
router.patch('/actualizarInmueble/:id', actualizarInmueble)

export default router