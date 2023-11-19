import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "../../../css/Client/state-detail.css";


export function StateDetail() {
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


    return (
        <div>
            {casa ? (
                <>
                    <div className='header-info-detail'>
                        <h2 className="txt-black">{casa.tipoInmueble} {casa.barrio}</h2>
                        <h2 className='txt-black'>${Number(casa.precio).toLocaleString('es-ES', opciones)}</h2>
                    </div>

                    {images && (
                        <div className='img-box-individual-state'>
                            <img className='img-individual' src={`http://localhost:3001/${images.imagen}`}></img>
                        </div>
                    )}
                    <div className="data-detail">
                        <div className='caracteristicas'>
                            <h3 className='txt-black'>Caracteristicas</h3>
                            <p>Barrio: {casa.barrio}</p>
                            <p>Direccion: {casa.direccion}</p>
                            <p>Area del lote: {casa.areaTerreno}</p>
                            <p>Area Construida: {casa.areaConstruida}</p>
                            <p>Estado de construccion: {casa.estadoConstruccion}</p>

                        </div>
                        <div className='distribucion'>
                            <h3 className='txt-black'>Distribución</h3>
                            <p>Numero De Habitaciones: {casa.numHabitaciones}</p>
                            <p>Numeor de pisos: {casa.numPisos}</p>
                            <p>Numero de Baños: {casa.numBaños}</p>
                        </div>
                    </div>
                </>
            ) : (
                <p>Cargando detalles del inmueble...</p>
            )}
        </div>
    );

}
