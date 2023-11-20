import { pool } from '../bd.js';
import multer from 'multer';
import fs from 'fs'
import nodemailer from 'nodemailer';
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

export const asesorDisponible = async (req, res) => {
    const { fecha, hora } = req.body
    try {
        const [rows] = await pool.query('call sp_dispo_asesores(?,?)', [fecha, hora])
        if (rows[0][0].affectedRows === 0) return res.status(404);
        const asesor = rows[0]
        console.log(asesor.length);
        const numAleatorio = Math.floor(Math.random() * asesor.length)
        console.log(asesor[numAleatorio]);
        res.send(asesor[numAleatorio])
    }
    catch (error) {
        return res.status(500).json({
            message: 'something goes wrong', error
        })
    }
}

export const insertSolicitud = async (req, res) => {
    const { fecha, hora } = req.body
    try {
        const [rows] = await pool.query('call sp_insert_solicitud (?,?)', [fecha, hora])
        if (rows.affectedRows === 0) return res.status(404).json();
        res.send(rows)
    }
    catch (error) {
        return res.status(500).json({
            message: 'something goes wrong', error
        })
    }
}

export const consultarSolicitud = async (req, res) => {
    const { fecha, hora } = req.body
    try {
        const [rows] = await pool.query('call sp_consultar_solcitud (?,?)', [fecha, hora])
        if (rows.affectedRows === 0) return res.status(404).json();
        res.send(rows[0][0])
    }
    catch (error) {
        return res.status(500).json({
            message: 'something goes wrong', error
        })
    }
}

export const insertSoliUsuario = async (req, res) => {
    const { idSolicitud, idCliente, idAsesor } = req.body

    try {
        const [rows] = await pool.query('call sp_insert_soliUsuario (?,?,?)', [idSolicitud, idCliente, idAsesor])
        if (rows.affectedRows === 0) return res.status(404).json();
        res.send(rows)
    }
    catch (error) {
        return res.status(500).json({
            message: 'something goes wrong', error
        })
    }
}

export const Desing = async (req, res) => {
    const { descripcion, idSolicitud } = req.body
    try {
        const [rows] = await pool.query('call sp_insert_rediseño (?,?)', [descripcion, idSolicitud])
        if (rows.affectedRows === 0) return res.status(404).json();
        res.send(rows)
    }
    catch (error) {
        return res.status(500).json({
            message: 'something goes wrong', error
        })
    }
}

export const legalAdvise = async (req, res) => {
    const { descripcion, idSolicitud } = req.body
    try {
        const [rows] = await pool.query('call sp_insert_reasesoria (?,?)', [descripcion, idSolicitud])
        if (rows.affectedRows === 0) return res.status(404).json();
        res.send(rows)
    }
    catch (error) {
        return res.status(500).json({
            message: 'something goes wrong', error
        })
    }
}


export const documents = async (req, res) => {
    const { tipoDocumento, idSolicitud } = req.body
    try {
        const [rows] = await pool.query('call sp_insert_redocumento (?,?)', [tipoDocumento, idSolicitud])
        if (rows.affectedRows === 0) return res.status(404).json();
        res.send(rows)
    }
    catch (error) {
        return res.status(500).json({
            message: 'something goes wrong', error
        })
    }
}

export const property = async (req, res) => {
    const { descripcion, idSolicitud } = req.body
    try {
        const [rows] = await pool.query('call sp_insert_rebusqueda (?,?)', [descripcion, idSolicitud])
        if (rows.affectedRows === 0) return res.status(404).json();
        res.send(rows)
    }
    catch (error) {
        return res.status(500).json({
            message: 'something goes wrong', error
        })
    }
}

