// Importaciones
import { Link, useNavigate } from "react-router-dom";
import "../../../css/Client/login-form.css";
import React, { useRef } from "react";
import axios from "axios";

// Componente de formulario de inicio de sesión
function LoginForm() {
    

    const navigate = useNavigate();

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
  
    function handleRegister(e) {
      e.preventDefault();
  
      const emailValue = emailRef.current.value;
      const passwordValue = passwordRef.current.value;
  
      const requestData = {
        email: emailValue,
        password: passwordValue,
      };
      axios.post("http://localhost:3001/login", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          const data = response.data;
          console.log("Registro exitoso", data);
          document.cookie = `token=${data.token}; max-age=${3600 * 2}; path=/; samesite=strict`;
          console.log(document.cookie);
          if (data.rolUser === 2) {
            navigate("/admin/create-proyect");
          } else if (data.rolUser === 1) {
            navigate("/");
          }
        })
        .catch((error) => {
          console.error("Error al Ingresar:", error);
        });
    }

    // Renderizado del formulario de inicio de sesión
    return (
        <div className="loginForm">
            <div className="title-login">
                <h1>Ingresar</h1>
            </div>
            <form onSubmit={handleRegister}  id="myform">
                {/* Campo de correo */}
                <div className="label-login">
                    <label><b>Correo: </b> </label>
                </div>
                <div>
                    <input type="email" required ref={emailRef}/>
                </div>
                {/* Campo de contraseña */}
                <div className="label-login">
                    <label><b>Contraseña: </b></label>
                </div>
                <div>
                    <input type="password" required ref={passwordRef}/>
                </div>
                {/* Botón de enviar */}
                <div className="button-div">
                    <button className="btn-login" type="submit"><b>Ingresar</b></button>
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
