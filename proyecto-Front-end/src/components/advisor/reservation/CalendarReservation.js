import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "../../../css/Advisory/CalendarReservation.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function CalendarReservation() {
    const [reservations, setReservations] = useState(null);
    const [date, setDate] = useState(new Date());
    const [error, setError] = useState(null);
    const [idUser, setIdUser] = useState(null);


    const obtenerReservas = async (fecha) => {
        try {
            const diaReserva = fecha.toISOString().slice(0, 10);
            const response = await fetch(`http://localhost:3001/reservations?fecha=${diaReserva}&asesor=${idUser}`);
            const data = await response.json();
            console.log(data)
            setReservations(data);
            setError(null);
        } catch (error) {
            setError('Error al obtener reservas');
            console.error('Error:', error);
        }
    };

    const navigate = useNavigate();

    const [userRole, setUserRole] = useState(null);
    const token = localStorage.getItem('token')


    useEffect(() => {

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
                    setIdUser(data.decodeToken.idUser)

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
        obtenerReservas(date);
    }, [date]);

    if (userRole === 3) {
        return (
            <div className='box-calendar'>
                <div className="title-box-crud">
                    <h2>calendario</h2>
                </div>
                <div className="principal-calendar">
                    <div className="container-calendar">
                        <Calendar
                            onChange={(newDate) => {
                                setDate(newDate);
                                obtenerReservas(newDate);
                            }}
                            value={date}
                            className="reactCalendar"
                        />
                        <p className='txt-white'>Fecha seleccionada: {date.toISOString().slice(0, 10)}</p>
                    </div>
                    <div className='view-reservation'>
                        <div className='title-individual-reservation'>
                            <h2 className='txt-black'>Para ese Día</h2>
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        {reservations && reservations.length > 0 ? (
                            reservations.map((reservation) => (
                                <div key={reservation.idSolicitud} className='view-individual'>
                                    <p className='txt-black'><strong className='txt-black'> Hora: </strong>{reservation.horaSolicitud}</p>
                                    <p className='txt-black'><strong className='txt-black'>Tipo de reserva: </strong>{reservation.nombreTipoReserva}</p>
                                    <p className='txt-black'><strong className='txt-black'>Dato de la reserva: </strong>{reservation.datoSolicitud}</p>
                                    <p className='txt-black'><strong className='txt-black'>Cliente: </strong>{reservation.nombreCliente} {reservation.apellidoCliente}</p>
                                </div>
                            ))
                        ) : (
                            <strong className='txt-black'> No hay reservas para este día.</strong>

                        )}
                    </div>
                </div>
            </div>
        );
    }
    return null;
}
