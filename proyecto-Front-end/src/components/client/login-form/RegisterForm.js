import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import "../../../css/login-form.css"

function RegisterForm() {
    const navigate = useNavigate();

        const nameRef = useRef(null);
        const numIdRef = useRef(null);
        const emailRef = useRef(null);
        const lastNameRef = useRef(null);
        const typeIdRef = useRef(null);
        const numberRef = useRef(null);
        const passwordRef = useRef(null);

        const form = document.querySelector('#myform');
    
        function handleRegister(e) {
        e.preventDefault();
    
        const nameValue = nameRef.current.value;
        const numIdValue = numIdRef.current.value;
        const emailValue = emailRef.current.value;
        const lastNameValue = lastNameRef.current.value;
        const typeIdValue = typeIdRef.current.value;
        const numberValue = numberRef.current.value;
        const passwordValue = passwordRef.current.value;
    
        const requestData = {
            name: nameValue,
            numId: numIdValue,
            email: emailValue,
            lastName: lastNameValue,
            typeId: typeIdValue,
            number: numberValue,
            password: passwordValue

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
            navigate("/login")
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
                <h1>Crear una cuenta</h1>
            </div>
            <form onSubmit={handleRegister} id="myform">
                <div>
                    <div className="container1">
                        <div className="label-login">
                            <label><b>Nombre: </b> </label>
                        </div>
                        <div>
                            <input type="text" ref={nameRef}/>
                        </div>
                        <div className="label-login">
                            <label><b>Número de identificación: </b> </label>
                        </div>
                        <div>
                            <input type="long" ref={numIdRef}/>
                        </div>
                        <div className="label-login">
                            <label><b>Correo: </b> </label>
                        </div>
                        <div>
                            <input type="email" ref={emailRef}/>
                        </div>
                    </div>
                    <div className="container2">
                        <div className="label-login">
                            <label><b>Apellido: </b></label>
                        </div>
                        <div>
                            <input type="text" ref={lastNameRef}/>
                        </div>
                        <div className="label-login">
                            <label><b>Tipo de identificación: </b></label>
                        </div>
                        <div>
                            <select name="tidentificacion" id="tipoiden" type="text" ref={typeIdRef}>
                                <option value="cedula-ciudadania">Cédula de ciudadanía</option>
                                <option value="pasaporte">Pasaporte</option>
                                <option value="cedula-extrangeria">Cédula de extranjería</option>
                            </select>
                        </div>

                        <div className="label-login">
                            <label><b>Número de teléfono: </b></label>
                        </div>
                        <div>
                            <input type="long" ref={numberRef}/>
                        </div>
                    </div>
                </div>
                <div className="password-div">
                    <div>
                        <div className="label-login">
                            <label><b>Contraseña: </b> </label>
                        </div>
                        <div>
                            <input type="text" ref={passwordRef}/>
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