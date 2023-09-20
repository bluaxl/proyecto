import { Link, useNavigate } from "react-router-dom";
import "../../../css/login-form.css";
import { useRef } from "react";

function LoginForm() {

    const navigate = useNavigate();

    const nameRef = useRef(null);
    const passwordRef = useRef(null);
    const form = document.querySelector('#myform');
  
    function handleRegister(e) {
      e.preventDefault();
  
      const nameValue = nameRef.current.value;
      const passwordValue = passwordRef.current.value;
  
      const requestData = {
        name: nameValue,
        password: passwordValue,
      };
  
      fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((res) => res.json())
        .then((data) => {
          // Manejar la respuesta del servidor, por ejemplo, mostrar un mensaje de éxito
          console.log("Registro exitoso", data);
          document.cookie = `token=${data.token}; max-ager${10}; path=/; samesite=strict` 
          console.log(document.cookie)
          navigate("/")
        })
        .catch((error) => {
          // Manejar errores, por ejemplo, mostrar un mensaje de error
          console.error("Error al registrar:", error);
          form.reset()
        });
    }
  
    return (
        <div className="loginForm">
            <div className="title-login">
                <h1>Ingresar</h1>
            </div>
            <form onSubmit={handleRegister} id="myform">
                <div className="label-login">
                    <label><b>Correo: </b> </label>
                </div>
                <div>
                    <input type="text" ref={nameRef}/>
                </div>
                <div className="label-login">
                    <label><b>Contraseña: </b></label>
                </div>
                <div>
                    <input type="password"  ref={passwordRef}/>
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