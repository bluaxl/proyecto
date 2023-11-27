import "../../../css/Admin/newstate.css"
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function InputForm({ placeholder, options, type, refe, value }) {
    return (
      <div className="subdiv-publish-box">
        <p className="name-option">{options}</p>
        <input type={type} className="input-new-state" value={value} placeholder={placeholder} ref={refe}></input>
      </div>
    );
  }

  export function NewState() {

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

    const barrioRef = useRef(null);
    const direccionRef = useRef(null);
    const areaConstruidaRef = useRef(null);
    const areaLoteRef = useRef(null);
    const estadoConstruccionRef = useRef(null);
    const numPisosRef = useRef(null);
    const numHabitacionesRef = useRef(null);
    const precioRef = useRef(null);
    const numBanosRef = useRef(null);
    const tipoInmuebleRef = useRef(null);
    const imagesRef = useRef(null);

    async function handleRegister(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("barrio", barrioRef.current.value);
        formData.append("direccion", direccionRef.current.value);
        formData.append("areaConstruida", areaConstruidaRef.current.value);
        formData.append("areaLote", areaLoteRef.current.value);
        formData.append("estadoConstruccion", estadoConstruccionRef.current.value);
        formData.append("numPisos", numPisosRef.current.value);
        formData.append("numHabitaciones", numHabitacionesRef.current.value);
        formData.append("precio", precioRef.current.value);
        formData.append("numBanos", numBanosRef.current.value);
        formData.append("tipoInmueble", tipoInmuebleRef.current.value);
        formData.append("images", imagesRef.current.files[0]);

        fetch("http://localhost:3001/registroInmueble", {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Registro exitoso", data);
                alert("Registro exitoso");
                navigate(`/admin/propierty-list`);
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
                    <h2 className="title-header">Nuevo Inmueble</h2>
                </div>
                <form className="form-state" onSubmit={handleRegister} method="POST">
                    <div className="publish-box">
                        <InputForm type="text" options="Barrio: " placeholder="Ingrese el nombre del barrio" refe={barrioRef} />
                        <InputForm type="text" options="Dirección: " placeholder="Ingrese la dirección" refe={direccionRef} />
                        <InputForm type="number" options="Área Construida: " placeholder="Ingrese el área construida" refe={areaConstruidaRef} />
                        <InputForm type="number" options="Área Terreno: " placeholder="Ingrese el área del terreno" refe={areaLoteRef} />
                        <div className="subdiv-publish-box ">
                            <p className="name-option">Estado Construccion:</p>
                            <select id="tipoInmueble" name="tipoInmueble" className="select-type-state" ref={estadoConstruccionRef}>
                                <option value="terminada">Terminada</option>
                                <option value="semi terminada">Semi Terminada</option>
                                <option value="obra negra">Obra Negra</option>
                                <option value="obra gris">Obra Gris</option>
                                <option value="sin construir">Sin Construir</option>
                            </select>
                        </div>
                        <InputForm type="number" options="Número de pisos: " placeholder="Ingrese el número de pisos" refe={numPisosRef} />
                        <InputForm type="number" options="Número de habitaciones " placeholder="Ingrese el número de habitaciones" refe={numHabitacionesRef} />
                        <InputForm type="number" options="Precio " placeholder="Ingrese el precio del inmueble" refe={precioRef} />
                        <InputForm type="number" options="Número de Baños: " placeholder="Ingrese el número de baños" refe={numBanosRef} />
                        <div className="subdiv-publish-box ">
                            <p className="name-option">Tipo de Inmueble:</p>
                            <select id="tipoInmueble" name="tipoInmueble" className="select-type-state" ref={tipoInmuebleRef}>
                                <option value="casa">Casa</option>
                                <option value="apartamento">Apartamento</option>
                                <option value="lote">Lote</option>
                                <option value="casaLote">Casa Lote</option>
                            </select>
                        </div>
                    </div>
                    <div className="buttons-box">
                        <input type="file" name="images" accept="image/*" multiple ref={imagesRef} />
                        <button type="submit" className="button-submit">
                            Publicar
                        </button>
                    </div>
                </form>
            </div>
        );
    }
    return null;
}