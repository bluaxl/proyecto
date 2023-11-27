import "../../../css/Admin/cruds.css";
import "../../../css/Client/home.css";
import React, { useState, useEffect } from 'react';
import { DataRequest } from "./DataRequest";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function CrudReservation() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const [requests, setRequests] = useState([]);
    const [userRole, setUserRole] = useState(null);
    const [idUser, setIdUser] = useState(null);

    console.log(idUser)
    const uniqueIds = new Set();
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
                    return;
                }

                const data = response.data;
                console.log(data);

                if (data.decodeToken.rolUser === 3) {
                    setUserRole(data.decodeToken.rolUser);
                    setIdUser(data.decodeToken.idUser);

                    const requestData = await DataRequest(data.decodeToken.idUser);
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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentRequests = requests.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    function verSolicitud({ idSolicitud }) {
        fetch(`http://localhost:3001/requestIndividual/${idSolicitud}`)
            .then(response => response.json())
            .then(response => {
                if (response[0].nombreTipoReserva == "Avaluo") {
                    navigate(`/advisory/requestA/${idSolicitud}`);
                } else {
                    navigate(`/advisory/requestS/${idSolicitud}`);
                   
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
                                    <th>Id</th>
                                    <th>Fecha Solicitud</th>
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
                                        <td className="td-big">{request.nombreTipoReserva}</td>
                                        <td className="td-big">{request.nombreCliente} {request.apellidoCliente}</td>
                                        <td className="td-small">
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
