import "../../../css/Admin/cruds.css";

export function CrudProyects(){
    return(
        <>
        <div className="information-crud">
            <div className="title-box-crud">
                <h2>Proyectos en Arquideco</h2>
            </div>
        </div>
        <table className="crud-state-table">
       
        <tbody className="crud-state-tbody">
            <tr className="crud-state-tr">
                <td><i class="fa-solid fa-house" style={{color: "white"}}></i>    Apartamento</td>
                <td><i class="fa-solid fa-location-dot" style={{color: "white"}}></i> Villa Teresita</td>
                <td>Finalizado</td>
                <td>
                    <button className="action-button"><i class="fa-solid fa-eye fa-2xl" style={{color: "white", cursor : "pointer"}}></i></button>
                </td>
            </tr>
            <tr className="crud-state-tr">
                <td><i class="fa-solid fa-house" style={{color: "white"}}></i>    Casa </td>
                <td><i class="fa-solid fa-location-dot" style={{color: "white"}}></i> Villa Claver</td>
                <td>En proceso</td>
                <td>
                    <button className="action-button"><i class="fa-solid fa-eye fa-2xl" style={{color: "white", cursor : "pointer"}}></i></button>
                </td>
            </tr>
            <tr className="crud-state-tr">
                <td><i class="fa-solid fa-house" style={{color: "white"}}></i> Lote</td>
                <td><i class="fa-solid fa-location-dot" style={{color: "white"}}></i> Villa Teresita</td>
                <td>En proceso</td>
                <td>
                    <button className="action-button"><i class="fa-solid fa-eye fa-2xl" style={{color: "white", cursor : "pointer"}}></i></button>
                </td>
            </tr>
        </tbody>
    </table>        
    </>
    )
}