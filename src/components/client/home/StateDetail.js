import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "../../../css/Client/state-detail.css";


export function StateDetail() {
    const { id } = useParams();
    const [casa, setCasa] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/verInmueble/${id}`)
            .then(response => response.json())
            .then(response => {
                setCasa(response);
                console.log(response);
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
                        <h2 className="txt-black">{casa[0].tipoInmueble} {casa[0].barrio}</h2>
                        <h2 className='txt-black'>${Number(casa[0].precio).toLocaleString('es-ES', opciones)}</h2>
                    </div>

                    <div className="data-detail">
                        <div className='caracteristicas'>
                            <h3 className='txt-black'>Caracteristicas</h3>
                        <p>Barrio: {casa[0].barrio}</p>
                        <p>Direccion: {casa[0].direccion}</p>
                        <p>Area del lote: {casa[0].areaLote}</p>
                        <p>Area Construida: {casa[0].areaConstruida}</p>
                        <p>Estado de construccion: {casa[0].estadoConstruccion}</p>
                    
                        </div>
                        <div className='distribucion'>
                            <h3 className='txt-black'>Distribución</h3>
                            <p>Numero De Habitaciones: {casa[0].numHabitaciones}</p>
                            <p>Numeor de pisos: {casa[0].numPisos}</p>
                            <p>Numero de Baños: {casa[0].numBaños}</p>
                        </div>
                    </div>
                </>
            ) : (
                <p>Cargando detalles del inmueble...</p>
            )}
        </div>
    );

}
