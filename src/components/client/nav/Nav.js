// Importación de módulos y componentes
import { Link, Outlet } from "react-router-dom";
import "../../../css/Client/nav.css"

// Componente de navegación
export const Nav = () => {
    return (
        <div>
            <nav className="principal-nav">
                <img src="./img/Logo2.png"></img>
                <div className="principal-nav-option2">
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
