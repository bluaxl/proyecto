import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../../../css/Client/state-detail.css";
import axios from 'axios';


const Modal = ({ isOpen, onClose, children }) => {
    const modalStyle = {
        display: isOpen ? 'block' : 'none',
    };

    return (
        <div className="modal" style={modalStyle}>
            <div className="modal-overlay" onClick={onClose}></div>
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                {children}
            </div>
        </div>
    );
};

// Componente DateTimeButton
function DateTimeButton() {
    // Función para manejar el click en el botón de fecha
    const handlerOnclick = () => {
        let fecha = new Date();
        let anio = fecha.getFullYear();
        let dia = fecha.getDate();
        let _mes = fecha.getMonth();
        _mes = _mes + 1;
        if (_mes < 10) {
            var mes = "0" + _mes;
        } else {
            var mes = _mes.toString;
        }
        let fecha_minimo = anio + '-' + mes + '-' + dia;

    }

    return (
        <div className="datetime-box__catalogue">
            {/* Título de selección de fecha y hora */}
            <h4>Seleccione la fecha y hora</h4>
            {/* Input de selección de fecha */}
            <input type="date" id="fechaReserva" className="fechaReserva" onClick={handlerOnclick}></input>
            {/* Input de selección de hora */}
            <input type="time" className="horaReserva" id="horaReserva" min="07:00" max="17:00" step="1800"></input>
        </div>
    )
}


export function StateDetail() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [casa, setCasa] = useState(null);
    const [images, setImages] = useState([]);
    const [userRole, setUserRole] = useState(null);

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };


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

    function volverIndex() {
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
                                    <p className='txt-black'>Barrio: {casa.barrio}</p>
                                    <p className='txt-black'>Dirección: {casa.direccion}</p>
                                    <p className='txt-black'>Area del lote: {casa.areaTerreno}</p>
                                    <p className='txt-black'>Area Construida: {casa.areaConstruida}</p>
                                    <p className='txt-black'>Estado de construcción: {casa.estadoConstruccion}</p>

                                </div>
                                <div className='distribucion'>
                                    <h3 className='txt-black t'>Distribución</h3>
                                    <p className='txt-black'>Numero De Habitaciones: {casa.numHabitaciones}</p>
                                    <p className='txt-black'>Numero de pisos: {casa.numPisos}</p>
                                    <p className='txt-black'>Numero de Baños: {casa.numBaños}</p>
                                </div>
                            </div>
                            <div>
                                <button onClick={openModal} className='catalogue-data_button txt-white'>Reservar Una Visita</button>
                                <Modal isOpen={isModalOpen} onClose={closeModal}>
                                    <DateTimeButton />
                                </Modal>
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
