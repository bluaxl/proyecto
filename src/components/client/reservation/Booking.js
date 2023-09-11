// Importación de módulos y componentes
import { Link } from "react-router-dom";
import "../../../css/Client/booking.css";

// Componente Box para los botones
function Box({ title, route, class2}) {
    return (
        <div className="box-btn" >
            <Link to={route} className={class2} ><strong>{title}</strong></Link>
        </div>
    )
}

// Componente Booking
export function Booking() {
    return (
        <div>
            <div className="title-booking">
                <h2>¿Qué tipo de servicio desea?</h2>
            </div>
            <div className="container">
                {/* Box para Avalúo */}
                <Box title="Avalúo" route="/appraise" class2="btn one"/>
                {/* Box para Asesoría */}
                <Box title="Asesoría" route="/legal-advice" class2="btn three"/>
            </div>
            <div className="container">
                {/* Box para Diseño Arquitectónico */}
                <Box title="Diseño Arquitectónico" route="/design" class2="btn two"/>
                {/* Box para Documentos */}
                <Box title="Documentos" route="/documents" class2="btn four"/>
            </div>
            <div className="container">
                {/* Box para Búsqueda de inmuebles */}
                <Box title="Búsqueda de inmuebles" route="/search" class2="btn five"/>
            </div>
        </div>
    )
}
