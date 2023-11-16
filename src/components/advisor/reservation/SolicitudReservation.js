import "../../../css/Advisory/solicitudes.css";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function SolicitudReservationNormal() {

    const { id } = useParams();
    const [request, setRequest] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/requestIndividual/${id}`)
            .then(response => response.json())
            .then(response => {
                setRequest(response);
                console.log(response);
            })
            .catch(error => {
                console.error('Error:', error);
                setRequest(null);
            });
    }, [id]);

    return (
        <div>
            {request ? (
                <div className="information-request">
                    <h2 className="txt-black">Solicitud de Reserva</h2>
                    <div className="information-request-data">
                        <p className="txt-black mrg-8">
                            <strong className="txt-black ">Solicitud hecha por:</strong>
                            {request[0].nombreCliente}
                        </p>

                        <p className="txt-black mrg-8">
                            <strong className="txt-black ">Tipo de reserva: </strong>
                            {request[0].nombreTipoReserva}
                        </p>
                        <p className="txt-black mrg-8">
                            <strong className="txt-black ">Fecha Reserva: </strong>
                            {new Date(request[0].FechaSolicitud).toISOString().slice(0, 10)}
                        </p>
                    </div>
                    <p className="txt-black mrg-8">
                        <strong className="txt-black ">Datos: </strong>
                        {request[0].datoSolicitud}
                    </p>

                    <div className="actions-box">
                        <button className="request-button"><p className="txt-white">Aceptar reserva</p></button>
                        <button className="request-button"><p className="txt-white">Rechazar reserva</p></button>
                    </div>
                </div>
            ) : (
                <p>Cargando detalles del inmueble...</p>
            )}
        </div>
    );
}

export function SolicitudReservationAvaluo() {

    const { id } = useParams();
    const [request, setRequest] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/requestIndividual/${id}`)
            .then(response => response.json())
            .then(response => {
                setRequest(response);
                console.log(response);
            })
            .catch(error => {
                console.error('Error:', error);
                setRequest(null);
            });
    }, [id]);

    return (
        <div className="information-request">
            <h2 className="txt-black">Solicitud de Reserva</h2>
            <div className="information-request-data">
                <p className="txt-black mrg-8">
                    <strong className="txt-black ">Fecha Solicitud: </strong>
                </p>
                <p className="txt-black mrg-8">
                    <strong className="txt-black ">Solicitud hecha por: </strong>
                </p>

                <p className="txt-black mrg-8">
                    <strong className="txt-black ">Tipo de reserva: </strong>
                </p>
                <p className="txt-black mrg-8">
                    <strong className="txt-black ">Fecha Reserva: </strong>
                </p>
            </div>
            <p className="txt-black mrg-8">
                <strong className="txt-black ">Razón de avalúo: </strong>
            </p>

            <div className="files-div">
                <div className="file-1">
                    <p className="txt-black">Certificación Catastral</p>
                    <button className="request-button padd-but"><p className="txt-black">Ver</p></button>
                </div>
                <div className="file-2">
                    <p className="txt-black">Certificado de Libertad</p>
                    <button className="request-button padd-but"><p className="txt-black">Ver</p></button>
                </div>
            </div>
            <div className="actions-box">
                <button className="request-button"><p className="txt-white">Aceptar reserva</p></button>
                <button className="request-button"><p className="txt-white">Rechazar reserva</p></button>
            </div>
        </div>
    )
}