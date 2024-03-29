import "../../../css/Admin/newstate.css"
import React, { useRef, useEffect, useState } from 'react';
import { InputForm } from "../state/NewState"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function NewProyect() {
    
    const barrioRef = useRef(null);
    const direccionRef = useRef(null);
    const areaConstruidaRef = useRef(null);
    const areaLoteRef = useRef(null);
    const tipoInmuebleRef = useRef(null);
    const estaConstruccionRef = useRef(null);
    const numPisosRef = useRef(null);
    const numBanosRef = useRef(null);
    const numHabitacionesRef = useRef(null);
    const descripcionRef = useRef(null);
    const imageRef = useRef(null);
    const precioRef = useRef(null)


    const navigate = useNavigate();

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
    }, [navigate]);



    const handleRegister = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('barrio', barrioRef.current.value);
        formData.append('direccion', direccionRef.current.value);
        formData.append('areaConstruida', areaConstruidaRef.current.value);
        formData.append('areaLote', areaLoteRef.current.value);
        formData.append('estadoConstruccion', estaConstruccionRef.current.value);
        formData.append('numPisos', numPisosRef.current.value);
        formData.append('numBanos', numBanosRef.current.value);
        formData.append('numHabitaciones', numHabitacionesRef.current.value);
        formData.append('descripcion', descripcionRef.current.value);
        formData.append('precio', precioRef.current.value);
        formData.append('tipoInmueble', tipoInmuebleRef.current.value);
        formData.append('imagen', imageRef.current.files[0]);
        

        axios.post('http://localhost:3001/createProyect', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((data) => {
          console.log("Registro exitoso", data);
          alert("Registro exitoso");
        })
        .catch((error) => {
          console.error("Error", error);
          alert("Error en la solicitud: " + error.message);
        });
    };
    
    
    if (userRole === 2) {
        return (
            <div>
                <div className="information-header">
                    <h2 className="title-header">Nuevo Proyecto</h2>
                </div>
                <form className="form-state" onSubmit={handleRegister} method="POST">
                    <div className="publish-box">
                        <InputForm type="text" options="Barrio: " placeholder="ingrese el nombre del barrio" refe={barrioRef}/>
                        <InputForm type="text" options="Dirección: "  placeholder="ingrese la dirección" refe={direccionRef}/>
                        <InputForm type="text" options="Área Construida: " placeholder="ingrese el área construida" refe={areaConstruidaRef}/>
                        <InputForm type="text" options="Área de lote: "  placeholder="ingrese el área del lote" refe={areaLoteRef}/>
                        <div className="subdiv-publish-box ">
                          <p className="name-option">Tipo de Inmueble:</p>
                          <select id="tipoInmueble" name="tipoInmueble" className="select-type-state" ref={tipoInmuebleRef}>
                              <option value="casa">Casa</option>
                              <option value="apartamento">Apartamento</option>
                              <option value="lote">Lote</option>
                              <option value="casaLote">Casa Lote</option>
                          </select>
                      </div>
                        <InputForm type="text" options="Estado Construcción: "  placeholder="ingrese el estado de construcción" refe={estaConstruccionRef}/>
                        <InputForm type="number" options="Número de pisos: "  placeholder="ingrese el número de pisos" refe={numPisosRef}/>
                        <InputForm type="number" options="Número de habitaciones " placeholder="ingrese el número de habitaciones"  refe={numHabitacionesRef}/>
                        <InputForm type="number" options="Número de Baños: "  placeholder="ingrese el número de baños" refe={numBanosRef}/>
                        <InputForm type="text" options="Descripción: "  placeholder="ingrese una descripción" refe={descripcionRef}/>
                        <InputForm type="number" options="Precio: "  placeholder="Precio: " refe={precioRef}/>
                    </div>
                    <div className="buttons-box">
                        <input type="file" name="imagen" ref={imageRef} accept="image/*" multiple></input>
                        <button type="submit" className="button-submit">Publicar</button>
                    </div>

                </form>
            </div>
        );
    }
    return null; // Devuelve null si no cumple con los permisos
}
