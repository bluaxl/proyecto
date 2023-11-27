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

                if (data.decodeToken.rolUser === 1) {
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
            setUser(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
      };

    if (userRole === 1) {
        return (
            <div className="Principal-content">
                <div className="profile-info-box">
                    <div className="profile-info-img">
                        <img src="./../img/icons/user-profile-2.png" alt="user-profile"></img>
                    </div>
                    <div className="profile-info-data">
                        <div className="txt-black">
                            <p className="info-user-title">Estado:</p> {user.estado === 1 ? "Activo" : "Inactivo"}
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
                        <button className="button-account" onClick={() => {navigate(`/advisory/update-advisory/${idUser}`)}}>
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