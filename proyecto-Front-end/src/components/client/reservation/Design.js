// Importación de módulos y componentes
import axios from "axios";
import "../../../css/Client/reservation.css";
import React, { useRef } from 'react';
import { Button, DateTimeButton } from "./Reservation";  // DateTimeButton2 no está siendo utilizado

// Componente Design
export function Design() {
    const fecha = useRef(null);

    function handleRegister(e) {
        e.preventDefault();

        const dateValue = fecha.current.querySelector(".fechaReserva").value;
        const hourValue = fecha.current.querySelector(".horaReserva").value;

        const datos = {
            fecha: dateValue,
            hora: hourValue
        }
        
        axios.post("http://localhost:3001/disponibilidad", datos, {
            headers: {
                "Content-Type": "application/json"
            },
        }).then((data)=>{
            console.log('ascesor disponible', data);

                axios.post("http://localhost:3001/solicitud", datos, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
                .then((data1) => {
                    console.log("Registro exitoso", data1);
                    axios.post("http://localhost:3001/consultarSoli", datos, {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        }).then((info) => {
                            const data = info.data
                            console.log("id de solicitud", data);
                        }).catch((error)=>{
                            console.log("elol", error);
                        })
                    })
                .catch((error) => {
                    console.error("Error", error);
                });
            
        }).catch((error)=>{
            console.log('no se encontro asesor');
            alert('no hay asesores disponible ingrese otra fecha')
        })

    
    }

    return (
        <div className="container-reservation">
            <div className="register">
                <form method="Post" onSubmit={handleRegister}>
                    {/* Razón de solicitud del diseño arquitectónico */}
                    <div className="information2">
                        <h4>¿Cuál es la razón por la que solicita el diseño arquitectónico?</h4>
                        <input type="text" placeholder="No ingrese más de 300 caracteres" />
                    </div>
                    {/* Selección de fecha y hora */}
                    <div className="datetime-div" ref={fecha}>
                        <DateTimeButton />
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