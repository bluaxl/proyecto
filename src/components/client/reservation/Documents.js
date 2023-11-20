// Importación de módulos y componentes
import axios from "axios";
import React, { useRef } from 'react';
import "../../../css/Client/reservation.css";
import { Button, DateTimeButton } from "./Reservation";
import { useNavigate } from 'react-router-dom';

// Componente Documents
export function Documents() {

    const navigate = useNavigate();

    const fecha = useRef(null);
    const tipoDocumentoRef = useRef(null)

    function handleRegister(e) {
        e.preventDefault();

        const tipoDocumento = tipoDocumentoRef.current.value;

        const dateValue = fecha.current.querySelector(".fechaReserva").value;
        const hourValue = fecha.current.querySelector(".horaReserva").value;

        const datos = {
            fecha: dateValue,
            hora: hourValue
        }

        const token = localStorage.getItem('token')

        axios.get("http://localhost:3001/inicio", {
            headers: {
            "Content-Type": "application/json",
            "Authorization": token
            }
        }).then((response) => {
            const data = response.data
            const idCliente = data.decodeToken.idUser
            console.log(idCliente);
            
            axios.post("http://localhost:3001/disponibilidad", datos, {
            headers: {
                "Content-Type": "application/json"
            },
            }).then((data)=>{
                const idAsesor = data.data.idUsuario
                console.log(data.data);
                console.log(idAsesor);

                axios.post("http://localhost:3001/solicitud", datos, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
                .then((data1) => {
                    axios.post("http://localhost:3001/consultarSoli", datos, {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        }).then((info) => {
                            const data = info.data
                            const idSolicitud = data.ultimoIdSolicitud
                            console.log(idSolicitud);

                            const datos1 = {
                                idSolicitud: idSolicitud,
                                idCliente: idCliente,
                                idAsesor: idAsesor
                            }

                            const datos2 = {
                                tipoDocumento: tipoDocumento,
                                idSolicitud: idSolicitud
                            }

                            axios.post("http://localhost:3001/insertSoliUsuario", datos1, {
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                }).then((data) => {
                                    console.log("inserto correctamente en insertSoliUsuario", data);

                                }).catch((error)=>{ 
                                    console.log("Error:", error);
                                })

                            axios.post("http://localhost:3001/documents", datos2, {
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                }).then((data) => {
                                    console.log("inserto diseño", data);
                                    alert("Solicitud Exitosa")

                                }).catch((error)=>{ 
                                    console.log("Error:", error);
                                })

                        }).catch((error)=>{
                            console.log("Error:", error);
                        })
                    })
                .catch((error) => {
                    console.error("Error", error);
                });
            
            }).catch((error)=>{
                console.log('no se encontro asesor');
                alert('no hay asesores disponible ingrese otra fecha')
            })


            })                                                                                                                                                                                                        
        .catch((error) => {
            // Manejar errores, por ejemplo, mostrar un mensaje de error
            console.error("Error:", error);
            alert('su session a expirado')
            navigate('/login')
        });
    
    }

    return (
        <div className="container-reservation">
            <div className="registro">
                <form method="POST" onSubmit={handleRegister}>
                    {/* Selección de tipo de documento */}
                    <div className="information">
                        <div>
                            <h4>¿Qué tipo de documentos desea?</h4>
                            <select className="select" ref={tipoDocumentoRef}>
                                <option disabled selected>Seleccione una Opción</option>
                                <option value="promesa-compraventa">Promesa de compraventa</option>
                                <option value="contrato-arrendamiento">Contrato de arrendamiento</option>
                                <option value="tramites">Trámites</option>
                            </select>
                        </div>
                        {/* Selección de fecha y hora */}
                        <div ref={fecha}>
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
    