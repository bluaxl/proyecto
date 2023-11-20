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
                <td><i class="fa-solid fa-house" style={{color: "white"}}></i>    Apartamento Villa Teresita</td>
                <td><i class="fa-solid fa-location-dot" style={{color: "white"}}></i> 20'000.000</td>
                <td>Estado Construccion</td>
                <td>
                    <button className="action-button"><i class="fa-solid fa-eye fa-2xl" style={{color: "white", cursor : "pointer"}}></i></button>
                </td>
            </tr>
        </tbody>
    </table>        
    </>
    )
}