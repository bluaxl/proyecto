import { pool } from '../bd.js';

import multer from 'multer';
import fs from 'fs'
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'src/dbFiles/pdfs'); // Directorio donde se almacenarán las imágenes
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Renombrar el archivo
    }
  });
  
export const upload = multer({ storage });

export const asesorDisponible=async(req,res)=>{
    const {fecha, hora} = req.body
    try{
        const [rows]=await pool.query('call sp_dispo_asesores(?,?)',[fecha,hora])
    if(rows[0][0].affectedRows === 0) return res.status(404);
    const asesor = rows[0]
    console.log(asesor.length);
    const numAleatorio=Math.floor(Math.random() * asesor.length)
    console.log(asesor[numAleatorio]); 
    res.send(asesor[numAleatorio])
    }
    catch(error){
        return res.status(500).json({
            message: 'something goes wrong', error
        })
    }
}

export const insertSolicitud=async(req,res)=>{
    const {fecha, hora} = req.body
    try{
        const [rows]=await pool.query('call sp_insert_solicitud (?,?)',[fecha,hora])
    if (rows.affectedRows === 0) return res.status(404).json();
    res.send(rows)
    }
    catch(error){
        return res.status(500).json({
            message: 'something goes wrong', error
        })
    }
}

export const consultarSolicitud=async(req,res)=>{
    const {fecha, hora} = req.body
    try{
        const [rows]=await pool.query('call sp_consultar_solcitud (?,?)',[fecha,hora])
        if (rows.affectedRows === 0) return res.status(404).json();
        res.send(rows[0][0])
    }
    catch(error){
        return res.status(500).json({
            message: 'something goes wrong', error
        })
    }       
}

export const insertSoliUsuario=async(req,res)=>{
    const {idSolicitud, idCliente, idAsesor}= req.body

    try{
        const [rows]=await pool.query('call sp_insert_soliUsuario (?,?,?)',[idSolicitud, idCliente, idAsesor])
        if (rows.affectedRows === 0) return res.status(404).json();
        res.send(rows)
    }
    catch(error){
        return res.status(500).json({
            message: 'something goes wrong', error
        })
    }
}

export const Desing=async(req,res)=>{
    const {descripcion, idSolicitud}= req.body
    try{
        const [rows]=await pool.query('call sp_insert_rediseño (?,?)',[descripcion , idSolicitud])
        if (rows.affectedRows === 0) return res.status(404).json();
        res.send(rows)
    }
    catch(error){
        return res.status(500).json({
            message: 'something goes wrong', error
        })
    }
}

export const legalAdvise=async(req,res)=>{
    const {descripcion, idSolicitud}= req.body
    try{
        const [rows]=await pool.query('call sp_insert_reasesoria (?,?)',[descripcion , idSolicitud])
        if (rows.affectedRows === 0) return res.status(404).json();
        res.send(rows)
    }
    catch(error){
        return res.status(500).json({
            message: 'something goes wrong', error
        })
    }
}


export const documents=async(req,res)=>{
    const {tipoDocumento, idSolicitud}= req.body
    try{
        const [rows]=await pool.query('call sp_insert_redocumento (?,?)',[tipoDocumento  , idSolicitud])
        if (rows.affectedRows === 0) return res.status(404).json();
        res.send(rows)
    }
    catch(error){
        return res.status(500).json({
            message: 'something goes wrong', error
        })
    }
}

export const property=async(req,res)=>{
    const {descripcion, idSolicitud}= req.body
    try{
        const [rows]=await pool.query('call sp_insert_rebusqueda (?,?)',[descripcion  , idSolicitud])
        if (rows.affectedRows === 0) return res.status(404).json();
        res.send(rows)
    }
    catch(error){
        return res.status(500).json({
            message: 'something goes wrong', error
        })
    }
}

export const Appraise = async(req,res)=>{
    const {tipoAvaluo, idSolicitud}= req.body
    try {
        // Obtener las rutas de los archivos subidos
        const castralPath = req.files['castral'][0].path;
        const libertadPath = req.files['libertad'][0].path;
    
        // Insertar las rutas en la base de datos
        const [rows] = await pool.query('call sp_insert_reavaluo (?, ?, ?, ?)', [tipoAvaluo, castralPath, libertadPath, idSolicitud]);
    
        if (rows.affectedRows === 0) return res.status(404).json();
        res.send(rows);
      } catch (error) {
        return res.status(500).json({
          message: 'Something went wrong',
          error
        });
      }
    }
