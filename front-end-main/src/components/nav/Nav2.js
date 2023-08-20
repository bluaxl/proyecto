import "../../css/nav.css"

function Nav(){
    return(
        <nav className="principal-nav">
            <img src="./img/Logo1.png"></img>
            <div className="principal-nav-option2">
            <ul>
                <li>Inicio</li>
                <li>Nosotros</li>
                <li>Reservar</li>
                <li><span class="material-symbols-outlined">person</span> Ingresar</li>
            </ul>
            </div>

        </nav> 
    )
}

export default Nav;