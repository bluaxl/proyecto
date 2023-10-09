// Importación de estilos CSS
import "../../../css/Client/footer.css";

// Componente Footer
export function Footer() {
    return (
        // Contenedor del footer
        <footer className="footer">
            {/* Sección de información de contacto y ubicación */}
            <div className="info-footer">
                {/* Columna de información de contacto */}
                <div className="footer-column">
                    <p className="title txt-light">Contáctanos</p>
                    {/* Dirección de correo */}
                    <p className="txt-light"><span className="material-symbols-outlined">
                        mail
                    </span> arquideco@gmail.com</p>
                    {/* Números de teléfono */}
                    <p className="txt-light"><span className="material-symbols-outlined">
                        phone_in_talk
                    </span> (123) 456-7890</p>
                    <p className="txt-light"><span className="material-symbols-outlined">
                        phone_in_talk
                    </span> (123) 456-7890</p>
                </div>
                {/* Columna de información de ubicación */}
                <div class="footer-column">
                    <p className="title txt-light">Ubicación</p>
                    {/* Direcciones */}
                    <p className="txt-light"><span className="material-symbols-outlined">
                        location_on
                    </span> Calle 100 #10 A 10 - Barrio X</p>
                    <p className="txt-light"><span className="material-symbols-outlined">
                        location_on
                    </span> Carrera 121 #10 L 10 - Barrio Y</p>
                </div>
                {/* Columna de redes sociales */}
                <div className="footer-column social">
                    <p className="title txt-light">Redes Sociales</p>
                    <div className="social-icons">
                        {/* Enlaces a redes sociales */}
                        <p className="txt-light"><i className="fa-brands fa-facebook" style={{ color: "white" }}></i> Facebook</p>
                        <p className="txt-light"><i className="fa-brands fa-instagram" style={{ color: "white" }}></i> Instagram</p>
                    </div>
                </div>
            </div>
            {/* Decoración del footer */}
            <div className="decoration-footer">
                <div className="line-footer-box">
                    <div className="line-footer"></div>
                </div>
                {/* Logo */}
                <div className="img-footer">
                    <img src="../img/icons/Logo2.png" alt="Logo"></img>
                </div>
            </div>
        </footer>
    );
}
