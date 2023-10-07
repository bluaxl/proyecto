import "../../../css/Admin/cruds.css";

export function CrudState(){
    return(
        <>
        <div className="information-crud">
            <div className="title-box-crud">
                <h2>Inmuebles en Arquideco</h2>
            </div>
            <div className="filter-box-crud">
               <div className="filter-option">Filtro </div> 
               <div className="filter-option">Filtro </div> 
               <div className="filter-option">Filtro </div> 
               <div className="filter-option">Filtro </div>     
            </div>
        </div>
        <table className="crud-state-table">
        <tbody className="crud-state-tbody">
            <tr className="crud-state-tr">
                <td>Casa La Faena</td>
                <td>3 x 12</td>
                <td>Activo</td>
                <td>
                    <button className="action-button"><i class="fa-solid fa-eye fa-2xl" style={{color: "white", cursor : "pointer"}}></i></button>
                </td>
            </tr>
            <tr className="crud-state-tr">
                <td>Casa El Muelle</td>
                <td>6 x 12</td>
                <td>Archivado</td>
                <td>
                    <button className="action-button"><i class="fa-solid fa-eye fa-2xl" style={{color: "white", cursor : "pointer"}}></i></button>
                </td>
            </tr>
            <tr className="crud-state-tr">
                <td>Casa El Muelle</td>
                <td>6 x 12</td>
                <td>Archivado</td>
                <td>
                    <button className="action-button"><i class="fa-solid fa-eye fa-2xl" style={{color: "white", cursor : "pointer"}}></i></button>
                </td>
            </tr>
            <tr className="crud-state-tr">
                <td>Casa El Muelle</td>
                <td>6 x 12</td>
                <td>Archivado</td>
                <td>
                    <button className="action-button"><i class="fa-solid fa-eye fa-2xl" style={{color: "white", cursor : "pointer"}}></i></button>
                </td>
            </tr>
        </tbody>
    </table>
        </>
    )
}