export const Appraise = async (req, res) => {
    const { tipoAvaluo, idSolicitud } = req.body
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

// Controlador para obtener todas las solicitudes pendientes
export const todasLasReservas = async (req, res) => {
    const { tipo } = req.query
    const asesor = 3
    // Llama al procedimiento almacenado para obtener las solicitudes pendientes
    const [rows] = await pool.query('call sp_all_reservas(?, ?)', [tipo, asesor])
    res.send(rows[0]);
}

// Controlador para obtener los detalles de una solicitud específica
export const verSolicitud = async (req, res) => {
    const { id } = req.params;
    // Llama al procedimiento almacenado para obtener los detalles de la solicitud
    const [rows] = await pool.query('call sp_ver_reserva(?)', [id])
    res.send(rows[0]);
}

// Controlador para obtener todas las solicitudes en una fecha específica
export const verSolicitudes = async (req, res) => {
    try {
        const asesor = 3;
        let { fecha } = req.query;
        fecha = fecha.toString()
        // Llama al procedimiento almacenado para obtener las solicitudes en una fecha específica
        const [rows] = await pool.query('call sp_reserva_dia(?, ?)', [fecha, asesor])
        res.send(rows[0]);
    } catch (error) {
        // Maneja cualquier error que pueda ocurrir durante el proceso
        console.error('Error al obtener reservas:', error);
        res.status(500).send('Error interno al obtener reservas');
    }
};

// Controlador para aceptar una solicitud
export const aceptarSolicitud = async (req, res) => {
    const { id } = req.params;
    // Llama al procedimiento almacenado para aceptar la solicitud
    const [rows] = await pool.query('call sp_update_request(?)', [id]);
    res.send({ success: true, message: 'Solicitud aceptada correctamente' });
};

// Controlador para rechazar una solicitud
export const rechazarSolicitud = async (req, res) => {
    const { id } = req.params;
    // Llama al procedimiento almacenado para rechazar la solicitud
    const [rows] = await pool.query('call sp_delete_request(?)', [id]);
    res.send({ success: true, message: 'Solicitud rechazada correctamente' });
};

export const eliminarReservas = async (req, res) => {
    const { id } = req.params;
  
    try {
      const [rows] = await pool.query('call sp_consult_reservations(?)', [id]);
      console.log('Rows from sp_consult_reservations:', rows);
  
      // Acceder a la primera submatriz si existe
      const dataRows = rows.length > 0 && Array.isArray(rows[0]) ? rows[0] : [];
  
      if (dataRows.length > 0) {
        const solicitudIds = dataRows.map((solicitud) => ({ idSolicitud: solicitud.idSolicitud }));
        console.log('Mapped solicitudIds:', solicitudIds);
  
        for (const solicitudId of solicitudIds) {
          console.log('Processing solicitudId:', solicitudId);
  
          if (solicitudId.idSolicitud !== undefined) {
            await pool.query('call sp_delete_request(?)', [solicitudId.idSolicitud]);
          } else {
            console.error('idSolicitud is undefined:', solicitudId);
          }
        }
  
        res.json({ success: true, message: 'Solicitudes eliminadas correctamente' });
      } else {
        res.status(404).json({ success: false, message: 'No se encontraron solicitudes' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Ocurrió un error', error });
    }
  };
  

// Configuración del transporte de correo usando nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'proyectoarquideco@gmail.com',
        pass: 'ewoc aoww vswh aocu'
    }
});

// Función para enviar correos electrónicos
export const enviarCorreo = async (req, res) => {
    const destinatario = req.body.destinatario;
    const asunto = req.body.asunto;
    const mensaje = req.body.mensaje;


    if (!destinatario) {
        console.log("no")
    } else {
        console.log("el destinatario es" + destinatario)
    }

    const opcionesCorreo = {
        from: 'proyectoarquideco@gmail.com',
        to: destinatario,
        subject: asunto,
        text: mensaje
    };

    try {
        // Intenta enviar el correo y loguea la respuesta
        const info = await transporter.sendMail(opcionesCorreo);
        console.log('Correo enviado:', info.response);
        return true;
    } catch (error) {
        // Maneja cualquier error que pueda ocurrir durante el proceso
        console.error('Error al enviar el correo:', error);
        return false;
    }
};
