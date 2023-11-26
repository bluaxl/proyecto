import { Router } from 'express'
import {obtenerEstadisticas} from '../controller/adminData.controller.js'

const router = Router()
router.get('/getStatistics', obtenerEstadisticas)

export default router
