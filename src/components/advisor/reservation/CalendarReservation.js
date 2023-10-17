import React, { useState } from 'react';
import Calendar from 'react-calendar';
import styles from "../../../css/Advisory/CalendarReservation.css";
import 'react-calendar/dist/Calendar.css';


export function CalendarReservation() {
    function Calendario() {
        const [date, setDate] = useState(new Date());

        const onChange = newDate => {
            setDate(newDate);
        };

        return (
            <div className="principal-calendar">
                <h2 className="txt-black">Calendario</h2>
                <div className="container-calendar">
                    <Calendar
                        onChange={onChange}
                        value={date}
                        className={styles.reactCalendar}
                    />
                    <p>Fecha seleccionada: {date.toLocaleDateString()}</p>
                </div>
            </div>
      );
    }

    return (
        <div>
            <Calendario />
        </div>
    );
}