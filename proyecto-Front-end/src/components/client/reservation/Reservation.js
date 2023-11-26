// Importación de módulos y componentes
import { Link } from "react-router-dom";
import "../../../css/Client/reservation.css";

// Componente Button
export function Button({ route, name }) {
    return (
        <Link to={route} className="btn-reservation">{name}</Link>
    )
}

// Componente DateTimeButton
export function DateTimeButton() {
    // Función para manejar el click en el botón de fecha
    const handlerOnclick = () => {
      let fecha = new Date();
      let anio = fecha.getFullYear();
      let dia = fecha.getDate();
      let _mes = fecha.getMonth();
      _mes = _mes + 1;
      if (_mes < 10) {
        var mes = "0" + _mes;
      } else {
        var mes = _mes.toString();
      }
      let fecha_minimo = anio + '-' + mes + '-' + dia;
      return fecha_minimo
      
    };
  
    return (
      <div className="datetime-box__catalogue">
        {/* Título de selección de fecha y hora */}
        <h4>Seleccione la fecha y hora</h4>
        {/* Input de selección de fecha */}
        <input type="date" id="fechaReserva" className="fechaReserva" min={handlerOnclick()}></input>
        {/* Input de selección de hora */}
        <input type="time" className="horaReserva" id="horaReserva" min="07:00" max="17:00" step="1800"></input>
      </div>
    );
  }
