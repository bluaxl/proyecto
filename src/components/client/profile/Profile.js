import "../../../css/Client/profile-cli.css";
import { Footer } from "../footer/footer";

function ButtonProfile({ props }) {
    return (
        <button className="button-account">
            <p>{props}</p>
        </button >
    );
}


export function Profile() {
    return (
        <div>
            <div className="profile-box">
                <div className="user-info">
                    <div className="user-info-img">
                        <img src="./../img/user-profile.png"></img>
                    </div>
                    <p><p className="info-text-title">Estado:</p> Activo</p>
                    <p><p className="info-text-title">Usuario:</p> AO123456</p>
                </div>
                <div class="account-data">
                    <div className="title">
                        <p>Datos de la cuenta</p>
                    </div>

                    <div className="data-box">
                        <p><p className="info-text-title">Tipo de Identificación:</p> Tarjeta de Identidad</p>
                        <p><p className="info-text-title">Nombres:</p> Angela Valentina</p>
                        <p><p className="info-text-title">Apellidos:</p> Saavedra Fernandez</p>
                        <p><p className="info-text-title">Correo:</p> vale123@hotmail.com</p>
                        <p><p className="info-text-title">Numero de telefono:</p> 300 1234567</p>
                    </div>

                    <div className="button-box">
                        <ButtonProfile props="Actualizar mis datos" />
                        <ButtonProfile props="Inactivar Cuenta" />
                        <ButtonProfile props="Cambiar Contraseña" />
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}