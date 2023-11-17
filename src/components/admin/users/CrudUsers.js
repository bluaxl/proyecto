import "../../../css/Admin/cruds.css";
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

export function CrudUsers() {

    const navigate = useNavigate();
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3001/consult`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {
                setUsers(response)
                console.log(response)
            })
            .catch(error => console.error('Error:', error));
    }, []);

    function verPerfil({ idUsuario }) {
        console.log(idUsuario);

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
    return(
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
        <table className="crud-state-table">
       
        <tbody className="crud-state-tbody">
        {users.map(user => (
            <tr key={user.idUsuario} className="crud-state-tr">
                <td className="wd-20">{user.nombre} {user.apellido}</td>
                <td className="wd-20">{user.tipoIdentificacion}</td>
                <td className="wd-20">{user.nombreRol}</td>
                <td className="wd-10">{user.estado === 1 ? "activo" : "inactivo"}</td>

                <td className="wd-10">
                    <button className="action-button" onClick={() => verPerfil({ idUsuario: user.idUsuario })}><i className="fa-solid fa-eye fa-2xl" style={{color: "white", cursor : "pointer"}}></i></button>
                </td>
            </tr>
             ))}
        </tbody>
    </table>     
    )}  
        </>
    )
}