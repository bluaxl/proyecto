import "../../../css/Admin/user-profile.css";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function UserProfile() {

    const navigate = useNavigate();

    const [userRole, setUserRole] = useState(null);
    const [idUser, setIdUser] = useState(null);
    const [user, setUser] = useState([]);
    const token = localStorage.getItem('token')

    useEffect(() => {
       

        axios.get('http://localhost:3001/inicio', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        })
            .then((response) => {
                const data = response.data;

                if (data.decodeToken.rolUser === 2) {
                    setUserRole(data.decodeToken.rolUser)
                    setIdUser(data.decodeToken.idUser)

                } else {
                    // Redirigir al usuario a una página de acceso denegado
                    navigate('/access-denied');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                navigate('/login');
            });


    }, [navigate]);

    axios.get(`http://localhost:3001/consultUser/${idUser}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
    })
        .then((response) => {
            const data = response.data;
            console.log(data);
            setUser(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
      };

    if (userRole === 2) {
        return (
            <div className="Principal-content">
                <div className="profile-info-box">
                    <div className="profile-info-img">
                        <img src="./../img/icons/user-profile-2.png" alt="user-profile"></img>
                    </div>
                    <div className="profile-info-data">
                        <div className="txt-black">
                            <p className="info-user-title">Estado:</p> {user.estado === 0 ? "Activo" : "Inactivo"}
                        </div>
                        <p className="txt-black"><p className="info-user-title">Usuario:</p> {user.numIdentificacion}</p>
                    </div>
                </div>
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
                        <p className="txt-black"><p className="info-user-title">Número de teléfono:</p> {user.telefono}</p>
                    </div>

                    {/* Botones de acción */}
                    <div className="button-box">
                        <button className="button-account" onClick={() => {navigate(`/admin/update-profile/${idUser}`)}}>
                            <p className="txt-white">Actualizar mis datos</p>
                        </button>
                        <button className="button-account" onClick={handleLogout}>
                            <p className="txt-white">Cerrar Sesión</p>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    return null;
}