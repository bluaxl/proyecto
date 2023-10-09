// Importaciones
import { Link} from "react-router-dom";
import "../../../css/Client/login-form.css";
import React, { useRef } from "react";

// Componente de formulario de inicio de sesión
function LoginForm() {
    
  // const navigate = useNavigate();
  // const emailRef = useRef(null);
  // const passwordRef = useRef(null);
  // const form = document.querySelector('#myform');


  // function handleRegister(e) {
  //   e.preventDefault();

  //   const emailValue = emailRef.current.value;
  //   const passwordValue = passwordRef.current.value;

  //   const requestData = {
  //     email: emailValue,
  //     password: passwordValue,
  //   };

  //   fetch("http://localhost:3000/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(requestData),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("Registro exitoso", data);
  //       document.cookie = `token=${data.token}; max-age=10; path=/; samesite=strict`;
  //       console.log(document.cookie);
  //       navigate("/"); // Redirigir a la ruta deseada después del registro
  //     })
  //     .catch((error) => {
  //       console.error("Error al registrar:", error);
  //       form.reset();
  //     });
  // }
    // Renderizado del formulario de inicio de sesión
    return (
        <div className="loginForm">
            <div className="title-login">
                <h1>Ingresar</h1>
            </div>
            <form  id="myform">
                {/* Campo de correo */}
                <div className="label-login">
                    <label><b>Correo: </b> </label>
                </div>
                <div>
                    <input type="email" />
                </div>
                {/* Campo de contraseña */}
                <div className="label-login">
                    <label><b>Contraseña: </b></label>
                </div>
                <div>
                    <input type="password"/>
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
