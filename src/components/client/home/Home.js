// Importación de estilos CSS
import "../../../css/Client/home.css";
import { useNavigate} from 'react-router-dom';

// Importación del componente Footer
import { Footer } from "../footer/footer";
import axios from "axios";
import React, { useState, useEffect } from 'react';


// Componente Index
function Index() {

    return (
        // Contenedor principal de la página de inicio
        <div className="container-index" >
            {/* Título principal */}
            <div className="main-title-box">
                <p className="txt-white">Encuentra el <b>inmueble </b> perfecto con nosotros</p>
            </div>
          
            {/* Indicador de desplazamiento */}
            <div className="arrow-box">
                <span className="material-symbols-outlined">arrow_downward</span>
            </div>
        </div >
    );
}

function Estate() {
  const navigate = useNavigate();
  const [inmuebles, setInmuebles] = useState([]);
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/verInmuebles`);
        setInmuebles(response.data.rows);
        setImages(response.data.images);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const verInmueble = (idInmueble) => {
    console.log(idInmueble);
    navigate(`state/${idInmueble}`);
  };

  const opciones = { style: 'decimal', maximumFractionDigits: 2 };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInmuebles = inmuebles.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container-estates">
      <div className="text-estate">
        <div className="title-estate">
          <p>Inmuebles</p>
        </div>
        <div className="info-estate">
          <p>Desde casas hasta lotes, puedes seguir consultando nuestro catálogo</p>
        </div>

        <div className="houses-catalogue">
          {currentInmuebles.map((casa, index) => {
            const imageIndex = indexOfFirstItem + index; // Calcular el índice real de la imagen
            return (
              <div key={casa.idInmueble} className="house-catalogue">
                {images[imageIndex] && images[imageIndex].imagen && (
                  <img
                    className="img-home-catalogue"
                    src={`http://localhost:3001/${images[imageIndex].imagen}`}
                    alt={`Inmueble ${casa.idInmueble}`}
                  />
                )}
                <div className="house-description-catalogue">
                  <h3 className="house-h2-description txt-white">{casa.tipoInmueble} {casa.barrio}</h3>
                  <p className="area-description txt-white">area: {casa.areaLote} m²</p>
                  <h3 className="house-h2-description txt-white">
                    COP: ${Number(casa.precio).toLocaleString('es-ES', opciones)}
                  </h3>
                </div>
                <button className="show-state-catalogue txt-black" onClick={() => verInmueble(casa.idInmueble)}>
                  Ver
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(inmuebles.length / itemsPerPage) }, (_, index) => (
          <li key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </li>
        ))}
      </div>
    </div>
  );
}
  
// omponente AboutBox
function AboutBox({ title, info, svg }) {
    return (
        // Contenedor de una caja de información
        <div className="info-box">
            <div>
                {/* Título e información */}
                <h3>{title}</h3>
                <p>{info}</p>
            </div>
            <div className="line-info-box"></div>
            {/* Icono */}
            <div className="icon-box">
                <img src={svg} alt="Icono" className="img-about-box"></img>
            </div>
        </div>
    );
}

// Componente About
function About() {
    return (
        // Sección "Acerca de Nosotros"
        <section className="about">
            <div className="about-content">
                <div className="text-estate">
                    {/* Título e información sobre nosotros */}
                    <div className="title-estate">
                        <p>Nosotros</p>
                    </div>
                    <div className="info-estate">
                        <p>Nuestra historia y por qué elegir nuestros servicios</p>
                    </div>
                </div>
                {/* Cajas de información */}
                <div className="info-boxes">
                    <AboutBox title="Nuestra Historia" info="Somos una agencia inmobiliaria con más de 10 años de experiencia en el mercado. Nuestra pasión por el sector nos ha llevado a crecer y ofrecer un servicio de calidad a nuestros clientes." svg="./../img/icons/newspaper-regular.svg" />
                    <AboutBox title="Nuestro Equipo" info="Contamos con un equipo de agentes altamente capacitados y comprometidos en brindar el mejor servicio. Estamos aquí para ayudarte en la búsqueda de tu propiedad ideal." svg="./../img/icons/user-tie-solid.svg" />
                    <AboutBox title="Nuestra Misión" info="Nuestra misión es encontrar la propiedad perfecta para cada cliente. Trabajamos con dedicación y profesionalismo para lograr la satisfacción de quienes confían en nosotros." svg="./../img/icons/house-solid.svg" />
                    <AboutBox title="Nuestros Servicios" info="Nuestros servicios abarcan todos los ámbitos del mundo inmobiliario, desde avalúos hasta promesas de compraventa, recibirás los mejores resultados con nuestros asesores" svg="./../img/icons/square-check-regular.svg" />
                </div>
            </div>
        </section>
    );
}

// Componente Home
export function Home() {
    return (
        // Contenedor principal de la página de inicio
        <div>
            {/* Sección de inicio */}
            <div>
                <Index />
            </div>
            {/* Sección de inmuebles */}
            <div>
                <Estate />
            </div>
            {/* Sección "Acerca de Nosotros" */}
            <div>
                <About />
            </div>
            {/* Componente Footer */}
            <Footer />
        </div>
    );
}
