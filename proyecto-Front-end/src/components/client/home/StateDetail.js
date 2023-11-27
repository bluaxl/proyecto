import React, { useEffect, useState, useRef } from 'react';
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
function DateTimeButton({ handleRegister, fechaRef }) {
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
            var mes = _mes.toString();
        }
        let fecha_minimo = anio + '-' + mes + '-' + dia;
        return fecha_minimo

    };

    return (
        <form onSubmit={handleRegister}>
            <div ref={fechaRef} className="datetime-box__catalogue">
                <h4>Seleccione la fecha y hora</h4>
                <input type="date" id="fechaReserva" className="fechaReserva" min={handlerOnclick()} required></input>
                <input type="time" className="horaReserva" id="horaReserva" min="07:00" max="17:00" step="1800" required></input>
                <button className='modal_button txt-white'>Reservar</button>
            </div>
        </form>
    );

}


export function StateDetail() {

    const navigate = useNavigate();
    const fecha = useRef(null);
    const { id } = useParams();
    const [casa, setCasa] = useState(null);
    const [images, setImages] = useState([]);
    const [userRole, setUserRole] = useState(null);
    const [idUsuario, setIdUsuario] = useState(null);
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
                    setIdUsuario(data.decodeToken.idUser);

                } 
            })

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

    function handleRegister(e) {
        e.preventDefault();


        const dateValue = fecha.current.querySelector(".fechaReserva").value;
        const hourValue = fecha.current.querySelector(".horaReserva").value;



        const datos = {
            fecha: dateValue,
            hora: hourValue
        }

        axios.post("http://localhost:3001/disponibilidad", datos, {
            headers: {
                "Content-Type": "application/json"
            },
        }).then((data) => {
            const idAsesor = data.data.idUsuario
            console.log(idAsesor);

            axios.post("http://localhost:3001/solicitud", datos, {
                headers: {
                    "Content-Type": "application/json"
                },
            })
                .then((data1) => {
                    axios.post("http://localhost:3001/consultarSoli", datos, {
                        headers: {
                            "Content-Type": "application/json"
                        },
                    }).then((info) => {
                        const data = info.data
                        const idSolicitud = data.ultimoIdSolicitud
                        console.log(idSolicitud);

                        const datos1 = {
                            idSolicitud: idSolicitud,
                            idCliente: idUsuario,
                            idAsesor: idAsesor
                        }

                        const datos2 = {
                            descripcion: `Solicita una visita al inmueble con el id = ${id} el cual es un ${casa.tipoInmueble}, tiene un precio de ${casa.precio}, tiene ${casa.numPisos} pisos y está ${casa.estadoConstruccion}`,
                            idSolicitud: idSolicitud
                        }

                        axios.post("http://localhost:3001/insertSoliUsuario", datos1, {
                            headers: {
                                "Content-Type": "application/json"
                            },
                        }).then((data) => {
                            console.log("inserto correctamente en insertSoliUsuario", data);

                        }).catch((error) => {
                            console.log("Error:", error);
                        })

                        axios.post("http://localhost:3001/property", datos2, {
                            headers: {
                                "Content-Type": "application/json"
                            },
                        }).then((data) => {
                            console.log("inserto diseño", data);
                            alert("Solicitud Exitosa")

                        }).catch((error) => {
                            console.log("Error:", error);
                        })

                    }).catch((error) => {
                        console.log("Error:", error);
                    })
                })
                .catch((error) => {
                    console.error("Error", error);
                });

        }).catch((error) => {
            console.log('no se encontro asesor');
            alert('no hay asesores disponible ingrese otra fecha')
        })
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
                                <h3 className='txt-black t'>Características</h3>
                                <p className='txt-black'>Barrio: {casa.barrio}</p>
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
                        { userRole &&(
                            <div>
                                <button onClick={openModal} className='catalogue-data_button txt-white'>Reservar Una Visita</button>
                                <Modal isOpen={isModalOpen} onClose={closeModal}>
                                    <DateTimeButton handleRegister={handleRegister} fechaRef={fecha} />
                                </Modal>
                            </div>
                       ) }
                    </div>
                </>
            ) : (
                <p>Cargando detalles del inmueble...</p>
            )}
        </div>
    );
    return null;
}
