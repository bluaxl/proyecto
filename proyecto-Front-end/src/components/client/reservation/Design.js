// Importación de módulos y componentes
import axios from "axios";
import "../../../css/Client/reservation.css";
import React, { useRef, useState, useEffect } from 'react';
import { Button, DateTimeButton } from "./Reservation";  // DateTimeButton2 no está siendo utilizado
import { useNavigate } from 'react-router-dom';

// Componente Design
export function Design() {

    const navigate = useNavigate();

    const fecha = useRef(null);
    const descripcionRef = useRef(null)

    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token') 

        axios.get('http://localhost:3001/inicio', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        })
            .then((response) => {
                const data = response.data;

                if (data.decodeToken.rolUser === 1) {
                    setUserRole(data.decodeToken.rolUser);
                } else {
                    // Redirigir al usuario a una página de acceso denegado
                    navigate('/access-denied');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Session Expira')
                navigate('/login');
            });
    }, [navigate]);

    function handleRegister(e) {
        e.preventDefault();

        const descripcion = descripcionRef.current.value;

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
                                descripcion: descripcion,
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

                            axios.post("http://localhost:3001/Desing", datos2, {
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
    if (userRole === 1) {
        return (
            <div className="container-reservation">
                <div className="register">
                    <form method="Post" onSubmit={handleRegister}>
                        {/* Razón de solicitud del diseño arquitectónico */}
                        <div className="information2">
                            <h4>¿Cuál es la razón por la que solicita el diseño arquitectónico?</h4>
                            <input type="text" ref={descripcionRef} placeholder="No ingrese más de 300 caracteres" />
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
    return null;
}