import "../../../css/Advisory/solicitudes.css";

export function SolicitudReservation() {

    return (
        <>
            <div className="information-request">
                <h2 className="txt-black">Solicitud de Reserva</h2>
                <div className="information-request-data">
                    <p className="txt-black mrg-8">
                        <strong className="txt-black ">Fecha Solicitud: </strong>
                    </p>
                    <p className="txt-black mrg-8">
                        <strong className="txt-black ">Solicitud hecha por: </strong>
                    </p>

                    <p className="txt-black mrg-8">
                        <strong className="txt-black ">Tipo de reserva: </strong>
                    </p>
                    <p className="txt-black mrg-8">
                        <strong className="txt-black ">Fecha Reserva: </strong>
                    </p>
                </div>
                <p className="txt-black mrg-8">
                    <strong className="txt-black ">Razón de avalúo: </strong>
                </p>

                <div className="files-div">
                    <div className="file-1">
                        <p className="txt-black">Certificación Catastral</p>
                        <button className="request-button padd-but"><p className="txt-black">Ver</p></button>
                    </div>
                    <div className="file-2">
                        <p className="txt-black">Certificado de Libertad</p>
                        <button className="request-button padd-but"><p className="txt-black">Ver</p></button>
                    </div>
                </div>
                <div className="actions-box">
                    <button className="request-button"><p className="txt-white">Aceptar reserva</p></button>
                    <button className="request-button"><p className="txt-white">Rechazar reserva</p></button>
                </div>
            </div>
        </>
    )
}