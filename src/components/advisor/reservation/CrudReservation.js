import "../../../css/Advisory/cruds.css";

export function CrudReservation() {

    return (
        <>
            <div className="information-crud">
                <div className="title-box-crud">
                    <h2>Solicitudes Pendientes</h2>
                </div>
            </div>
            <table className="crud-state-table">
                <tbody className="crud-state-tbody">
                    <tr className="crud-state-tr">
                        <td>Fecha: 12 de Octubre del 2023</td>
                        <td>Tipo: Diseño Arquitectónico</td>
                        <td>
                            <button className="action-button"><i class="fa-solid fa-eye fa-2xl" style={{ color: "white", cursor: "pointer" }}></i></button>
                        </td>
                    </tr>
                    <tr className="crud-state-tr">
                        <td>Fecha: 12 de Octubre del 2023</td>
                        <td>Tipo: Diseño Arquitectónico</td>
                        <td>
                            <button className="action-button"><i class="fa-solid fa-eye fa-2xl" style={{ color: "white", cursor: "pointer" }}></i></button>
                        </td>
                    </tr>
                    <tr className="crud-state-tr">
                        <td>Fecha: 12 de Octubre del 2023</td>
                        <td>Tipo: Diseño Arquitectónico</td>
                        <td>
                            <button className="action-button"><i class="fa-solid fa-eye fa-2xl" style={{ color: "white", cursor: "pointer" }}></i></button>
                        </td>
                    </tr>
                   
                </tbody>
            </table>
        </>
    )
}