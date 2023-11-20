import "../../../css/Advisory/cruds.css";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export function NotificationReservation() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8); // Número de solicitudes por página
    const [requests, setRequests] = useState([]);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {

        const token = localStorage.getItem('token') 

        axios.get('http://localhost:3001/inicio', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        })
            .then((response) => {
                const data = response.data;

                if (data.decodeToken.rolUser === 3) {
                    setUserRole(data.decodeToken.rolUser);
                } else {
                    // Redirigir al usuario a una página de acceso denegado
                    navigate('/access-denied');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Session Expira')
                navigate('/login');
            });

        fetchRequests();
    }, [currentPage]);

    const fetchRequests = () => {
        fetch(`http://localhost:3001/requestReservation?tipo=${0}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(response => {

                const uniqueIds = new Set();
                const uniqueRequests = response.filter(requests => {
                    if (uniqueIds.has(requests.idSolicitud)) {
                        return false; 
                    }
                    uniqueIds.add(requests.idSolicitud);
                    return true;
                });

                setRequests(uniqueRequests);
            })
            .catch(error => console.error('Error:', error));
    };

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
                            <tbody className="crud-state-tbody">
                                {currentRequests.map(request => (
                                    <tr key={request.idSolicitud} className="crud-state-tr">
                                        <td className="wd-20">{new Date(request.FechaSolicitud).toISOString().slice(0, 10)}</td>
                                        <td className="wd-30">{request.nombreTipoReserva}</td>
                                        <td className="wd-20">{request.nombreCliente}</td>
                                        <td>
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
