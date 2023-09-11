// Importaciones
import { Link, Navigate } from "react-router-dom";
import "../../../css/Client/login-form.css";
import { useState } from "react";
import { useAuth } from "../../../auth/AuthProvider";

// Componente de formulario de inicio de sesión
function LoginForm() {
    // Estados para el correo y la contraseña
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Función para autenticación
    const auth = useAuth();

    // Si el usuario ya está autenticado, redirige a la página de perfil
    if(auth.isAuthenticated) {
        return  <Navigate to="/profile"/>;
    }

    // Renderizado del formulario de inicio de sesión
    return (
        <div className="loginForm">
            <div className="title-login">
                <h1>Ingresar</h1>
            </div>
            <form>
                {/* Campo de correo */}
                <div className="label-login">
                    <label><b>Correo: </b> </label>
                </div>
                <div>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                {/* Campo de contraseña */}
                <div className="label-login">
                    <label><b>Contraseña: </b></label>
                </div>
                <div>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                {/* Botón de enviar */}
                <div className="button-div">
                    <button className="btn-login" type="submit"><b>Enviar</b></button>
                </div>
            </form>
            {/* Enlace para registrarse */}
            <div>
                <p>No tiene una cuenta? <Link to="/register" className="link-form"><b>Cree una</b></Link></p>
            </div>
        </div>
    )
}

export default LoginForm;
