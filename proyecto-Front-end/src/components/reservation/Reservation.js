import { Link } from "react-router-dom"
import "../../css/reservation.css"

export function Button({ route, name }) {
    return (
        <Link to={route} className="btn-reservation">{name}</Link>
    )
}

export function DateTimeButton() {
    const handlerOnclick = (i) => {
        let fecha = new Date();
        let anio = fecha.getFullYear();
        let dia = fecha.getDate();
        let _mes = fecha.getMonth();
        _mes = _mes + 1;
        if (_mes < 10) {
            var mes = "0" + _mes;
        } else {
            var mes = _mes.toString;
        }
        let fecha_minimo = anio + '-' + mes + '-' + dia;
        document.getElementById("fechaReserva").setAttribute('min', fecha_minimo);
    }

    return (
        <div className="datetime-box">

            <h4>Seleccione la fecha y hora</h4>
            <input type="date" id="fechaReserva" className="fechaReserva" onClick={handlerOnclick}></input>
            <input type="time" className="horaReserva" id="horaReserva" min="07:00" max="17:00" step="3600"></input>
        </div >
    )
}


