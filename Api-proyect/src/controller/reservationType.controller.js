import { pool } from '../bd.js';

export const tipoReserva = async(req, res) => {
    const {idTipoReserva, hora, fecha} = req.body;
    try{
    const [rows] = await pool.query('insert into solicitud values(?,?)',[hora,fecha])

    if (rows.affectedRows === 0) return res.status(404).json({message:'no se que paso'});
    res.send(rows)
    }
    catch(error){
        return res.status(500).json({
            message: 'something goes wrong',
            error
        });
    }
    
}