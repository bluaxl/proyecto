import "../../../css/Admin/user-profile.css";
import React, {useEffect } from 'react';
import axios from "axios";
import { ButtonProfile } from "../../client/profile/Profile";

export function UserProfile() {

    useEffect(() => {
        const token = document.cookie.replace('token=', ''); // Reemplaza por tu método de obtención de token

        axios.get('http://localhost:3001/inicio',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        })
            .then((response) => {
                const id = response.data.decodeToken.idUser;
                axios.get(`http://localhost:3001/consultUser/${id}`)
                .then(userResponse => {
                  // Manejar la respuesta de la segunda solicitud
                  console.log(userResponse.data);
                })
                .catch(error => {
                  // Manejar errores de la segunda solicitud
                  console.error('Error en la segunda solicitud:', error);
                });
                
            })
            .catch((error) => {
                console.error('Error:', error);
                
            });
    });

    return (
        <>
            <div className="Principal-content">
                <div className="profile-info-box">
                    <div className="profile-info-img">
                        <img src="./../img/icons/user-profile-2.png"></img>
                    </div>
                    <div className="profile-info-data">
                        <p className="txt-black"><p className="info-user-title">Estado:</p> Activo</p>
                        <p className="txt-black"><p className="info-user-title">Usuario:</p> AO123456</p>
                    </div>
                </div>
                <div className="profile-data-box">
                    <div className="title">
                        <p className="txt-black">Datos de la cuenta</p>
                    </div>

                    {/* Caja de datos */}
                    <div className="data-box">
                        <p className="txt-black"><p className="info-user-title">Tipo de Identificación:</p> Tarjeta de Identidad</p>
                        <p className="txt-black"><p className="info-user-title">Nombres:</p> Angela Valentina</p>
                        <p className="txt-black"><p className="info-user-title">Apellidos:</p> Saavedra Fernandez</p>
                        <p className="txt-black"><p className="info-user-title">Correo:</p> vale123@hotmail.com</p>
                        <p className="txt-black"><p className="info-user-title">Numero de telefono:</p> 300 1234567</p>
                    </div>

                    {/* Botones de acción */}
                    <div className="button-box">
                        <ButtonProfile props="Actualizar mis datos" />
                        <ButtonProfile props="Inactivar Cuenta" />
                        <ButtonProfile props="Cambiar Contraseña" />
                    </div>
                </div>
            </div>
        </>
    )
}