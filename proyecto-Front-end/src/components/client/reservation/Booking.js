import { Link } from "react-router-dom";
import "../../../css/Client/booking.css";

function Box({ title, route, class2}) {
    return (
        <div className="box-btn" >
            <Link to={route} className={class2} ><strong>{title}</strong></Link>
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
                <Box title="Avalúo" route="/appraise" class2="btn one"/>
                <Box title="Asesoría" route="/legal-advice" class2="btn three"/>
            </div>
            <div className="container">
                <Box title="Diseño Arquitectónico" route="/design" class2="btn two"/>
                <Box title="Documentos" route="/documents" class2="btn four"/>
            </div>
            <div className="container">
                <Box title="Búsqueda de inmuebles" route="/search" class2="btn five"/>
            </div>
        </div>
    )

}