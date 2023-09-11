// Importación de módulos y componentes
import { Link, Navigate } from "react-router-dom";
import "../../../css/Client/register-form.css"
import { useState } from "react";
import { useAuth } from "../../../auth/AuthProvider";

// Componente de formulario de registro
function RegisterForm() {
    // Declaración de estados
    const [name, setName] = useState("");
    const [identification, setIdentification] = useState("");
    const [email, setEmail] = useState("");
    const [lastname, setLastname] = useState("");
    const [typeIdentification, setTypeIdentification] = useState("");
    const [cell, setCell] = useState("");
    const [password, setPassword] = useState("");

    // Acceso al contexto de autenticación
    const auth = useAuth();

    // Redirección si el usuario está autenticado
    if(auth.isAuthenticated) {
        return  <Navigate to="/admin"/>;
    }

    // Renderización del componente
    return (
        <div className="loginForm">
            <div className="title-login">
                <h1>Crear una cuenta</h1>
            </div>
            <form>
                <div>
                    <div className="container1">
                        <div className="label-login">
                            <label><b>Nombre: </b> </label>
                        </div>
                        <div>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className="label-login">
                            <label><b>Número de identificación: </b> </label>
                        </div>
                        <div>
                            <input type="long" value={identification} onChange={(e) => setIdentification(e.target.value)}/>
                        </div>
                        <div className="label-login">
                            <label><b>Correo: </b> </label>
                        </div>
                        <div>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                    </div>
                    <div className="container2">
                        <div className="label-login">
                            <label><b>Apellido: </b></label>
                        </div>
                        <div>
                            <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)}/>
                        </div>
                        <div className="label-login">
                            <label><b>Tipo de identificación: </b></label>
                        </div>
                        <div>
                            <select name="tidentificacion" id="tipoiden" value={typeIdentification} onChange={(e) => setTypeIdentification(e.target.value)}>
                                <option value="cedula-ciudadania">Cédula de ciudadanía</option>
                                <option value="pasaporte">Pasaporte</option>
                                <option value="cedula-extrangeria">Cédula de extranjería</option>
                            </select>
                        </div>

                        <div className="label-login">
                            <label><b>Número de teléfono: </b></label>
                        </div>
                        <div>
                            <input type="long" value={cell} onChange={(e) => setCell(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <div className="password-div">
                    <div>
                        <div className="label-login">
                            <label><b>Contraseña: </b> </label>
                        </div>
                        <div>
                            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <div className="button-div">
                    <button className="btn-login" type="submit"><b>Enviar</b></button>
                </div>
            </form>
            <div>
                <p>Ya tiene una cuenta? <Link to="/login" className="link-form"><b>Ingrese</b></Link></p>
            </div>
        </div>
    )
}

export default RegisterForm;
