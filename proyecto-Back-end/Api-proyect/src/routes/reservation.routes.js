import { Router } from "express";
import { tipoReserva } from "../controller/reservationType.controller.js";

const router = Router();
router.post('/documents', tipoReserva)

export default router
