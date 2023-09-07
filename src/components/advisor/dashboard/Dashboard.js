import "../../../css/Admin/dashboard.css";
import { Outlet, Link } from "react-router-dom";
import React, { useEffect } from "react";
import $ from 'jquery';

const DashboardLeft = () => {

    useEffect(() => {
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
    }, []);
    return (
        <div>
            <div className="left-dashboard">
                <div className="img-dashboard-box">
                    <img src="./../img/Logo2.png"></img>
                </div>
                <nav className="nav-left-dashboard">
                    <ul className="list">
                        <li className="menu-item">
                            <div className="item-text down">
                                <i className="fa-solid fa-house-user normal" style={{ color: "white" }}></i>Inmuebles<span class="material-symbols-outlined normal-row">expand_more</span>
                            </div>
                            <ul className="submenu">
                                <li className="sub-menu-item">
                                    <div className="item-text">
                                        <i className="fa-solid fa-circle-plus normal" style={{ color: "white" }}></i><Link to="publish-new-propierty" className="link-list"> Publicar Nuevo Inmueble </Link><span class="material-symbols-outlined normal-row">expand_more</span>
                                    </div>
                                </li>
                                <li className="sub-menu-item">
                                    <div className="item-text">
                                        <i className="fa-regular fa-eye normal" style={{ color: "white" }}></i><Link to="propierty-list" className="link-list">Ver Inmuebles</Link>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li className="menu-item">
                            <div className="item-text down">
                                <i className="fa-solid fa-clock normal" style={{ color: "white" }}></i>Reservas<span class="material-symbols-outlined normal-row">expand_more</span>
                            </div>
                            <ul className="submenu">
                                <li className="sub-menu-item">
                                    <div className="item-text">
                                        <i className="fa-regular fa-eye normal" style={{ color: "white" }}></i><Link to="show-reserves" className="link-list">Ver Reservas</Link>
                                    </div>
                                </li>
                                <li className="sub-menu-item">
                                    <div className="item-text">
                                        <i className="fa-regular fa-calendar-check normal" style={{ color: "white" }}></i><Link to="requests-reserves" className="link-list">Solicitudes</Link>
                                    </div>
                                </li>
                                <li className="sub-menu-item">
                                    <div className="item-text">
                                        <i className="fa-solid fa-circle-plus normal" style={{ color: "white" }}></i><Link to="create-menssage" className="link-list">Crear Mensaje</Link>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )

}

const DashboardSup = () => {
    return (
        <div className="sup-dashboard">
            <div className="title-dashboard">
                <p>
                    Asesor Dashboard
                </p>
            </div>
            <div className="icon-dashboard ">
                <Link to="user-profile"><i class="fa-solid fa-user fa-xl" style={{ color: "white" }}></i></Link>            </div>
        </div>
    )
}


export const DashboardAdvisory = () => {
    return (
        <div><div>
            <DashboardLeft />
            <DashboardSup />
        </div>
            <div className="principal-content">
                <Outlet />
            </div>
        </div>
    )
} 