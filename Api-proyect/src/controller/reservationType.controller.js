import { pool } from '../bd.js';

export const asesorDisponible=async(req,res)=>{
    const {fecha, hora} = req.body
    try{
        const [rows]=await pool.query('call sp_dispo_asesores(?,?)',[fecha,hora])
    if(rows.affectedRows === 0) return res.status(404);
    console.log(rows);
    console.log(rows[0]);
    res.send(rows)
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
        console.log(rows);
    res.send(rows[0][0])
    }
    catch(error){
        return res.status(500).json({
            message: 'something goes wrong', error
        })
    }
}