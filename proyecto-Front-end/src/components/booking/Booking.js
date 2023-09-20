import { Link } from "react-router-dom";
import "../../css/booking.css";

function Box({ title, route }) {
    return (
    <div className="box-btn">
        <Link to={route} class="btn"><strong>{title}</strong></Link>
    </div>
    )
}


export function Booking() {
    return (
        <div>
            <div className="title-booking">
                <h2>¿Qué tipo de servicio desea?</h2>
            </div>
            <div className="container">
                <Box title="Avalúo" route="/appraise" />
                <Box title="Asesoría" route="/advisory" />
            </div>
            <div className="container">
                <Box title="Diseño Arquitectónico" route="/design" />
                <Box title="Documentos" route="/documents" />
            </div>
            <div className="container">
                <Box title="Búsqueda de inmuebles" route="/search" />
            </div>
        </div>
    )

}