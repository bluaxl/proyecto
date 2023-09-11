// Importación de módulos y componentes
import { Outlet, Link } from "react-router-dom";
import "../../../css/Client/nav2.css"

// Componente de navegación
export const Nav2 = () => {
    return (
        <div>
            <nav className="principal-nav">
                <img src="./img/Logo1.png"></img>
                <div className="principal-nav-option">
                    <ul>
                        <li>
                            <Link to="/" className="nav-text">Inicio</Link>
                        </li>
                        <li>
                            <Link to="/reservation" className="nav-text">Reservar</Link>
                        </li>
                        <li>
                            <Link to="/login" className="nav-text"> <span className="material-symbols-outlined">person</span>Ingresar</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <Outlet />
        </div>
    )
}
