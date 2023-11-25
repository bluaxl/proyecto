import React, { useState } from 'react';
import { Link, Outlet } from "react-router-dom";

export const Nav2 = () => {
    // Estado para controlar la visibilidad del menú
    const [menuVisible, setMenuVisible] = useState(false);

    // Función para abrir el menú
    const handleOpenMenu = () => {
        setMenuVisible(true);
    };

    // Función para cerrar el menú
    const handleCloseMenu = () => {
        setMenuVisible(false);
    };

    return (
        <div>
            <nav className="principal-nav nav-bg-color-light">
                <img src="./img/icons/Logo1.png" alt="Logo"></img>
                <button onClick={handleOpenMenu} className="abrirMenu">
                    <span className="material-symbols-outlined">menu</span>
                </button>
                <div className={`principal-nav-option ${menuVisible ? 'visible' : ''}`}>
                    <button onClick={handleCloseMenu} className="cerrarMenu">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                    <ul className="principal-nav__ul">
                        <li><Link to="/" className="nav-text txt-black">Inicio</Link> </li>
                        <li><Link to="/reservation" className="nav-text txt-black">Reservar</Link></li>
                        <li><Link to="/login" className="nav-text txt-black"><span className="material-symbols-outlined">person</span>Ingresar</Link></li>
                    </ul>
                </div>
            </nav>
            <Outlet />
        </div>
    );
};