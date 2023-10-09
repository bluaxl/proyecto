// Importación de módulos y componentes
import "../../../css/Client/reservation.css";
import { Button, DateTimeButton, DateTimeButton2 } from "./Reservation";

// Componente Design
export function Design() {
    return (
        <div className="container-reservation">
            <div className="register">
                <form method="Post">
                    {/* Razón de solicitud del diseño arquitectónico */}
                    <div className="information2">
                        <h4>¿Cuál es la razón por la que solicita el diseño arquitectónico?</h4>
                        <input type="text" placeholder="No ingrese más de 300 caracteres" required></input>
                    </div>  
                    {/* Selección de fecha y hora */}
                    <div className="datetime-div">
                        <DateTimeButton />
                    </div>
                    {/* Botón de envío */}
                    <div className="btn-box">
                        <button className="btn-reservation" type="submit">Continuar</button>
                    </div>
                </form>
                {/* Botón de regreso */}
                <div className="return-box">
                    <Button route="/reservation" name="Volver" />
                </div>
            </div>
        </div>
    )
}
