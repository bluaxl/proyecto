import "../../../css/Advisory/cruds.css";
import "../../../css/Client/home.css";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function CrudReservation() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
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
        // Lógica para obtener las solicitudes de la página actual desde el servidor
        fetch(`http://localhost:3001/requestReservation?tipo=${1}`, {
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

    function verSolicitud({ idSolicitud }) {
        fetch(`http://localhost:3001/requestIndividual/${idSolicitud}`)
            .then(response => response.json())
            .then(response => {
                if (response.nombreTipoReserva !== "Avaluo") {
                    navigate(`/advisory/requestS/${idSolicitud}`);
                } else {
                    navigate(`/advisory/requestN/${idSolicitud}`);
                }
            })
            .catch(error => console.error("Error", error));
    }


    if (userRole === 3) {
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
                    <div>
                        <table className="crud-state-table">
                            <thead>
                                <tr>
                                    <th>Fecha Solicitud</th>
                                    <th>Tipo Solicitud</th>
                                    <th>Nombre Cliente</th>
                                    <th>Ver</th>
                                </tr>
                            </thead>
                            <tbody className="crud-state-tbody">
                                {currentRequests.map(request => (
                                    <tr key={request.idSolicitud} className="crud-state-tr">
                                        <td>{new Date(request.FechaSolicitud).toISOString().slice(0, 10)}</td>
                                        <td>{request.nombreTipoReserva}</td>
                                        <td>{request.nombreCliente}</td>
                                        <td>
                                            <button className="action-button" onClick={() => verSolicitud({ idSolicitud: request.idSolicitud })}><i className="fa-solid fa-eye fa-2xl" style={{ color: "white", cursor: "pointer" }}></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
                )}
            </>
        );
    }
    return null;
}
