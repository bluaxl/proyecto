import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import "../../../css/Advisory/CalendarReservation.css";
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function CalendarReservation() {
    const [reservations, setReservations] = useState(null);
    const [date, setDate] = useState(new Date());
    const [error, setError] = useState(null);

    const obtenerReservas = async (fecha) => {
        try {
            const diaReserva = fecha.toISOString().slice(0, 10);
            const response = await fetch(`http://localhost:3001/reservations?fecha=${diaReserva}`);
            const data = await response.json();
            setReservations(data);
            setError(null);
        } catch (error) {
            setError('Error al obtener reservas');
            console.error('Error:', error);
        }
    };

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
                alert('Session Expira')
                navigate('/login');
            });
        obtenerReservas(date);
    }, [date]);

    if (userRole === 3) {
        return (
            <div className='box-calendar'>
                <div className="principal-calendar">
                    <h2 className="txt-black">Calendario</h2>
                    <div className="container-calendar">
                        <Calendar
                            onChange={(newDate) => {
                                setDate(newDate);
                                obtenerReservas(newDate);
                            }}
                            value={date}
                            className="reactCalendar"
                        />
                        <p>Fecha seleccionada: {date.toISOString().slice(0, 10)}</p>
                    </div>
                </div>
                <div className='view-reservation'>
                    <div className='title-individual-reservation'>
                        <h2 className='txt-black'>Para ese Día</h2>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    {reservations && reservations.length > 0 ? (
                        reservations.map((reservation) => (
                            <div key={reservation.idSolicitud} className='view-individual'>
                                <h3 className='txt-black'>{reservation.horaSolicitud}</h3>
                                <p className='txt-black'>{reservation.nombreCliente}</p>
                            </div>
                        ))
                    ) : (
                        <strong className='txt-black'> No hay reservas para este día.</strong>
                        
                    )}
                </div>
            </div>
        );
    }
    return null;
}
