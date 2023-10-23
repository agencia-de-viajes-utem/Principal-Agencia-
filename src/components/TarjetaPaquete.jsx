import PropTypes from "prop-types";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Importa FontAwesome
import {
  faUtensils,
  faWifi,
  faSwimmingPool,
  faParking,
  faStar,
}from "@fortawesome/free-solid-svg-icons";
import "../styles/TarjetaPaquete.css";

const serviciosIconos = {
  Restaurante: faUtensils,
  WiFi: faWifi,
  Piscina: faSwimmingPool,
  Estacionamiento: faParking,
};

const TarjetaPaquete = (props) => {
  const { paquete } = props;
  const estrellas = [];

  // Crear un array con estrellas según la cantidad proporcionada en paquete.estrellas
  // for (let i = 0; i < paquete.estrellas; i++) {
  //   estrellas.push(
  //     <FontAwesomeIcon icon={faStar} key={i} className="estrella-amarilla" />
  //   );
  // }
  // const precioTotal = paquete.precioPorPersona * paquete.numeroPersonas;

  return (
    <div className="tarjeta-paquete">
      <div className="imagen-carrusel">
        {/* <Carousel showThumbs={false}>
          {paquete.imagenes.map((imagen, index) => (
            <div key={index} className="imagen-carrusel-item">
              <img src={imagen} alt={`Imagen ${index + 1}`} />
            </div>
          ))}
        </Carousel> */}
      </div>
      <div className="informacion">
        <h2>{paquete.nombre_paquete}</h2>
        <p className="Descripcion">{paquete.desc_hh}</p>
        {/* <div className="estrellas">{estrellas}</div> */}
          <div className="servicios">
            <p>{paquete.servicios_hh}</p>
{/* 
            {paquete.servicios.map((servicio, index) => (
              <span key={index} className="icono-servicio">
                <FontAwesomeIcon icon={serviciosIconos[servicio]} />{" "}

              </span>
            ))}
            <div className="estrellas-puntuadas">
            {paquete.estrellas}
          </div>*/}
          <div className="linea-divisoria"></div> 
        </div>
        <div className="precios-container">
  <p className="precio">Total: {paquete.pr_total}</p>
  
    </div>
    <div className="Boton">
      <button className="elegir-button">Elegir</button>
    </div>
    </div>
    </div>
  );  
};


export default TarjetaPaquete;
