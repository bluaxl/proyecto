import "../../../css/Advisory/cruds.css";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function NotificationReservation() {
    const navigate = useNavigate();
    const [request, setRequests ]= useState([])

    useEffect(() => {
        fetch(`http://localhost:3001/requestReservation?tipo=${0}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {

                const uniqueIds = new Set();
                const uniqueRequests = response.filter(request => {
                    if (uniqueIds.has(request.idSolicitud)) {
                        return false; 
                    }
                    uniqueIds.add(request.idSolicitud);
                    return true;
                });

                setRequests(uniqueRequests);
                console.log(uniqueRequests);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    function sendEmail() {
        const fechaSolicitud = new Date(request[0].FechaSolicitud);
        const fechaFormateada = fechaSolicitud.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        
        // En tu componente React
        fetch('http://localhost:3001/sendEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                destinatario: request[0].correoElectronico,
                asunto: 'Recordatorio Cita en Arquideco',
                mensaje: `¡Hola ${request[0].nombreCliente}! \n  \n No olvides asistir a la cita que programaste de ${request[0].nombreTipoReserva} para el día ${fechaFormateada} a las ${request[0].HoraSolicitud}, no olvides llevar toda la información necesaria y llegar a tiempo. Estamos a la espectativa de recibirle en Arquideco. \n \n ¡Esperamos que tenga una experiencia maravillosa!`,
            }),
        })

    }

    return (
        <>
            <div className="information-crud">
                <div className="title-box-crud">
                    <h2>Crear Recordatorio</h2>
                </div>
            </div>
            {request.length === 0 ? (
               <div className="zero-data">
               <p>No hay reservas disponibles.</p>
               </div>
            ) : (
            <table className="crud-state-table">
                <tbody className="crud-state-tbody">
                {request.map(request => (
                    <tr key={request.idSolicitud} className="crud-state-tr">
                        <td className="wd-20">{new Date(request.FechaSolicitud).toISOString().slice(0, 10)}</td>
                        <td className="wd-30">{request.nombreTipoReserva}</td>
                        <td className="wd-20">{request.nombreCliente}</td>
                        <td>
                            <button className="action-button" onClick={() => sendEmail()}><i className="fa-solid fa-paper-plane" style={{ color: "white", cursor: "pointer" }}></i></button>
                        </td>
                    </tr>
                     ))}
                </tbody>
            </table>
              )}
        </>
    )
}