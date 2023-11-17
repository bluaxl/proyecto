import "../../../css/Admin/user-profile.css";
import { ButtonProfile } from "../../client/profile/Profile";
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export function UsersProfile() {

    const { id } = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3001/consultUser/${id}`)
            .then(response => response.json())
            .then(response => {
                setUser(response);
                console.log(response);
            })
            .catch(error => {
                console.error('Error:', error);
                setUser(null);
            });
    }, [id]);

    async function inactivate() {
        fetch(`http://localhost:3001/inactivateUser/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    alert('Inactivado Correctamente');
                    navigate(`/admin/users-list`);
                } else {
                    console.error('Error al inactivarle', data.message);
                }
            })
            .catch(error => {
                console.error('Error al inactivarle:', error);
            });
    }
    async function activate() {
        fetch(`http://localhost:3001/activateUser/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    alert('Activado Correctamente');
                    navigate(`/admin/users-list`);
                } else {
                    console.error('Error al activarle', data.message);
                }
            })
            .catch(error => {
                console.error('Error al activarle:', error);
            });
    }

    return (
        <div className="Principal-content">
            {user && (
                <div key={user.idUsuario} className="profile-info-box">
                    <div className="profile-info-img">
                        <img src="./../../../img/icons/user-profile-2.png"></img>
                    </div>
                    <div className="profile-info-data">
                        <p className="txt-black"><p className="info-user-title">Estado:</p> {user.estado === 1 ? "activo" : "inactivo"}</p>
                        <p className="txt-black"><p className="info-user-title">Usuario:</p>{user.numIdentificacion}</p>
                    </div>
                </div>
            )}

            {user && (
                <div className="profile-data-box">
                    <div className="title">
                        <p className="txt-black">Datos de la cuenta</p>
                    </div>


                    {/* Caja de datos */}
                    <div className="data-box">
                        <p className="txt-black"><p className="info-user-title">Tipo de Identificación:</p> {user.tipoIdentificacion}</p>
                        <p className="txt-black"><p className="info-user-title">Nombres:</p> {user.nombre}</p>
                        <p className="txt-black"><p className="info-user-title">Apellidos:</p> {user.apellido}</p>
                        <p className="txt-black"><p className="info-user-title">Correo:</p> {user.correoElectronico}</p>
                        <p className="txt-black"><p className="info-user-title">Numero de telefono:</p> {user.telefono}</p>
                    </div>

                    {/* Botones de acción */}
                    <div className="button-box">
                        <ButtonProfile
                            props={user.estado === 1 ? "Inactivar Cuenta" : "Activar Cuenta"}
                            action={user.estado === 1 ? () => inactivate() : () => activate()}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}