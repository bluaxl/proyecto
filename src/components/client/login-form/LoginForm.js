import { Link, Navigate } from "react-router-dom";
import "../../../css/Client/login-form.css";
import { useState } from "react";
import { useAuth } from "../../../auth/AuthProvider";


function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const auth = useAuth();

    if(auth.isAuthenticated) {
        return  <Navigate to="/profile"/>;
    }

    return (
        <div className="loginForm">
            <div className="title-login">
                <h1>Ingresar</h1>
            </div>
            <form>
                <div className="label-login">
                    <label><b>Correo: </b> </label>
                </div>
                <div>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="label-login">
                    <label><b>Contraseña: </b></label>
                </div>
                <div>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="button-div">
                    <button className="btn-login" type="submit"><b>Enviar</b></button>
                </div>
            </form>
            <div>
                <p>No tiene una cuenta? <Link to="/register" className="link-form"><b>Cree una</b></Link></p>
            </div>
        </div>
    )
}

export default LoginForm;