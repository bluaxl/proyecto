// Importación de módulos y componentes
import "../../../css/Client/reservation.css"
import { Button, DateTimeButton } from "./Reservation"

// Componente Appraise
export function Appraise() {
    return (
        <div className="container-reservation">
            <div className="registro">
                <form method="POST" name="elForm">
                    {/* Información para el avalúo */}
                    <div className="information">
                        <div>
                            <h4>¿Para qué desea realizar el avalúo?</h4>
                            <select className="select">
                                <option disabled selected>Seleccione una Opción</option>
                                <option value="avaluo-catastral">Subir o bajar avalúo catastral</option>
                                <option value="venta">Para venta</option>
                                <option value="compra">Para compra</option>
                                <option value="garantia">Para garantía hipotecaria</option>
                                <option value="donación">Hacer donación</option>
                                <option value="judicial">Tema judicial</option>
                            </select>
                        </div>
                        <div>
                            {/* Componente DateTimeButton */}
                            <DateTimeButton css="datetime-box" />
                        </div>
                    </div>

                    {/* Caja para subir archivos */}
                    <div className="files-box">
                        <p>Por favor, para continuar subir los archivos correspondientes, son documentos del inmueble</p>
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

                {/* Botón de retorno */}
                <div className="return-box">
                    <Button route="/reservation" name="Volver" />
                </div>
            </div>
        </div>
    )
}
