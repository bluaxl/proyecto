import { Router } from "express";
import {registroProyect, actualizarProyecto, upload, verProyectos, verProyecto, publicarProyecto} from '../controller/proytects.controller.js'

const router = Router()
router.post('/createProyect', upload.single('imagen'), registroProyect)
router.post('/updateProyect/:id', upload.single('imagen'), actualizarProyecto)
router.get('/consultProyects', verProyectos)
router.get('/consultProyect/:id', verProyecto)
router.post('/publishProyect/:id', publicarProyecto)


export default router