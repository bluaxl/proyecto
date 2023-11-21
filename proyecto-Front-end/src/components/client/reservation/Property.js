// Importación de módulos y componentes
import axios from "axios";
import React, { useRef, useEffect, useState } from 'react';
import "../../../css/Client/reservation.css";
import { Button, DateTimeButton } from "./Reservation";
import { useNavigate } from 'react-router-dom';

// Componente Property
export function Property(){

    const navigate = useNavigate();

    const fecha = useRef(null);
    const descripcionRef = useRef(null)
    const token = localStorage.getItem('token')

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

                            axios.post("http://localhost:3001/property", datos2, {
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
        return(
            <div className="container-reservation">
                <div className="register">
                    <form method="Post" onSubmit={handleRegister}>
                        {/* Características del inmueble */}
                        <div className="information2">
                            <h4>¿Qué características debe de tener el inmueble?</h4>
                            <h5>Agregue una pequeña descripción extra que busca (ejem. número de baños)</h5>
                            <input type="text" ref={descripcionRef} placeholder="No ingrese más de 300 caracteres" required></input>
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
