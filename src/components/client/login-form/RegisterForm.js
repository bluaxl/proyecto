// Importación de módulos y componentes
import { Link} from "react-router-dom";
import "../../../css/Client/register-form.css"
import { useRef } from "react";
import { useAuth } from "../../../auth/AuthProvider";

// Componente de formulario de registro
function RegisterForm() {
    
    // const nameRef = useRef(null);
    // const numIdRef = useRef(null);
    // const emailRef = useRef(null);
    // const lastNameRef = useRef(null);
    // const typeIdRef = useRef(null);
    // const numberRef = useRef(null);
    // const passwordRef = useRef(null);

    // const form = document.querySelector('#myform');
  
    // function handleRegister(e) {
    //   e.preventDefault();
  
    //   const nameValue = nameRef.current.value;
    //   const numIdValue = numIdRef.current.value;
    //   const emailValue = emailRef.current.value;
    //   const lastNameValue = lastNameRef.current.value;
    //   const typeIdValue = typeIdRef.current.value;
    //   const numberValue = numberRef.current.value;
    //   const passwordValue = passwordRef.current.value;
  
    //   const requestData = {
    //     name: nameValue,
    //     numId: numIdValue,
    //     email: emailValue,
    //     lastName: lastNameValue,
    //     typeId: typeIdValue,
    //     number: numberValue,
    //     password: passwordValue

    //   };
  
    //   fetch("http://localhost:3001/registro", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(requestData),
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       // Manejar la respuesta del servidor, por ejemplo, mostrar un mensaje de éxito
    //       console.log("Registro exitoso", data);
    //       useNavigate("/login")
    //     })
    //     .catch((error) => {
    //       // Manejar errores, por ejemplo, mostrar un mensaje de error
    //       console.error("Error al registrar:", error);
    //       form.reset()
    //     });
    // }

    // Renderización del componente
    return (
        <div className="loginForm">
            <div className="title-login">
                <h1>Crear una cuenta</h1>
            </div>
            <form method="POST">
                <div>
                    <div className="container1">
                        <div className="label-login">
                            <label><b>Nombre: </b> </label>
                        </div>
                        <div>
                            <input type="text"/>
                        </div>
                        <div className="label-login">
                            <label><b>Número de identificación: </b> </label>
                        </div>
                        <div>
                            <input type="long"/>
                        </div>
                        <div className="label-login">
                            <label><b>Correo: </b> </label>
                        </div>
                        <div>
                            <input type="email"/>
                        </div>
                    </div>
                    <div className="container2">
                        <div className="label-login">
                            <label><b>Apellido: </b></label>
                        </div>
                        <div>
                            <input type="text"/>
                        </div>
                        <div className="label-login">
                            <label><b>Tipo de identificación: </b></label>
                        </div>
                        <div>
                            <select name="tidentificacion" id="tipoiden">
                                <option value="cedula-ciudadania">Cédula de ciudadanía</option>
                                <option value="pasaporte">Pasaporte</option>
                                <option value="cedula-extrangeria">Cédula de extranjería</option>
                            </select>
                        </div>

                        <div className="label-login">
                            <label><b>Número de teléfono: </b></label>
                        </div>
                        <div>
                            <input type="long"/>
                        </div>
                    </div>
                </div>
                <div className="password-div">
                    <div>
                        <div className="label-login">
                            <label><b>Contraseña: </b> </label>
                        </div>
                        <div>
                            <input type="text"/>
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
