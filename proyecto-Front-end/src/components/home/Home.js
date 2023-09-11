import "../../css/home.css"

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

export function Home() {
    return (
        <div>
            <div>
                <Index />
            </div>
            <div>
                <Estate />
            </div>
        </div>
    )
}