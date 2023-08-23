import "../../css/reservation.css"
import { Button, DateTimeButton } from "./Reservation"


export function Appraise() {
    return (
        <div className="container-reservation">
            <div className="registro">
                <form method="POST" name="elForm">
                    <div className="information">
                        <div>
                            <h4>¿Para que desea realizar el aváluo?</h4>
                            <select className="select">
                                <option disabled selected>Seleccione una Opción</option>
                                <option value="avaluo-catastral">Subir o bajar aváluo catastral</option>
                                <option value="venta">Para venta</option>
                                <option value="compra">Para compra</option>
                                <option value="garantia">Para garantía hipotecaria</option>
                                <option value="donación">Hacer donación</option>
                                <option value="judicial">Tema judicial</option>
                            </select>
                        </div>
                        <div>
                            <DateTimeButton css="datetime-box" />
                        </div>
                    </div>
                    <div className="files-box">
                        <p>Por favor, para continuar subir los archivos correspondientes, son documenntos del inmueble</p>
                        <div>
                            <input type="file"></input>
                        </div>
                        <div>
                            <input type="file"></input>
                        </div>
                        <div className="btn-box">
                            <button className="btn-reservation" type="submit" >Continuar</button>
                        </div>
                    </div>
                </form>
                <div className="return-box">
                    <Button route="/reservation" name="Volver" />
                </div>
            </div>
        </div>
    )
}