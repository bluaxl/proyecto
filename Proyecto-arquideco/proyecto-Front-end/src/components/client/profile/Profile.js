// Importación de módulos y componentes
import "../../../css/Client/profile-cli.css";
import { useNavigate } from "react-router-dom";
import { Footer } from "../footer/footer";
import { useEffect, useState } from "react";
import axios from "axios";

// Componente ButtonProfile
export function ButtonProfile({ props, action }) {
    return (
        <button className="button-account" onClick={action}>
            <p className="txt-white">{props}</p>
        </button>
    );
}

// Componente Profile
export function Profile() {

    const navigate = useNavigate();
    const [userRole, setUserRole] = useState(null);
    useEffect(()=>{
        const token = localStorage.getItem('token') 

        axios.get('http://localhost:3001/inicio', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        })
            .then((response) => {
                const data = response.data;

                if (data.decodeToken.rolUser) {
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
    }, [navigate])
    
    if (userRole) {
        return (
            <div className="principal">
                {/* Contenedor principal del perfil */}
                <div className="profile-box">
                    {/* Información del usuario */}
                    <div className="user-info">
                        <div className="user-info-img">
                            <img src="./../img/icons/user-profile.png"></img>
                        </div>
                        <div className="user-info-data">
                        <p className="txt-white"><p className="info-text-title">Estado:</p> Activo</p>
                        <p className="txt-white"><p className="info-text-title">Usuario:</p> AO123456</p>
                        </div>
                    </div>

                    {/* Datos de la cuenta */}
                    <div class="account-data">
                        <div className="title">
                            <p className="txt-white">Datos de la cuenta</p>
                        </div>

                        {/* Caja de datos */}
                        <div className="data-box">
                            <p className="txt-white"><p className="info-text-title">Tipo de Identificación:</p> Tarjeta de Identidad</p>
                            <p className="txt-white"><p className="info-text-title">Nombres:</p> Angela Valentina</p>
                            <p className="txt-white"><p className="info-text-title">Apellidos:</p> Saavedra Fernandez</p>
                            <p className="txt-white"><p className="info-text-title">Correo:</p> vale123@hotmail.com</p>
                            <p className="txt-white"><p className="info-text-title">Numero de telefono:</p> 300 1234567</p>
                        </div>

                        {/* Botones de acción */}
                        <div className="button-box">
                            <ButtonProfile props="Actualizar mis datos" />
                            <ButtonProfile props="Inactivar Cuenta" />
                            <ButtonProfile props="Cambiar Contraseña" />
                        </div>
                    </div>
                </div>

                {/* Componente del pie de página */}
                <div>
                    <Footer />
                </div>
            </div>
        );
    }
    return null;
}
