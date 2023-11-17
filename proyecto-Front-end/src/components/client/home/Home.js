// Importación de estilos CSS
import "../../../css/Client/home.css";
// Importación del componente Footer
import { Footer } from "../footer/footer";
import React, {useEffect, useState } from 'react';
import axios from "axios";


// Componente Index
function Index() {
    const [inmuebles, setInmuebles] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3001/verInmuebles');
          setInmuebles(response.data);
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div>
        {inmuebles.map((inmueble) => (
          <div key={inmueble.id}>
            <h2>{inmueble.id}</h2>
            {/* Asegúrate de usar la propiedad correcta */}
            <img src={`http://localhost:3001/${inmueble.imagen}`} alt={`Inmueble ${inmueble.id}`} />
          </div>
        ))}
      </div>
    );
  }
  
// Componente Estate
function Estate() {
    return (
        // Contenedor de la sección de información sobre inmuebles
        <div className="container-estates">
            <div className="text-estate">
                {/* Título e información sobre inmuebles */}
                <div className="title-estate">
                    <p>Inmuebles</p>
                </div>
                <div className="info-estate">
                    <p>Desde casas hasta lotes, con el filtro de búsqueda encuentra lo que necesitas</p>
                </div>
            </div>
        </div>
    );
}

// Componente AboutBox
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
                <img src={svg} alt="Icono"></img>
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

