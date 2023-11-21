import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'popper.js';
import "../../../css/Admin/view-state.css"
import axios from 'axios';

export function ViewState() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [state, setState] = useState(null);
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

                if (data.decodeToken.rolUser === 2) {
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
                setState(response.rows);
                setImages(response.imageResult);
                console.log(response);
            })
            .catch(error => {
                console.error('Error:', error);
                setState(null);
            });
    }, [id]);

    function editarInmueble() {
        navigate(`/admin/UpdateState/${id}`)
    }

    if (userRole === 2) {
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
                                    <button className="button-state" type="submit" onClick={() => navigate("/admin/propierty-list")}><p className="txt-white"> Volver</p></button>
                                    <button className="button-state" type="submit" onClick={() => editarInmueble()}><p className="txt-white"> Editar</p></button>
                                    <button className="button-state" type="submit" ><p className="txt-white"> Eliminar</p></button>
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
    return null;
}