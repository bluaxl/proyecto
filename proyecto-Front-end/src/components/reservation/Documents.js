import "../../css/reservation.css"
import { Button, DateTimeButton } from "./Reservation"

export function Documents() {
    return (
        <div className="container-reservation">
            <div className="registro">
                <form method="POST">
                    <div className="information">
                        <div>
                            <h4>¿Qué tipo de documentos desea?</h4>
                            <select className="select">
                                <option disabled selected>Seleccione una Opción</option>
                                <option value="promesa-compraventa">Promesa de compraventa</option>
                                <option value="contrato-arrendamiento">Contrato de arrendamiento</option>
                                <option value="tramites">Trámites</option>
                            </select>
                        </div>
                        <div>
                            <DateTimeButton css="datetime-box" />
                        </div>
                    </div>
                    <div className="files-box">
                        <p>Por favor, descargar estos documentos y llenarlos antes de llegar a la cita, facilitará el proceso</p>
                        <div>
                            <a href="./files/descargable1.png" download="Promesa de compraventa">Haz clic aquí para descargar el archivo</a>
                        </div>
                        <div>
                            <a href="./files/descargable2.png" download="Firma">Haz clic aquí para descargar el archivo</a>
                        </div>
                        <div className="btn-box">
                            <button className="btn-reservation" type="submit">Continuar</button>
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