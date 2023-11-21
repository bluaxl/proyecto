// Importación de módulos y componentes
import { Link, useNavigate } from "react-router-dom";
import "../../../css/Client/register-form.css"
import { useRef } from "react";
import axios from "axios";


// Componente de formulario de registro
function RegisterForm() {

    const navigate = useNavigate();

    
    
    const nameRef = useRef(null);
    const numIdRef = useRef(null);
    const emailRef = useRef(null);
    const lastNameRef = useRef(null);
    const typeIdRef = useRef(null);
    const telRef = useRef(null);
    const passwordRef = useRef(null);
  
    function handleRegister(e) {
        e.preventDefault();
    
        const nameValue = nameRef.current.value;
        const numIdValue = numIdRef.current.value;
        const emailValue = emailRef.current.value;
        const lastNameValue = lastNameRef.current.value;
        const telvalue = telRef.current.value;
        const typeIdValue = typeIdRef.current.value;
        const passwordValue = passwordRef.current.value;
    
        
        const requestData = {
            name: nameValue,
            numId: numIdValue,
            email: emailValue,
            lastName: lastNameValue,
            tel: telvalue,
            typeId: typeIdValue,
            password: passwordValue,

        };
    
        axios.post("http://localhost:3001/registro", requestData,{
            headers: {
            "Content-Type": "application/json",
            }
        })
        .then((response) => {
            const data = response.data
            // Manejar la respuesta del servidor, por ejemplo, mostrar un mensaje de éxito
            console.log("Registro exitoso", data);
            alert("Registro exitoso");
            navigate("/login")
            })
            .catch((error) => {
            // Manejar errores, por ejemplo, mostrar un mensaje de error
            console.error("Error al registrar:", error);
            alert("Error en la solicitud: " + error.message);
            });
        }

    // Renderización del componente
    return (
        <div className="loginForm">
            <div className="title-login">
                <h1>Crear una cuenta</h1>
            </div>
            <form method="POST" onSubmit={handleRegister}>
                <div>
                    <div className="container1">
                        <div className="label-login">
                            <label><b>Nombre: </b> </label>
                        </div>
                        <div>
                            <input type="text" required ref={nameRef}/>
                        </div>
                        <div className="label-login">
                            <label><b>Número de identificación: </b> </label>
                        </div>
                        <div>
                            <input type="long" required ref={numIdRef}/>
                        </div>
                        <div className="label-login">
                            <label><b>Correo: </b> </label>
                        </div>
                        <div>
                            <input type="email" required ref={emailRef}/>
                        </div>
                    </div>
                    <div className="container2">
                        <div className="label-login">
                            <label><b>Apellido: </b></label>
                        </div>
                        <div>
                            <input type="text" required ref={lastNameRef}/>
                        </div>
                        <div className="label-login">
                            <label><b>Tipo de identificación: </b></label>
                        </div>
                        <div>
                            <select name="tidentificacion" id="tipoiden" ref={typeIdRef}>
                                <option value="cedula-ciudadania">Cédula de ciudadanía</option>
                                <option value="pasaporte">Pasaporte</option>
                                <option value="cedula-extranjeria">Cédula de extranjería</option>
                            </select>
                        </div>

                        <div className="label-login">
                            <label><b>Número de teléfono: </b></label>
                        </div>
                        <div>
                            <input type="long" required ref={telRef}/>
                        </div>
                    </div>
                </div>
                <div className="password-div">
                    <div>
                        <div className="label-login">
                            <label><b>Contraseña: </b> </label>
                        </div>
                        <div>
                            <input type="text" required ref={passwordRef}/>
                        </div>
                    </div>
                </div>
                <div className="button-div">
                    <button className="btn-login" type="submit"><b>Registrar</b></button>
                </div>
            </form>
            <div>
                <p>Ya tiene una cuenta? <Link to="/login" className="link-form"><b>Ingrese</b></Link></p>
            </div>
        </div>
    )
}

export default RegisterForm;