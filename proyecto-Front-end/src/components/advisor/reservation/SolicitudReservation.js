import "../../../css/Advisory/solicitudes.css";
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";


export function SolicitudReservationNormal() {

    const { id } = useParams();
    const [request, setRequest] = useState(null);
    const navigate = useNavigate();
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

                if (data.decodeToken.rolUser === 3) {
                    setUserRole(data.decodeToken.rolUser);
                } else {
                    // Redirigir al usuario a una página de acceso denegado
                    navigate('/access-denied');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                navigate('/login');
            });

        fetch(`http://localhost:3001/requestIndividual/${id}`)
            .then(response => response.json())
            .then(response => {
                setRequest(response);
                console.log(response);
            })
            .catch(error => {
                console.error('Error:', error);
                setRequest(null);
            });
    }, [id]);

    function sendEmailTrue() {
        const fechaSolicitud = new Date(request[0].FechaSolicitud);
        const fechaFormateada = fechaSolicitud.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        // En tu componente React
        fetch('http://localhost:3001/sendEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                destinatario: request[0].correoElectronico,
                asunto: 'Aprobación Solicitud de Reserva en Arquideco',
                mensaje: `¡Hola ${request[0].nombreCliente}! \n  \n Su solicitud para realizar una reserva de ${request[0].nombreTipoReserva} para el día ${fechaFormateada} a las ${request[0].HoraSolicitud} ha sido aprobada. Estamos emocionados de darle la bienvenida a Arquideco. \n \n ¡Esperamos que tenga una experiencia maravillosa!`,
            }),
        })

    }

    function sendEmailFalse() {
        const fechaSolicitud = new Date(request[0].FechaSolicitud);
        const fechaFormateada = fechaSolicitud.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        fetch('http://localhost:3001/sendEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                destinatario: request[0].correoElectronico,
                asunto: 'Solicitud de Reserva en Arquideco - Rechazada',
                mensaje: ` ¡Hola ${request[0].nombreCliente}!
    
                Lamentamos informarle que su solicitud para realizar ${request[0].nombreTipoReserva} a las ${fechaFormateada} ha sido rechazada. Le recomendamos revisar los detalles y volver a realizar la solicitud si es necesario.
                
                Agradecemos su comprensión y esperamos poder recibirle en futuras ocasiones. Si tiene alguna pregunta, no dude en ponerse en contacto con nosotros.
                
                Gracias y hasta pronto.`,
            }),
        })
            .then(response => {
                if (response.ok) {
                    console.log('Correo enviado exitosamente');
                } else {
                    console.error('Error al enviar el correo');
                }
            })
            .catch(error => {
                console.error('Error al enviar el correo:', error);
            });
    }

    async function aceptRequest() {
        fetch(`http://localhost:3001/aceptRequest/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('Solicitud aceptada correctamente');
                    sendEmailTrue();
                    navigate('/advisory/requests-reserves');
                } else {
                    console.error('Error al aceptar la solicitud:', data.message);
                }
            })
            .catch(error => {
                console.error('Error al realizar la solicitud:', error);
            });
    }

    async function deleteRequest() {
        fetch(`http://localhost:3001/deleteRequest/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('Solicitud Rechazada correctamente');
                    sendEmailFalse();
                    navigate('/advisory/requests-reserves');
                } else {
                    console.error('Error al rechazar la solicitud:', data.message);
                }
            })
            .catch(error => {
                console.error('Error al realizar la solicitud:', error);
            });
    }

    if (userRole === 3) {
        return (
            <div>
                {request ? (
                    <div className="information-request">
                        <h2 className="txt-black">Solicitud de Reserva</h2>
                        <div className="information-request-data">
                            <p className="txt-black mrg-8">
                                <strong className="txt-black ">Solicitud hecha por:</strong>
                                {request[0].nombreCliente}
                            </p>

                            <p className="txt-black mrg-8">
                                <strong className="txt-black ">Tipo de reserva: </strong>
                                {request[0].nombreTipoReserva}
                            </p>
                            <p className="txt-black mrg-8">
                                <strong className="txt-black ">Fecha Reserva: </strong>
                                {new Date(request[0].FechaSolicitud).toISOString().slice(0, 10)}
                            </p>
                            <p className="txt-black mrg-8">
                                <strong className="txt-black ">Hora Reserva: </strong>
                                {request[0].HoraSolicitud}
                            </p>
                        </div>
                        <p className="txt-black mrg-8">
                            <strong className="txt-black ">Datos: </strong>
                            {request[0].datoSolicitud}
                        </p>

                        <div className="actions-box">
                            <button className="request-button" onClick={() => aceptRequest()}><p className="txt-white">Aceptar reserva</p></button>
                            <button className="request-button" onClick={() => deleteRequest()}><p className="txt-white">Rechazar reserva</p></button>
                        </div>
                    </div>
                ) : (
                    <p>Cargando detalles de la reserva...</p>
                )}
            </div>
        );
    }
    return null;
}

