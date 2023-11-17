import { Router } from "express";
import {insertSolicitud, consultarSolicitud, asesorDisponible} from '../controller/reservationType.controller.js'

const router = Router();
router.post('/solicitud', insertSolicitud)
router.post('/consultarSoli', consultarSolicitud)
router.post('/disponibilidad',asesorDisponible)

export default router