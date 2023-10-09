// Importación de módulos y componentes
import "../../../css/Client/reservation.css";
import { Button, DateTimeButton } from "./Reservation";

// Componente LegalAdvice
export function LegalAdvice() {
    return (
        <div className="container-reservation">
            <div className="register">
                <form method="Post">
                    {/* Razón para solicitar asesoría legal */}
                    <div className="information2">
                        <h4>¿Cuál es la razón por la que solicita una asesoría legal?</h4>
                        <input type="text" placeholder="No ingrese más de 300 caracteres" required></input>
                    </div>  
                    {/* Selección de fecha y hora */}
                    <div className="datetime-div">
                        <DateTimeButton />
                    </div>
                    {/* Botón de envío */}
                    <div className="btn-box">
                        <button class="btn-reservation" type="submit">Continuar</button>
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
