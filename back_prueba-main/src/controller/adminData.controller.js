import { pool } from '../bd.js';


export const obtenerEstadisticas = async (req, res) => {
    try {
        const{ fechaInicio, fechaFin} = req.query

        const fechaInicioStr = fechaInicio ? new Date(fechaInicio).toISOString().slice(0, 10) : null;
        const fechaFinStr = fechaFin ? new Date(fechaFin).toISOString().slice(0, 10) : null;

        const [reservasEstado0] = await pool.query('CALL sp_contar_reservas(0)');
        const [reservasEstado1] = await pool.query('CALL sp_contar_reservas(1)');
        const [reservasConFecha] = await pool.query('CALL sp_contar_reservas_con_fecha(0, ?, ?)', [fechaInicioStr, fechaFinStr]);
        const [usuariosActivos] = await pool.query('CALL sp_contar_usuarios()');
        const [asesorMasReservas] = await pool.query('CALL sp_asesor_mas_reservas()');
        const [inmueblesClasificacion1] = await pool.query('CALL sp_contar_inmuebles()');

        res.json({
            reservasEstado0: reservasEstado0[0][0].cantidad,
            reservasEstado1: reservasEstado1[0][0].cantidad,
            reservasConFecha: reservasConFecha[0][0].cantidad,
            usuariosActivos: usuariosActivos[0][0].cantidad,
            asesorMasReservas: asesorMasReservas[0][0],
            inmueblesClasificacion1: inmueblesClasificacion1[0][0].cantidad,
        });
    } catch (error) {
        console.error('Error al obtener estadísticas:', error);
        res.status(500).json({ success: false, message: 'Ocurrió un error al obtener las estadísticas', error });
    }
}