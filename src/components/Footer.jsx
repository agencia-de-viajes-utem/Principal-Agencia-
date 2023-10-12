import React from "react";
import '../styles/fonts.css';
import '../styles/Footer.css';

function Footer(){
    return(
        <footer className="custom-footer">
            <div className="logo-container">
                <img src="/logo.png" alt="Logo" />
            </div>
            <nav className="footer-links">
                <a href="/">Inicio</a>
                <a href="/quienes-somos">¿Quiénes somos?</a>
                <a href="/hoteles">Hoteles</a>
                <a href="/contacto">Contacto</a>
            </nav>
            <div className="rights">
                <p>© UTEM TRAVELS, Todos los derechos reservados</p>
            </div>
            {/* <div className="social-icons">
                <a href="https://www.facebook.com/tu-facebook" target="_blank" rel="noopener noreferrer">
                    <img src="/ruta-a-icono-facebook.png" alt="Facebook" />
                </a>
                <a href="https://www.instagram.com/tu-instagram" target="_blank" rel="noopener noreferrer">
                    <img src="/ruta-a-icono-instagram.png" alt="Instagram" />
                </a>
            </div> */}
        </footer>
    )
}

export default Footer;