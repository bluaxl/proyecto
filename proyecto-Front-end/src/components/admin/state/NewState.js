import "../../../css/Admin/newstate.css"
import React, { useRef } from "react";
import axios from "axios";

export function InputForm({ placeholder, options, type }) {
    return (
        <>
            <div class="subdiv-publish-box ">
                <p className="name-option">{options}</p>
                <input type={type} className="input-new-state" placeholder={placeholder}></input>
            </div>
        </>
    )
}

export function NewState() {

    const barrioRef = useRef(null);
    const direccionRef =useRef(null);
    const areaConstruidaRef =useRef(null);
    const areaLoteRef =useRef(null);
    const dimensionesRef =useRef(null);
    const estaConstruccionRef =useRef(null);
    const numPisosRef =useRef(null);
    const numHabitacionesRef =useRef(null);
    const numBañosRef =useRef(null);
    const estratoRef =useRef(null);
    const garajeRef =useRef(null);
    const imageRef =useRef(null);

    function handleRegister(e) {
        e.preventDefault();
        
        const barrio=barrioRef.current.value;
        const direccion=direccionRef.current.value;
        const areaConstruida=areaConstruidaRef.current.value;
        const areaLote=areaLoteRef.current.value;
        const dimensiones=dimensionesRef.current.value;
        const estadoConstruccion=estaConstruccionRef.current.value;
        const numPisos=numPisosRef.current.value;
        const numHabitaciones=numHabitacionesRef.current.value;
        const numBaños=numBañosRef.current.value;
        const estrato=estratoRef.current.value;
        const garaje=garajeRef.current.value;
        const image=imageRef.current.value;

    const requestData={
            barrio: barrio,
            direccion: direccion,
            areaConstruida: areaConstruida,
            areaLote: areaLote,
            dimensiones:dimensiones,
            estadoConstruccion: estadoConstruccion,
            numPisos:numPisos,
            numHabitaciones: numHabitaciones,
            numBaños: numBaños,
            estrato: estrato,
            garaje: garaje,
            file: image
        }
    
        axios.post("http://localhost:3001/registroInmueble", requestData,{
            headers: {
              "Content-Type": "application/json",
            },
          }).then((data) =>{
            console.log("Registro exitoso", data)
            alert("Registro exitoso")
          }).catch((Error)=>{
            console.log("Error",Error)
          });
        }
    
    return (
        <>
            <div className="information-header">
                <h2 className="title-header">Nuevo Inmueble</h2>
            </div>
            <form className="form-state"  onSubmit={handleRegister} method="POST">
                <div class="publish-box">
                    <InputForm type="text" options="Barrio: " ref={barrioRef} placeholder="ingrese el nombre del barrio" />
                    <InputForm type="text" options="Dirección: " ref={direccionRef} placeholder="ingrese la dirección" />
                    <InputForm type="number" options="Área Construida: " ref={areaConstruidaRef} placeholder="ingrese el área construida" />
                    <InputForm type="number" options="Área de lote: " ref={areaLoteRef} placeholder="ingrese el área de lote" />
                    <InputForm type="text" options="Dimensiones: " ref={dimensionesRef} placeholder="ingrese las dimensiones" />
                    <InputForm type="text" options="Estado Construcción: " ref={estaConstruccionRef} placeholder="ingrese el estado de construcción" />
                    <InputForm type="number" options="Número de pisos: " ref={numPisosRef} placeholder="ingrese el número de pisos" />
                    <InputForm type="number" options="Número de habitaciones " ref={numHabitacionesRef} placeholder="ingrese el número de habitaciones" />
                    <InputForm type="number" options="Número de Baños: " ref={numBañosRef} placeholder="ingrese el número de baños" />
                    <InputForm type="number" options="Estrato: " ref={estratoRef} placeholder="ingrese el estrato" />
                    <InputForm type="text" options="Garaje: " ref={garajeRef} placeholder="ingrese el garaje" />
                </div>
                <div className="buttons-box">
                    <input type="file" name="image" ref={imageRef} accept="image/*" multiple ></input>
                    <button type="submit" className="button-submit">Publicar</button>
                </div>

            </form>
        </>
    )
}