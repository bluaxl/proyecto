import "../../../css/Admin/newstate.css";
import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export function InputForm({ placeholder, options, type, refe }) {
  return (
    <>
      <div className="subdiv-publish-box">
        <p className="name-option">{options}</p>
        <input type={type} className="input-new-state" placeholder={placeholder} ref={refe}></input>
      </div>
    </>
  );
}

export function NewState() {

  const barrioRef = useRef(null);
  const direccionRef = useRef(null);
  const areaConstruidaRef = useRef(null);
  const areaLoteRef = useRef(null);
  const dimensionesRef = useRef(null);
  const estaConstruccionRef = useRef(null);
  const numPisosRef = useRef(null);
  const numHabitacionesRef = useRef(null);
  const numBanosRef = useRef(null);
  const estratoRef = useRef(null);
  const garajeRef = useRef(null);
  const imageRef = useRef(null);

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
              navigate('/login');
          });
  }, [navigate]);

  function handleRegister(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("barrio", barrioRef.current.value);
    formData.append("direccion", direccionRef.current.value);
    formData.append("areaConstruida", areaConstruidaRef.current.value);
    formData.append("areaLote", areaLoteRef.current.value);
    formData.append("dimensiones", dimensionesRef.current.value);
    formData.append("estadoConstruccion", estaConstruccionRef.current.value);
    formData.append("numPisos", numPisosRef.current.value);
    formData.append("numHabitaciones", numHabitacionesRef.current.value);
    formData.append("numBanos", numBanosRef.current.value);
    formData.append("estrato", estratoRef.current.value);
    formData.append("garaje", garajeRef.current.value);
    formData.append("imagen", imageRef.current.files[0]);

    axios
      .post("http://localhost:3001/registroInmueble", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Configura el tipo de contenido como multipart/form-data
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
  }
  if (userRole === 2) {
    return (
      <>
        <div className="information-header">
          <h2 className="title-header">Nuevo Inmueble</h2>
        </div>
        <form className="form-state" onSubmit={handleRegister} method="POST">
          <div className="publish-box">
            <InputForm type="text" options="Barrio: " placeholder="ingrese el nombre del barrio" refe={barrioRef} />
            <InputForm type="text" options="Dirección: " placeholder="ingrese la dirección" refe={direccionRef}/>
            <InputForm type="text" options="Área Construida: " placeholder="ingrese el área construida" refe={areaConstruidaRef}/>
            <InputForm type="text" options="Área de lote: " placeholder="ingrese el área de lote" refe={areaLoteRef}/>
            <InputForm type="text" options="Dimensiones: " placeholder="ingrese las dimensiones" refe={dimensionesRef}/>
            <InputForm type="text" options="Estado Construcción: " placeholder="ingrese el estado de construcción" refe={estaConstruccionRef}/>
            <InputForm type="number" options="Número de pisos: " placeholder="ingrese el número de pisos" refe={numPisosRef}/>
            <InputForm type="number" options="Número de habitaciones " placeholder="ingrese el número de habitaciones" refe={numHabitacionesRef}/>
            <InputForm type="number" options="Número de Baños: " placeholder="ingrese el número de baños" refe={numBanosRef}/>
            <InputForm type="number" options="Estrato: " placeholder="ingrese el estrato" refe={estratoRef}/>
            <InputForm type="text" options="Garaje: " placeholder="ingrese el garaje" refe={garajeRef}/>
          </div>
          <div className="buttons-box">
            <input type="file" name="imagen" ref={imageRef} accept="image/*" multiple />
            <button type="submit" className="button-submit">
              Publicar
            </button>
          </div>
        </form>
      </>
    );
  }
  return null; 
}
