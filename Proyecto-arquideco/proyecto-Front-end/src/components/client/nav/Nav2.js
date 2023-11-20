// Importación de módulos y componentes
import { Outlet, Link } from "react-router-dom";
import "../../../css/Client/nav.css"


// Componente de navegación
export const Nav2 = () => {

        return (
            <div>
                <nav className="principal-nav nav-bg-color-light">
                    <img src="./img/icons/Logo1.png"></img>
                    <div className="principal-nav-option">
                        <ul>
                            <li>
                                <Link to="/" className="nav-text txt-black">Inicio</Link>
                            </li>
                            <li>
                                <Link to="/reservation" className="nav-text txt-black">Reservar</Link>
                            </li>
                            <li>
                                <Link to="/login" className="nav-text txt-black"> <span className="material-symbols-outlined">person</span>Ingresar</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <Outlet />
            </div>
        )
}
