import "../../../css/Advisory/cruds.css";
import React, { useState, useEffect } from 'react';


export function CrudReservation() {

    const [requests, setRequests ]= useState([])

    useEffect(() => {
        fetch("http://localhost:3001/requestReservation", {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => setRequests(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <>
            <div className="information-crud">
                <div className="title-box-crud">
                    <h2>Solicitudes Pendientes</h2>
                </div>
            </div>
            <table className="crud-state-table">
                <tbody className="crud-state-tbody">
                {requests.map(request => (
                    <tr className="crud-state-tr">
                        <td>Fecha: {request.fechaSolicitud}</td>
                        <td>Tipo: {request.nombreTipoReserva}</td>
                        <td>
                            <button className="action-button"><i class="fa-solid fa-eye fa-2xl" style={{ color: "white", cursor: "pointer" }}></i></button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}