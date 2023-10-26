import "../../../css/Admin/cruds.css";
import axios from "axios";

export function CrudUsers() {

    axios.get('http://localhost:3001/consult',{
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        const data = response.data
        console.log("informacion extraída", data)
    }).catch((error)=>{
        console.error("Error", error)
    })

    return(
        <>
            <div className="information-crud">
            <div className="title-box-crud">
                <h2>Usuarios</h2>
            </div>
        </div>
        <table className="crud-state-table">
       
        <tbody className="crud-state-tbody">
            <tr className="crud-state-tr">
                <td className="wd-20">Axl Rodriguez Quiceno</td>
                <td className="wd-20">Cédula de Ciudadanía</td>
                <td className="wd-20">1016951062</td>
                <td className="wd-20">Asesor</td>
                <td className="wd-10">
                    <button className="action-button"><i class="fa-solid fa-eye fa-2xl" style={{color: "white", cursor : "pointer"}}></i></button>
                </td>
            </tr>
            <tr className="crud-state-tr">
                <td>Axl Rodriguez Quiceno</td>
                <td>Cédula de Ciudadanía</td>
                <td>1016951062</td>
                <td>Asesor</td>
                <td>
                    <button className="action-button"><i class="fa-solid fa-eye fa-2xl" style={{color: "white", cursor : "pointer"}}></i></button>
                </td>
            </tr>
            <tr className="crud-state-tr">
                <td >Axl Rodriguez Quiceno</td>
                <td>Cédula de Ciudadanía</td>
                <td>1016951062</td>
                <td>Asesor</td>
                <td>
                    <button className="action-button"><i class="fa-solid fa-eye fa-2xl" style={{color: "white", cursor : "pointer"}}></i></button>
                </td>
            </tr>
        </tbody>
    </table>       
        </>
    )
}