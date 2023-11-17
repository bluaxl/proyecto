import axios from "axios";
import React, { useRef } from 'react';
import "../../../css/Client/reservation.css";
import { Button, DateTimeButton } from "./Reservation";

export function Appraise() {

  const castralFileRef = useRef(null);
  const libertadFileRef = useRef(null);
  const tipoAvaluoRef = useRef(null);
  const fecha = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(tipoAvaluoRef.current.value);


    const tipoAvaluo = tipoAvaluoRef.current.value;
    const castralFile = castralFileRef.current.files[0];
    const libertadFile = libertadFileRef.current.files[0];
    const dateValue = fecha.current.querySelector(".fechaReserva").value;
    const hourValue = fecha.current.querySelector(".horaReserva").value;


    
    const datos = {
        fecha: dateValue,
        hora: hourValue
    }
    

    const token = document.cookie.replace('token=','')

        axios.get("http://localhost:3001/inicio", {
            headers: {
            "Content-Type": "application/json",
            "Authorization": token
            }
        }).then((response) => {
            const data = response.data
            const idCliente = data.decodeToken.rolUser
            console.log(idCliente);
            
            axios.post("http://localhost:3001/disponibilidad", datos, {
            headers: {
                "Content-Type": "application/json"
            },
            }).then((data)=>{
                const idAsesor = data.data.idUsuario
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

                            const formData = new FormData();
                            formData.append('castral', castralFile);
                            formData.append('libertad', libertadFile);
                            formData.append('tipoAvaluo', tipoAvaluo);
                            formData.append('idSolicitud', idSolicitud);

                            const datos1 = {
                                idSolicitud: idSolicitud,
                                idCliente: idCliente,
                                idAsesor: idAsesor
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

                            axios.post("http://localhost:3001/appraise", formData, {
                                headers: {
                                    "Content-Type": "multipart/form-data"
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
        });
    

  };

  return (
    <div className="container-reservation">
      <div className="registro">
        <form onSubmit={handleSubmit} name="elForm">
          <div className="information">
            <div>
              <h4>¿Para qué desea realizar el avalúo?</h4>
              <select className="select" ref={tipoAvaluoRef}>
                <option disabled selected>Seleccione una Opción</option>
                <option value="avaluo-catastral">Subir o bajar avalúo catastral</option>
                <option value="venta">Para venta</option>
                <option value="compra">Para compra</option>
                <option value="garantia">Para garantía hipotecaria</option>
                <option value="donación">Hacer donación</option>
                <option value="judicial">Tema judicial</option>
              </select>
            </div>
            <div ref={fecha}>
              {/* Componente DateTimeButton */}
              <DateTimeButton css="datetime-box" />
            </div>
          </div>

          {/* Caja para subir archivos */}
          <div className="files-box">
            <p>Por favor, para continuar subir los archivos correspondientes, son documentos del inmueble</p>
            <div>
              <input type="file" ref={castralFileRef} />
            </div>
            <div>
              <input type="file" ref={libertadFileRef} />
            </div>
            <div className="btn-box">
              <button className="btn-reservation" type="submit">Continuar</button>
            </div>
          </div>
        </form>

        {/* Botón de retorno */}
        <div className="return-box">
          <Button route="/reservation" name="Volver" />
        </div>
      </div>
    </div>
  );
}
