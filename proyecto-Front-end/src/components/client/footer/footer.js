import "../../../css/Client/footer.css"

export function Footer() {
    return (
        <footer class="footer">
            <div className="info-footer">
                <div class="footer-column">
                    <p className="title">Contáctanos</p>
                    <p><span className="material-symbols-outlined">
                        mail
                    </span> arquideco@gmail.com</p>
                    <p><span className="material-symbols-outlined">
                        phone_in_talk
                    </span> (123) 456-7890</p>
                    <p><span className="material-symbols-outlined">
                        phone_in_talk
                    </span> (123) 456-7890</p>
                </div>
                <div class="footer-column">
                    <p className="title">Ubicación</p>
                    <p><span className="material-symbols-outlined">
                        location_on
                    </span> Calle 100 #10 A 10 - Barrio X</p>
                    <p><span className="material-symbols-outlined">
                        location_on
                    </span> Carrera 121 #10 L 10 - Barrio Y</p>
                </div>
                <div className="footer-column social">
                    <p className="title">Redes Sociales</p>
                    <div className="social-icons">
                        <p><i className="fa-brands fa-facebook" style={{ color: "white" }}></i> Facebook</p>
                        <p><i className="fa-brands fa-instagram" style={{ color: "white" }}></i> Instagram</p>
                    </div>
                </div>
            </div>
            <div className="decoration-footer">
                <div className="line-footer-box">
                    <div className="line-footer"></div>
                </div>
                <div className="img-footer">
                    <img src="./../img/Logo2.png"></img>
                </div>
            </div>
        </footer>
    )
}