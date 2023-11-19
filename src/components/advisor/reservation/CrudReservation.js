import "../../../css/Advisory/cruds.css";
import "../../../css/Client/home.css";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function CrudReservation() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
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
                        <tbody className="crud-state-tbody">
                        {currentRequests.map(request => (
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
