import "../../../css/Advisory/cruds.css";
// Importación de estilos CSS
import "../../../css/Client/home.css";
import { useNavigate } from 'react-router-dom';

import React, { useState, useEffect } from 'react';



export function CrudReservation() {
    const navigate = useNavigate();
    const [requests, setRequests] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3001/requestReservation?tipo=${1}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {
                setRequests(response)
                console.log(response)
            })
            .catch(error => console.error('Error:', error));
    }, []);

    function verSolicitud({ idSolicitud }) {
        console.log(idSolicitud);

        fetch(`http://localhost:3001/requestIndividual/${idSolicitud}`)
            .then(response => response.json())
            .then(response => {
                console.log(response[0].nombreTipoReserva);

                if (response.nombreTipoReserva != "Avaluo") {
                    navigate(`/advisory/requestS/${idSolicitud}`);
                } else {
                    navigate(`/advisory/requestN/${idSolicitud}`);
                }

            })
            .catch(error => console.error("Error", error));
    }

    return (
        <>
            <div className="information-crud">
                <div className="title-box-crud">
                    <h2>Solicitudes Pendientes</h2>
                </div>
            </div>
            {requests.length === 0 ? (
                <div className="zero-data">
                    <p>No hay solicitudes disponibles.</p>
                </div>
            ) : (
                <table className="crud-state-table">
                    <tbody className="crud-state-tbody">
                        {requests.map(request => (
                            <tr key={request.idSolicitud} className="crud-state-tr">
                                <td>Fecha: {new Date(request.FechaSolicitud).toISOString().slice(0, 10)}</td>
                                <td>Tipo: {request.nombreTipoReserva}</td>
                                <td>Cliente: {request.nombreCliente}</td>
                                <td>
                                    <button className="action-button" onClick={() => verSolicitud({ idSolicitud: request.idSolicitud })}><i className="fa-solid fa-eye fa-2xl" style={{ color: "white", cursor: "pointer" }}></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}