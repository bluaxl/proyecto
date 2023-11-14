// Importación de módulos y componentes
import "../../../css/Client/reservation.css";
import { Button, DateTimeButton } from "./Reservation";

// Componente Documents
export function Documents() {
    return (
        <div className="container-reservation">
            <div className="registro">
                <form method="POST">
                    {/* Selección de tipo de documento */}
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
                        {/* Selección de fecha y hora */}
                        <div>
                            <DateTimeButton css="datetime-box" />
                        </div>
                    </div>
                    {/* Información sobre los documentos */}
                    <div className="files-box">
                        <p>Por favor, descargar estos documentos y llenarlos antes de llegar a la cita, facilitará el proceso</p>
                        {/* Enlaces de descarga */}
                        <div>
                            <a href="./files/Photography.pdf" download="Promesa de compraventa">Haz clic aquí para descargar el archivo</a>
                        </div>
                        <div>
                            <a href="./files/descargable2.png" download="Firma">Haz clic aquí para descargar el archivo</a>
                        </div>
                        {/* Botón de envío */}
                        <div className="btn-box">
                            <button className="btn-reservation" type="submit">Continuar</button>
                        </div>
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
    