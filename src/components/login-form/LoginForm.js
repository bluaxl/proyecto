import { Link } from "react-router-dom";
import "../../css/login-form.css"

function LoginForm() {
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
                    <input type="email" />
                </div>
                <div className="label-login">
                    <label><b>Contraseña: </b></label>
                </div>
                <div>
                    <input type="password" />
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