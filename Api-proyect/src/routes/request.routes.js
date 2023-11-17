import { Router } from "express";
import {insertSolicitud, consultarSolicitud, asesorDisponible, insertSoliUsuario, Desing, legalAdvise, documents, property, Appraise, upload} from '../controller/reservationType.controller.js'

const router = Router();
router.post('/solicitud', insertSolicitud)
router.post('/consultarSoli', consultarSolicitud)
router.post('/disponibilidad',asesorDisponible)
router.post('/insertSoliUsuario', insertSoliUsuario)
router.post('/Desing', Desing)
router.post('/legalAdvise', legalAdvise)
router.post('/documents', documents)
router.post('/property', property)
router.post('/appraise', upload.fields([{ name: 'castral'}, { name: 'libertad'}]), Appraise)


export default router