import { Link } from "react-router-dom";
import "../../../css/Client/other.css";

// Componente de navegación
export function AccesDenied(){
    return (
        <div className="container-access-denied">
            
              <div className="information-access-denied">
                <div className="oops-access-denied"></div>
                <div className="text-access-denied">
                    <h2 className="title-access">Acceso Denegado</h2>
                    <p className="txt-white info-access">Lamentablemente, no tienes los permisos necesarios para acceder a la página o recurso solicitado. Esta acción puede deberse a varias razones, como la falta de credenciales válidas, restricciones de seguridad o la necesidad de autenticación.</p>
                </div>
                <div className="buttons-access">
                <Link to="/login"><button className="button-access-denied" >Volver</button></Link>
                </div>
              </div>
        </div>
    )
}
