import "../../../css/Advisory/dashboard.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import React, { useRef, useEffect, useState} from "react";
import $ from 'jquery';
import axios from 'axios';


// Componente para el menú izquierdo del dashboard
const DashboardLeft = () => {

    const navigate = useNavigate();

    const [userRole, setUserRole] = useState(null);
    const [userId, setUserId] = useState(null);


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
                    setUserId(data.decodeToken.idUser);

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

        // Función para manejar el hover en los elementos de menú
        const handleMenuHover = (event) => {
            const submenu = $(event.currentTarget).find('.submenu');
            submenu.slideDown('slow'); // Usamos slideDown para la animación
        };

        const handleMenuLeave = (event) => {
            const submenu = $(event.currentTarget).find('.submenu');
            submenu.slideUp('slow'); // Usamos slideUp para cerrar la lista al salir del hover
        };

        // Agrega eventos de hover a los elementos de menú
        $('.menu-item').hover(handleMenuHover, handleMenuLeave);

        // Limpia los eventos al desmontar el componente
        return () => {
            $('.menu-item').off('mouseenter', handleMenuHover);
            $('.menu-item').off('mouseleave', handleMenuLeave);
        };
    }, [navigate]);


    if (userRole === 3) {
        return (
            <div>
                <div className="left-dashboard">
                    <div className="img-dashboard-box">
                        <img src="./../img/icons/Logo2.png"></img>
                    </div>
                    <div className="nav-left-dashboard">
                        <ul className="list">
                            {/* Elemento de menú "Inmuebles" con submenú */}
                            <li className="menu-item">
                                <div className="item-text down">
                                    <i className="fa-solid fa-house-user normal" style={{ color: "white" }}></i>Inmuebles<span class="material-symbols-outlined normal-row">expand_more</span>
                                </div>
                                <ul className="submenu">
                                    {/* Opción "Publicar Nuevo Inmueble" */}
                                    <li className="sub-menu-item">
                                        <div className="item-text">
                                            <i className="fa-solid fa-circle-plus normal" style={{ color: "white" }}></i><Link to="publish-new-propierty" className="link-list"> Publicar Nuevo Inmueble </Link><span class="material-symbols-outlined normal-row">expand_more</span>
                                        </div>
                                    </li>
                                    {/* Opción "Ver Inmuebles" */}
                                    <li className="sub-menu-item">
                                        <div className="item-text">
                                            <i className="fa-regular fa-eye normal" style={{ color: "white" }}></i><Link to="propierty-list" className="link-list">Ver Inmuebles</Link>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            {/* Elemento de menú "Reservas" con submenú */}
                            <li className="menu-item">
                                <div className="item-text down">
                                    <i className="fa-solid fa-clock normal" style={{ color: "white" }}></i>Reservas<span class="material-symbols-outlined normal-row">expand_more</span>
                                </div>
                                <ul className="submenu">
                                    {/* Opción "Ver Reservas" */}
                                    <li className="sub-menu-item">
                                        <div className="item-text">
                                            <i className="fa-regular fa-eye normal" style={{ color: "white" }}></i><Link to="show-reserves" className="link-list">Ver Reservas</Link>
                                        </div>
                                    </li>
                                    {/* Opción "Solicitudes" */}
                                    <li className="sub-menu-item">
                                        <div className="item-text">
                                            <i className="fa-regular fa-calendar-check normal" style={{ color: "white" }}></i><Link to="requests-reserves" className="link-list">Solicitudes</Link>
                                        </div>
                                    </li>
                                    {/* Opción "Crear Mensaje" */}
                                    <li className="sub-menu-item">
                                        <div className="item-text">
                                            <i className="fa-solid fa-circle-plus normal" style={{ color: "white" }}></i><Link to="create-menssage" className="link-list">Crear Mensaje</Link>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
    return null;
}

// Componente para la parte superior del dashboard
const DashboardSup = () => {
    
    return (
        <div className="sup-dashboard">
        <div className="title-dashboard">
            <p className="txt-white">
                Administrador Dashboard
            </p>
        </div>
        <div className="icon-dashboard ">
            <Link to="user-profile"><i class="fa-solid fa-user fa-xl" style={{ color: "white" }}></i></Link>
        </div>
    </div>
    )
}

// Componente principal del dashboard de Asesor
export const DashboardAdvisory = () => {
    return (
        <div>
            <div>
                <DashboardLeft />
                <DashboardSup />
            </div>
            <div className="principal-content">
                <Outlet />
            </div>
        </div>
    )
}
