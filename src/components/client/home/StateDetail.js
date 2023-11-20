import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../../../css/Client/state-detail.css";


export function StateDetail() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [casa, setCasa] = useState(null);
    const [images, setImages] = useState([]);


    useEffect(() => {
        fetch(`http://localhost:3001/verInmueble/${id}`)
            .then(response => response.json())
            .then(response => {
                setCasa(response.rows);
                setImages(response.imageResult);
                console.log(response.rows)
            })
            .catch(error => {
                console.error('Error:', error);
                setCasa(null);
            });
    }, [id]);


    const opciones = { style: 'decimal', maximumFractionDigits: 2 };

    function volverIndex(){
        navigate(`/`);
    }


    return (
        <div>
            {casa ? (
                <>
                    <div className='header-info-detail'>
                        <h2 className="txt-black">{casa.tipoInmueble} {casa.barrio}</h2>
                        <h2 className='txt-black'>${Number(casa.precio).toLocaleString('es-ES', opciones)}</h2>
                        <button className="txt-black b" onClick={() => volverIndex()}>Volver</button>
                    </div>
                    <div className='catalogue-img-data'>
                        {images && (
                            <div className='img-box-individual-state'>
                                <img className='img-individual' src={`http://localhost:3001/${images.imagen}`}></img>
                            </div>
                        )}
                        <div className="data-detail">
                            <div className='caracteristicas'>
                                <h3 className='txt-white t'>Características</h3>
                                <p className='txt-white'>Barrio: {casa.barrio}</p>
                                <p className='txt-white'>Dirección: {casa.direccion}</p>
                                <p className='txt-white'>Area del lote: {casa.areaTerreno}</p>
                                <p className='txt-white'>Area Construida: {casa.areaConstruida}</p>
                                <p className='txt-white'>Estado de construcción: {casa.estadoConstruccion}</p>

                            </div>
                            <div className='distribucion'>
                                <h3 className='txt-white t'>Distribución</h3>
                                <p className='txt-white'>Numero De Habitaciones: {casa.numHabitaciones}</p>
                                <p className='txt-white'>Numero de pisos: {casa.numPisos}</p>
                                <p className='txt-white'>Numero de Baños: {casa.numBaños}</p>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p>Cargando detalles del inmueble...</p>
            )}
        </div>
    );

}
