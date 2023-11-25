// Importación de módulos y componentes
import { Link, Outlet } from "react-router-dom";
import React, { useState } from 'react';
import "../../../css/Client/nav.css"


// Componente de navegación
export const Nav = () => {

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
            <nav className="principal-nav nav-bg-color-dark">
                <img className="principal-nav__img" src="./img/icons/Logo2.png" alt="Logo"></img>
                <button onClick={handleOpenMenu} className="abrirMenu">
                    <span className="material-symbols-outlined">menu</span>
                </button>
                <div className={`principal-nav-option ${menuVisible ? 'visible' : ''}`}>
                    <button onClick={handleCloseMenu} className="cerrarMenu"><span className="material-symbols-outlined">close</span></button>
                    <ul className="principal-nav__ul">
                        <li><Link to="/" className="nav-text txt-white">Inicio</Link></li>
                        <li><Link to="/reservation" className="nav-text txt-white">Reservar</Link></li>
                        <li><Link to="/login" className="nav-text txt-white"><span className="material-symbols-outlined">person</span>Ingresar</Link></li>
                    </ul>
                </div>
            </nav>
            <Outlet />
        </div>
    );
}
