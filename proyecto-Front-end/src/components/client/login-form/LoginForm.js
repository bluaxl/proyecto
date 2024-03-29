// Importaciones
import { Link, useNavigate } from "react-router-dom";
import "../../../css/Client/login-form.css";
import React, { useRef } from "react";
import axios from "axios";

// Componente de formulario de inicio de sesión
function LoginForm() {
    

    const navigate = useNavigate();

    const idURef = useRef(null);
    const passwordRef = useRef(null);
  
    function handleRegister(e) {
      e.preventDefault();
  
      const idUvalue = idURef.current.value;
      console.log(idUvalue);
      const passwordValue = passwordRef.current.value;
      console.log(passwordValue);
  
      const requestData = {
        idU: idUvalue,
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

          localStorage.setItem('token', data.token);

          if (data.rolUser === 2) {
            navigate("/admin");
          } else if (data.rolUser === 1) {
            navigate("/profile");
          }else{
            navigate("/advisory")
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
                    <label><b>Número de Identificación: </b> </label>
                </div>
                <div>
                    <input type="long" className="txt-black" required ref={idURef}/>
                </div>
                {/* Campo de contraseña */}
                <div className="label-login">
                    <label><b>Contraseña: </b></label>
                </div>
                <div>
                  <input type="password" className="txt-black" required ref={passwordRef} />
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