export function SolicitudReservationAvaluo() {

    const { id } = useParams();
    const [request, setRequest] = useState(null);
    const navigate = useNavigate();
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

                if (data.decodeToken.rolUser === 3) {
                    setUserRole(data.decodeToken.rolUser);
                } else {
                    // Redirigir al usuario a una página de acceso denegado
                    navigate('/access-denied');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                navigate('/login');
            });

        fetch(`http://localhost:3001/requestIndividual/${id}`)
            .then(response => response.json())
            .then(response => {
                setRequest(response);
                console.log(response);
            })
            .catch(error => {
                console.error('Error:', error);
                setRequest(null);
            });
    }, [id]);

    function sendEmailTrue() {
        const fechaSolicitud = new Date(request[0].FechaSolicitud);
        const fechaFormateada = fechaSolicitud.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        // En tu componente React
        fetch('http://localhost:3001/sendEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                destinatario: request[0].correoElectronico,
                asunto: 'Aprobación Solicitud de Reserva en Arquideco',
                mensaje: `¡Hola ${request[0].nombreCliente}! \n  \n Su solicitud para realizar una reserva de ${request[0].nombreTipoReserva} para el día ${fechaFormateada} a las ${request[0].HoraSolicitud} ha sido aprobada. Estamos emocionados de darle la bienvenida a Arquideco. \n \n ¡Esperamos que tenga una experiencia maravillosa!`,
            }),
        })

    }

    function sendEmailFalse() {
        const fechaSolicitud = new Date(request[0].FechaSolicitud);
        const fechaFormateada = fechaSolicitud.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        fetch('http://localhost:3001/sendEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                destinatario: request[0].correoElectronico,
                asunto: 'Solicitud de Reserva en Arquideco - Rechazada',
                mensaje: ` ¡Hola ${request[0].nombreCliente}!
    
                Lamentamos informarle que su solicitud para realizar ${request[0].nombreTipoReserva} a las ${fechaFormateada} ha sido rechazada. Le recomendamos revisar los detalles y volver a realizar la solicitud si es necesario.
                
                Agradecemos su comprensión y esperamos poder recibirle en futuras ocasiones. Si tiene alguna pregunta, no dude en ponerse en contacto con nosotros.
                
                Gracias y hasta pronto.`,
            }),
        })
            .then(response => {
                if (response.ok) {
                    console.log('Correo enviado exitosamente');
                } else {
                    console.error('Error al enviar el correo');
                }
            })
            .catch(error => {
                console.error('Error al enviar el correo:', error);
            });
    }

    async function aceptRequest() {
        fetch(`http://localhost:3001/aceptRequest/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('Solicitud aceptada correctamente');
                    sendEmailTrue();
                    navigate('/advisory/requests-reserves');
                } else {
                    console.error('Error al aceptar la solicitud:', data.message);
                }
            })
            .catch(error => {
                console.error('Error al realizar la solicitud:', error);
            });
    }

    async function deleteRequest() {
        fetch(`http://localhost:3001/deleteRequest/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('Solicitud Rechazada correctamente');
                    sendEmailFalse();
                    navigate('/advisory/requests-reserves');
                } else {
                    console.error('Error al rechazar la solicitud:', data.message);
                }
            })
            .catch(error => {
                console.error('Error al realizar la solicitud:', error);
            });
    }

    async function download() {
        // Supongamos que filePath contiene la ruta almacenada en la base de datos
        const filePathFromDatabase = request[2].datoSolicitud;

        // Reemplazar barras diagonales invertidas por barras diagonales normales
        const filePathForWeb = filePathFromDatabase.replace(/\\/g, '/');

        // Usar filePathForWeb en tu aplicación web
        console.log(filePathForWeb);

    }

    if (userRole === 3) {
        return (
            <div>
                {request ? (
                    <div className="information-request">
                        <h2 className="txt-black">Solicitud de Reserva</h2>
                        <div className="information-request-data">
                            <p className="txt-black mrg-8">
                                <strong className="txt-black ">Solicitud hecha por:</strong>
                                {request[0].nombreCliente}
                            </p>

                            <p className="txt-black mrg-8">
                                <strong className="txt-black ">Tipo de reserva: </strong>
                                {request[0].nombreTipoReserva}
                            </p>
                            <p className="txt-black mrg-8">
                                <strong className="txt-black ">Fecha Reserva: </strong>
                                {new Date(request[0].FechaSolicitud).toISOString().slice(0, 10)}
                            </p>
                            <p className="txt-black mrg-8">
                                <strong className="txt-black ">Hora Reserva: </strong>
                                {request[0].HoraSolicitud}
                            </p>
                        </div>
                        <p className="txt-black mrg-8">
                            <strong className="txt-black ">Datos: </strong>
                            {request[0].datoSolicitud}
                        </p>
                        <div className="files-div">
                            <div className="file-1">
                                <p className="txt-black">Certificación Catastral</p>
                                <a
                                  href={`http://localhost:3001/${request[1].datoSolicitud.substring('src/'.length)}df`}
                                  download={`Certificion_Catastral.pdf`}
                                    className="request-link padd-but txt-black"
                                >Ver
                                </a>
                            </div>
                            <div className="file-2">
                                <p className="txt-black">Certificado de Libertad</p>
                                <a
                                  href={`http://localhost:3001/${request[2].datoSolicitud.substring('src/'.length)}`}
                                  download={`Certificado_libertad.pdf`}
                                    className="request-link padd-but txt-black"
                                >Ver
                                </a>
                            </div>
                        </div>

                        <div className="actions-box">
                            <button className="request-button" onClick={() => aceptRequest()}><p className="txt-white">Aceptar reserva</p></button>
                            <button className="request-button" onClick={() => deleteRequest()}><p className="txt-white">Rechazar reserva</p></button>
                        </div>
                    </div>
                ) : (
                    <p>Cargando detalles de la reserva...</p>
                )}
            </div>
        );
    }
    return null;
}