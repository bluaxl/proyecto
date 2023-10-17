import "../../../css/Advisory/cruds.css";

export function NotificationReservation() {

    return (
        <>
            <div className="information-crud">
                <div className="title-box-crud">
                    <h2>Crear Recordatorio</h2>
                </div>
            </div>
            <table className="crud-state-table">
                <tbody className="crud-state-tbody">
                    <tr className="crud-state-tr">
                        <td className="wd-20">12/10/23</td>
                        <td className="wd-30">Angela Valentina Saavedra</td>
                        <td className="wd-20">Diseño arquitectónico</td>
                        <td>
                            <button className="action-button"><i class="fa-solid fa-paper-plane" style={{ color: "white", cursor: "pointer" }}></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}