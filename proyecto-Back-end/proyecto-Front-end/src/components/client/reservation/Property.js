// Importación de módulos y componentes
import "../../../css/Client/reservation.css";
import { Button, DateTimeButton } from "./Reservation";

// Componente Property
export function Property(){
    return(
        <div className="container-reservation">
            <div className="register">
                <form method="Post">
                    {/* Características del inmueble */}
                    <div className="information2">
                        <h4>¿Qué características debe de tener el inmueble?</h4>
                        <h5>Agregue una pequeña descripción extra que busca (ejem. número de baños)</h5>
                        <input type="text" placeholder="No ingrese más de 300 caracteres" required></input>
                    </div>  
                    {/* Selección de fecha y hora */}
                    <div className="datetime-div">
                        <DateTimeButton/>
                        console.log(DateTimeButton());
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
