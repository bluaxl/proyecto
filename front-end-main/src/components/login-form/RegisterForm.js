import "../../css/register-form.css"

function RegisterForm() {
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
                            <input type="text" />
                        </div>
                        <div className="label-login">
                            <label><b>Número de identificación: </b> </label>
                        </div>
                        <div>
                            <input type="long" />
                        </div>
                        <div className="label-login">
                            <label><b>Correo: </b> </label>
                        </div>
                        <div>
                            <input type="email" />
                        </div>
                    </div>
                    <div className="container2">
                        <div className="label-login">
                            <label><b>Apellido: </b></label>
                        </div>
                        <div>
                            <input type="text" />
                        </div>
                        <div className="label-login">
                            <label><b>Tipo de identificación: </b></label>
                        </div>
                        <div>
                            <select name="tidentificacion" id="tipoiden">
                                <option value="javascript">Cédula de ciudadanía</option>
                                <option value="php">Pasaporte</option>
                                <option value="java">Cédula de extranjería</option>
                            </select>
                        </div>

                        <div className="label-login">
                            <label><b>Número de teléfono: </b></label>
                        </div>
                        <div>
                            <input type="long" />
                        </div>
                    </div>
                </div>
                <div className="password-div">
                    <div>
                        <div className="label-login">
                            <label><b>Contraseña: </b> </label>
                        </div>
                        <div>
                            <input type="text" />
                        </div>
                    </div>
                </div>
                <div className="button-div">
                    <button className="btn-login" type="submit"><b>Enviar</b></button>
                </div>
            </form>
            <p>No tiene una cuenta? <a link="#"><b>Cree una</b></a></p>

        </div>
    )
}

export default RegisterForm;