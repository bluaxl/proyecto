import "../../../css/Advisory/newstate.css";
import { useNavigate, useParams } from "react-router-dom";
import React, { useRef, useEffect, useState } from "react";
import axios from "axios";

export function UpdateStates() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [inmuebles, setInmuebles] = useState({
    barrio: "",
    direccion: "",
    areaConstruida: "",
    areaTerreno: "",
    estadoConstruccion: "",
    numPisos: 0,
    numHabitaciones: 0,
    precio: 0,
    numBaños: 0,
    tipoInmueble: "casa",
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/verInmueble/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data.rows);
        setInmuebles(response.data.rows);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, [id]);

  const handleInputChange = (field, value) => {
    setInmuebles((prevInmuebles) => ({
      ...prevInmuebles,
      [field]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("barrio", inmuebles.barrio);
      formData.append("direccion", inmuebles.direccion);
      formData.append("areaConstruida", inmuebles.areaConstruida);
      formData.append("areaLote", inmuebles.areaTerreno);
      formData.append("estadoConstruccion", inmuebles.estadoConstruccion);
      formData.append("numPisos", inmuebles.numPisos);
      formData.append("numHabitaciones", inmuebles.numHabitaciones);
      formData.append("precio", inmuebles.precio);
      formData.append("numBanos", inmuebles.numBaños);
      formData.append("tipoInmueble", inmuebles.tipoInmueble);
      formData.append("images", imagesRef.current.files[0]);

      const response = await axios.patch(
        `http://localhost:3001/actualizarInmueble/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
    );

      console.log("Registro exitoso", response.data);
      alert("Registro exitoso");
      navigate(`/advisory/propierty-list`);
    } catch (error) {
      console.error("Error", error);
      alert("Error en la solicitud: " + error.message);
    }
  };

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

  return (
    <div>
      <div className="information-header">
        <h2 className="title-header">Actualizar Inmueble</h2>
      </div>

      <form
        className="form-state"
        onSubmit={handleRegister}
        method="POST"
      >
        <div className="publish-box">
          <label htmlFor="barrio" className="txt-black">Barrio: </label>
          <input className="txt-black"
          placeholder="mamawebo"
            type="text"
            id="barrio"
            value={inmuebles.barrio || ""}
            onChange={(e) =>
              handleInputChange("barrio", e.target.value)
            }
            ref={barrioRef}
          />

          <label htmlFor="direccion">Dirección: </label>
          <input
            type="text"
            id="direccion"
            value={inmuebles.direccion || ""}
            onChange={(e) =>
              handleInputChange("direccion", e.target.value)
            }
            ref={direccionRef}
          />

          <label htmlFor="areaConstruida">Área Construida: </label>
          <input
            type="text"
            id="areaConstruida"
            value={inmuebles.areaConstruida || ""}
            onChange={(e) =>
              handleInputChange("areaConstruida", e.target.value)
            }
            ref={areaConstruidaRef}
          />

          {/* Repite cambios similares para otros campos de entrada */}
        </div>

        <div className="buttons-box">
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            ref={imagesRef}
          />
          <button type="submit" className="button-submit">
            Actualizar
          </button>
        </div>
      </form>
    </div>
  );
}
