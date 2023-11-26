import "../../../css/Admin/cruds.css";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataRequestAproved } from "./DataRequest";
import axios from "axios";

export function NotificationReservation() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8); // Número de solicitudes por página
    const [requests, setRequests] = useState([]);
    const [userRole, setUserRole] = useState(null);
    const [idUser, setIdUser] = useState(null)

    const token = localStorage.getItem('token');

    useEffect(() => {
        let isMounted = true; // Bandera para rastrear si el componente está montado

        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/inicio', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token,
                    },
                });

                if (!isMounted) {
                    return; // Evitar la actualización del estado si el componente se ha desmontado
                }

                const data = response.data;
                console.log(data);

                if (data.decodeToken.rolUser === 3) {
                    setUserRole(data.decodeToken.rolUser);
                    setIdUser(data.decodeToken.idUser);

                    const requestData = await DataRequestAproved(data.decodeToken.idUser);
                    setRequests(requestData);
                } else {
                    // Redirigir al usuario a una página de acceso denegado
                    navigate('/access-denied');
                }
            } catch (error) {
                // Manejar el error aquí
                console.error('Error al obtener datos:', error);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [currentPage, idUser, navigate, token]);

    async function fetchData() {
        try {
            const dataRequest = await DataRequestAproved(idUser);
            setRequests(dataRequest);
        } catch (error) {
            // Manejar el error aquí
            console.error('Error al obtener datos:', error);
        }
    }


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentRequests = requests.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    function sendEmail(idSolicitud) {
        const fechaSolicitud = new Date(requests[0].FechaSolicitud);
        const fechaFormateada = fechaSolicitud.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        // En tu componente React
        fetch('http://localhost:3001/sendEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                destinatario: requests[0].correoElectronico,
                asunto: 'Recordatorio Cita en Arquideco',
                mensaje: `¡Hola ${requests[0].nombreCliente}! \n  \n No olvides asistir a la cita que programaste de ${requests[0].nombreTipoReserva} para el día ${fechaFormateada} a las ${requests[0].HoraSolicitud}, no olvides llevar toda la información necesaria y llegar a tiempo. Estamos a la espectativa de recibirle en Arquideco. \n \n ¡Esperamos que tenga una experiencia maravillosa!`,
            }),
        });
    }

    if (userRole === 3) {
        return (
            <>
                <div className="information-crud">
                    <div className="title-box-crud">
                        <h2>Crear Recordatorio</h2>
                    </div>
                </div>
                {requests.length === 0 ? (
                    <div className="zero-data">
                        <p>No hay reservas disponibles.</p>
                    </div>
                ) : (
                    <div>
                        <table className="crud-state-table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Fecha Solicitud</th>
                                    <th>Hora Solicitud</th>
                                    <th>Tipo Solicitud</th>
                                    <th>Nombre Cliente</th>
                                    <th>Ver</th>
                                </tr>
                            </thead>
                            <tbody className="crud-state-tbody">
                                {currentRequests.map(request => (
                                    <tr key={request.idSolicitud} className="crud-state-tr">
                                        <td className="td-small">{request.idSolicitud}</td>
                                        <td className="td-big">{new Date(request.FechaSolicitud).toISOString().slice(0, 10)}</td>
                                        <td className="td-big">{request.HoraSolicitud}</td>
                                        <td className="td-big">{request.nombreTipoReserva}</td>
                                        <td className="td-big">{request.nombreCliente} {request.apellidoCliente}</td>
                                        <td className="td-small">
                                            <button className="action-button" onClick={() => sendEmail(request.idSolicitud)}><i className="fa-solid fa-paper-plane" style={{ color: "white", cursor: "pointer" }}></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div>
                            {requests.length > itemsPerPage && (
                                <ul className="pagination">
                                    {Array.from({ length: Math.ceil(requests.length / itemsPerPage) }, (_, index) => (
                                        <li key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active  txt-black' : ' txt-black'}>
                                            {index + 1}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                )}
            </>
        );
    }
    return null;
}
