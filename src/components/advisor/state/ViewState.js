import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'popper.js';

import "../../../css/Admin/view-state.css"

function ButtonState({ text, type }) {
    return (<button className="button-state" type={type}><p className="txt-white"> {text}</p></button>)
}

export function ViewStateAdvisory() {

    const { id } = useParams();
    const [state, setState] = useState(null);
    const [images, setImages] = useState([]);


    useEffect(() => {
        fetch(`http://localhost:3001/verInmueble/${id}`)
            .then(response => response.json())
            .then(response => {
                setState(response.rows);
                setImages(response.imageResult);
                console.log(response);
            })
            .catch(error => {
                console.error('Error:', error);
                setState(null);
            });
    }, [id]);

    return (
        <div >
            {state ? (
                <>
                    <div className="information-header">
                        <h2 className="title-header">{state.tipoInmueble} {state.barrio}</h2>
                    </div>
                    <div className='container-propierty-state'>
                        <div className="information-body-div">
                            <div className='img-box-div'>
                                {images && images.imagen && (
                                    <img className="img-view-state" src={`http://localhost:3001/${images.imagen}`} alt={`Inmueble ${state.idInmueble}`} />
                                )}
                            </div>
                            <div className="action-buttons">
                                <ButtonState text="Eliminar" />
                                <ButtonState text="Editar" />
                            </div>
                        </div>
                        <div className="action-div">
                            <div className="caracteristicas-div">
                                <h3 className="txt-black title-caracteristicas">Caracteristicas</h3>
                                <p className="txt-black mrg-5"><strong className="txt-black  mrg-r">Precio: </strong>{state.precio} </p>
                                <p className="txt-black mrg-5"><strong className="txt-black  mrg-r">Barrio: </strong> {state.barrio}</p>
                                <p className="txt-black mrg-5"><strong className="txt-black  mrg-r">Direccion: </strong> {state.direccion}</p>
                                <p className="txt-black mrg-5"><strong className="txt-black  mrg-r">Área del Terreno: </strong> {state.areaTerreno} m² </p>
                                <p className="txt-black mrg-5"><strong className="txt-black  mrg-r">Área construida: </strong> {state.areaConstruida} m²</p>
                                <p className="txt-black mrg-5"><strong className="txt-black  mrg-r">Estado de construcción: </strong>{state.estadoConstruccion}</p>
                            </div>

                            <div className="distribucion-div">
                                <h3 className="txt-black title-caracteristicas">Distribución</h3>
                                <p className="txt-black mrg-5"><strong className="txt-black mrg-r">Número de habitaciones: </strong> {state.numHabitaciones}</p>
                                <p className="txt-black mrg-5"><strong className="txt-black  mrg-r">Número de pisos: </strong> {state.numPisos}</p>
                                <p className="txt-black mrg-5"><strong className="txt-black  mrg-r">Número de baños: </strong> {state.numBaños}</p>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p>Cargando detalles del inmueble...</p>
            )}
        </div>

    )
}