import "../../../css/Advisory/cruds.css";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



export function CrudStates() {

    const [states, setStates] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        fetch("http://localhost:3001/verInmuebles", {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => setStates(data))
            .catch(error => console.error('Error:', error));
    }, []);

    function verInmueble({ idInmueble }) {
        console.log(idInmueble);

        fetch(`http://localhost:3001/verInmueble/${idInmueble}`)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                navigate(`/advisory/state-advisory/${idInmueble}`);
            })
            .catch(error => console.error("Error", error));
    }
    

    return (
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
                    {states.map(state => (
                        <tr className="crud-state-tr">
                            <td>{state.tipoInmueble} {state.barrio}</td>
                            <td>{state.areaLote} m²</td>
                            <td>{state.estadoConstruccion}</td>
                            <td>
                                <button className="action-button" onClick={() => verInmueble({idInmueble: state.idInmueble})}><i class="fa-solid fa-eye fa-2xl" style={{ color: "white", cursor: "pointer" }}></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}