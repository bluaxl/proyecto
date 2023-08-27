import "../../../css/Client/home.css"
import { Footer } from "../footer/footer"

function Index() {
    return (
        <div className="container-index">
            <div className="main-title-box">
                <p>Encuentra el <b>inmueble </b> perfecto con nosotros</p>
            </div>
            <div className="filter-box">
                <div className="filter-index">
                    <select className="select">
                        <option disabled selected>Ubicación</option>
                        <option value="Engativa">Engativá</option>
                        <option value="Fontibon">Fontibón</option>
                        <option value="Usme">Usme</option>
                    </select>
                    <select className="select">
                        <option disabled selected>Precio</option>
                        <option value="50">menos de 50 millones</option>
                        <option value="50-100">50 - 100 millones</option>
                        <option value="100-200">100 - 200 millones</option>
                        <option value="200-200">200 - 300 millones</option>
                        <option value="300">más de 300 millones</option>
                    </select>
                    <select className="select">
                        <option disabled selected>Tipo de Inmueble</option>
                        <option value="50">Casa</option>
                        <option value="50-100">Casa lote</option>
                        <option value="100-200">Lote</option>
                        <option value="200-200">Apartamento</option>
                    </select>
                    <select className="select">
                        <option disabled selected>Estado</option>
                        <option value="50">Terminada</option>
                        <option value="50-100">Semi-terminada</option>
                        <option value="100-200">Obra negra</option>
                        <option value="200-200">Obra gris</option>
                    </select>
                    <div className="search">
                        <button className="search-btn"><span class="material-symbols-outlined">search
                        </span>Buscar</button>
                    </div>
                </div>
            </div>
            <div className="arrow-box">
                <span className="material-symbols-outlined">arrow_downward</span>
            </div>
        </div >
    )
}

function Estate() {
    return (
        <div className="container-estates">
            <div className="text-estate">
                <div className="title-estate">
                    <p>Inmuebles</p>
                </div>
                <div className="info-estate">
                    <p>Desde casas hasta lotes, con el filtro de búsqueda encuentra lo que necesitas</p>
                </div>
            </div>
        </div>
    )
}

function AboutBox({ title, info, svg }) {
    return (
        <div class="info-box">
            <div>
                <h3>{title}</h3>
                <p>{info}</p>
            </div>
            <div className="line-info-box"></div>
            <div className="icon-box">
                <img src={svg}></img>
            </div>
        </div>
    )
}

function About() {
    return (
        <section class="about">
            <div class="about-content">
                <div className="text-estate">
                    <div className="title-estate">
                        <p>Nosotros</p>
                    </div>
                    <div className="info-estate">
                        <p>Nuestra historia y por qué elegir nuestros servicios</p>
                    </div>
                </div>
                <div class="info-boxes">
                    <AboutBox title="Nuestra Historia" info="Somos una agencia inmobiliaria con más de 10 años de experiencia en el mercado. Nuestra pasión por el sector nos ha llevado a crecer y ofrecer un servicio de calidad a nuestros clientes." svg="./../img/newspaper-regular.svg" />
                    <AboutBox title="Nuestro Equipo" info="Contamos con un equipo de agentes altamente capacitados y comprometidos en brindar el mejor servicio. Estamos aquí para ayudarte en la búsqueda de tu propiedad ideal." svg="./../img/user-tie-solid.svg" />
                    <AboutBox title="Nuestra Misión" info="Nuestra misión es encontrar la propiedad perfecta para cada cliente. Trabajamos con dedicación y profesionalismo para lograr la satisfacción de quienes confían en nosotros." svg="./../img/house-solid.svg" />
                    <AboutBox title="Nuestros Servicios" info="Nuestros servicios abarcan todos los ámbitos del mundo inmobiliario, desde avalúos hasta promesas de compraventa, recibirás los mejores resultados con nuestros asesores" svg="./../img/square-check-regular.svg" />
                </div>
            </div>
        </section>
    )
}

export function Home() {
    return (
        <div>
            <div>
                <Index />
            </div>
            <div>
                <Estate />
            </div>
            <div>
                <About />
            </div>
            <Footer />
        </div>
    )
}