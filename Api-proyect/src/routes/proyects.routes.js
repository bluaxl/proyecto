import { Router } from "express";
import {registroProyect, upload} from '../controller/proytects.controller.js'
const router = Router()


router.post('/createProyect', upload.single('imagen') ,registroProyect)

export default router