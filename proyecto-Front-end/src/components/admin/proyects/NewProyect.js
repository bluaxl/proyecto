import React, { useRef, useEffect, useState } from 'react';
import { InputForm } from "../state/NewState"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../../css/Admin/newstate.css"


export function NewProyect() {

    const barrioRef=useRef(null)
    const direccionRef=useRef(null)   
    const areaConstruidaRef=useRef(null)   
    const areaLoteRef=useRef(null)   
    const dimensionesRef=useRef(null)   
    const estaConstruccionRef=useRef(null)   
    const numPisosRef=useRef(null)   
    const numBañosRef=useRef(null)   
    const numHabitacionesRef=useRef(null)   
    const estratoRef=useRef(null)   
    const garajeRef=useRef(null)   
    const descripcionRef=useRef(null)
    const imageRef=useRef(null)

  const navigate = useNavigate();

  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = document.cookie.replace('token=', ''); // Reemplaza por tu método de obtención de token

    axios.get('http://localhost:3001/inicio', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
    })
      .then((response) => {
        const data = response.data;

        if (data.decodeToken.rolUser === 'admin') {
          setUserRole(data.decodeToken.rolUser);
        } else {
          // Redirigir al usuario a una página de acceso denegado
          navigate('/access-denied');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        navigate('/login');
      });
  }, [navigate]);

  const handleRegister = (e) => {
    e.preventDefault();
    const barrio = barrioRef.current.value;
    const direccion = direccionRef.current.value;
    const areaConstruida = areaConstruidaRef.current.value;
    const areaLote = areaLoteRef.current.value;
    const dimensiones = dimensionesRef.current.value;
    const estaConstruccion = estaConstruccionRef.current.value;
    const numPisos = numPisosRef.current.value;
    const numBaños = numBañosRef.current.value;
    const numHabitaciones = numHabitacionesRef.current.value;
    const estrato = estratoRef.current.value;
    const garaje = garajeRef.current.value;
    const descripcion = descripcionRef.current.value;
    const image = imageRef.current.value;

    const requestDataProyecto={
        barrio: barrio,
        direccion:direccion,
        areaConstruida: areaConstruida,
        areaLote: areaLote,
        dimensiones: dimensiones,
        estaConstruccion: estaConstruccion,
        numPisos:numPisos,
        numBaños: numBaños,
        numHabitaciones: numHabitaciones,
        estrato: estrato,
        garaje:garaje,
        descripcion: descripcion,
        file:image
    }

    axios.post('http://localhost:3001/createProyect', requestDataProyecto, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => {
        console.log('Registro exitoso', data);
        alert('Registro Exitoso');
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  if (userRole === 'admin') {
    return(
        <div>
        <div className="information-header">
                <h2 className="title-header">Nuevo Proyecto</h2>
            </div>
            <form className="form-state" onSubmit={handleRegister} method="POST">
                <div class="publish-box">
                    <InputForm type="text" options="Barrio: " ref={barrioRef} placeholder="ingrese el nombre del barrio" />
                    <InputForm type="text" options="Dirección: "  ref={direccionRef} placeholder="ingrese la dirección" />
                    <InputForm type="number" options="Área Construida: " ref={areaConstruidaRef} placeholder="ingrese el área construida" />
                    <InputForm type="number" options="Área de lote: " ref={areaLoteRef} placeholder="ingrese el área del lote" />
                    <InputForm type="text" options="Dimensiones: " ref={dimensionesRef} placeholder="ingrese las dimensiones" />
                    <InputForm type="text" options="Estado Construcción: "ref={estaConstruccionRef} placeholder="ingrese el estado de construcción" />
                    <InputForm type="number" options="Número de pisos: " ref={numPisosRef} placeholder="ingrese el número de pisos" />
                    <InputForm type="number" options="Número de habitaciones " ref={numHabitacionesRef} placeholder="ingrese el número de habitaciones" />
                    <InputForm type="number" options="Número de Baños: " ref={numBañosRef} placeholder="ingrese el número de baños" />
                    <InputForm type="number" options="Estrato: " ref={estratoRef} placeholder="ingrese el estrato" />
                    <InputForm type="text" options="Garaje: " ref={garajeRef} placeholder="ingrese si tiene garaje o no" />
                    <InputForm type="text" options="Descripción: "ref={descripcionRef} placeholder="ingrese una descripción" />
                </div>
                <div className="buttons-box">
                    <input type="file" name="image" ref={imageRef} accept="image/*" multiple ></input>
                    <button type="submit" className="button-submit">Publicar</button>
                </div>

            </form>
        </div>
    );
  }

  return null; // Devuelve null si no cumple con los permisos
}
