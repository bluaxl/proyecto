import "../../../css/Admin/cruds.css";
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

export function CrudUsers() {

    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const fetchUsers = () => {
        fetch(`http://localhost:3001/consult`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {
                setUsers(response);
            })
            .catch(error => console.error('Error:', error));
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    function verPerfil({ idUsuario }) {
        fetch(`http://localhost:3001/consultUser/${idUsuario}`)
            .then(response => response.json())
            .then(response => {
                if (response.idUsuario !== "") {
                    navigate(`/admin/user-profile/${idUsuario}`);
                } else {
                   alert("Error al mostrar el usuario")
                }
            })
            .catch(error => console.error("Error", error));
    }

    return (
        <>
            <div className="information-crud">
                <div className="title-box-crud">
                    <h2>Usuarios</h2>
                </div>
            </div>
            {users.length === 0 ? (
                <div className="zero-data">
                    <p>No hay Usuarios Disponibles.</p>
                </div>
            ) : (
                <div>
                    <table className="crud-state-table">
                        <tbody className="crud-state-tbody">
                            {currentUsers.map(user => (
                                <tr key={user.idUsuario} className="crud-state-tr">
                                    <td className="wd-20">{user.nombre} {user.apellido}</td>
                                    <td className="wd-20">{user.tipoIdentificacion}</td>
                                    <td className="wd-20">{user.nombreRol}</td>
                                    <td className="wd-10">{user.estado === 1 ? "activo" : "inactivo"}</td>
                                    <td className="wd-10">
                                        <button className="action-button" onClick={() => verPerfil({ idUsuario: user.idUsuario })}><i className="fa-solid fa-eye fa-2xl" style={{ color: "white", cursor: "pointer" }}></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {users.length > itemsPerPage && (
                        <ul className="pagination">
                            {Array.from({ length: Math.ceil(users.length / itemsPerPage) }, (_, index) => (
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