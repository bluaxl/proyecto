import "../../../css/Client/reservation.css"
import { Button, DateTimeButton } from "./Reservation"

export function Property(){
    return(
        <div className="container-reservation">
            <div className="register">
                <form method="Post">
                    <div className="information2">
                        <h4>¿Qué características debe de tener el inmueble?</h4>
                        <h5>Agregue una pequeña descripción extra que busca (ejem. número de baños)</h5>
                        <input type="text" placeholder="No ingrese más de 300 carácteres" required></input>
                    </div>  
                    <div className="datetime-div">
                        <DateTimeButton />
                    </div>
                    <div className="btn-box">
                        <button className="btn-reservation" type="submit">Continuar</button>
                    </div>
                </form>
                <div className="return-box">
                    <Button route="/reservation" name="Volver" />
                </div>
            </div>

        </div>
    )
}