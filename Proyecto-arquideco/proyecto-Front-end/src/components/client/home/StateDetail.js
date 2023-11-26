import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../../../css/Client/state-detail.css";
import axios from 'axios';


export function StateDetail() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [casa, setCasa] = useState(null);
    const [images, setImages] = useState([]);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {

        const token = localStorage.getItem('token') 

        axios.get('http://localhost:3001/inicio', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        })
            .then((response) => {
                const data = response.data;

                if (data.decodeToken.rolUser) {
                    setUserRole(data.decodeToken.rolUser);
                } else {
                    // Redirigir al usuario a una página de acceso denegado
                    navigate('/access-denied');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Session Expira')
                navigate('/login');
            });

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

    if (userRole) {
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
                                    <h3 className='txt-black t'>Características</h3>
                                    <p className='txt-black'><strong className='txt-black'>Barrio:</strong> {casa.barrio}</p>
                                    <p className='txt-black'><strong className='txt-black'>Dirección:</strong> {casa.direccion}</p>
                                    <p className='txt-black'><strong className='txt-black'>Area del lote:</strong> {casa.areaTerreno}</p>
                                    <p className='txt-black'><strong className='txt-black'>Area Construida:</strong> {casa.areaConstruida}</p>
                                    <p className='txt-black'><strong className='txt-black'>Estado de construcción:</strong> {casa.estadoConstruccion}</p>

                                </div>
                                <div className='distribucion'>
                                    <h3 className='txt-black t'>Distribución</h3>
                                    <p className='txt-black'><strong className='txt-black'> Numero De Habitaciones:</strong> {casa.numHabitaciones}</p>
                                    <p className='txt-black'><strong className='txt-black'>Numero de pisos: </strong>{casa.numPisos}</p>
                                    <p className='txt-black'><strong className='txt-black'>Numero de Baños:</strong> {casa.numBaños}</p>
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
    return null;
}
