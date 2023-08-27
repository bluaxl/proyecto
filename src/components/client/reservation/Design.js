import "../../../css/Client/reservation.css"
import { Button, DateTimeButton, DateTimeButton2 } from "./Reservation"

export function Design() {
    return (
        <div className="container-reservation">
            <div className="register">
                <form method="Post">
                    <div className="information2">
                        <h4>¿Cúal es la razón por la que solicita el diseño arquitectónico?</h4>
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