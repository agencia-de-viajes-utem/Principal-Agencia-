import React from "react";
import { useParams, useLocation } from 'react-router-dom';
import DescripciónPaquete from "../../components/DescripcionPaquete/DescripcionPaquete";
import "./PagDetalle.css";
import VueloAlojo from "../../components/InfoVueloAlojo/InfoVueloAlojo";

const PagDetalle = (props) => {
  const location = useLocation();
  // const { paqueteSeleccionado } = location.state

  // Check if paqueteSeleccionado is defined before accessing properties
  // if (!paqueteSeleccionado) {
  //   return <div>No package selected</div>;
  // }

  return (
    <div className="PagDetalle">
      
      {/* <h2>{paqueteSeleccionado.nombre_paquete}</h2>
      <p>Descripción: {paqueteSeleccionado.desc_paquete}</p>
      <p>Detalle: {paqueteSeleccionado.detalle_paquete}</p>
      <p>Fecha de inicio: {paqueteSeleccionado.fechaInit}</p>
      <p>Fecha de fin: {paqueteSeleccionado.fechaFin}</p>
      <p>Cantidad de días: {paqueteSeleccionado.cant_dias}</p>
      <p>Precio del viaje: ${paqueteSeleccionado.pr_viaje}</p>
      <p>Precio por noche: ${paqueteSeleccionado.pr_noche}</p>
      <p>Precio total: ${paqueteSeleccionado.pr_total}</p>
      <p>Ciudad de origen: {paqueteSeleccionado.ciudad_origen}</p>
      <p>Ciudad de destino: {paqueteSeleccionado.ciudad_destino}</p>
      <p>Nombre del hotel: {paqueteSeleccionado.nombre_hotel}</p>
      <p>Descripción del hotel: {paqueteSeleccionado.desc_hh}</p>
      <p>Servicios del hotel: {paqueteSeleccionado.servicios_hh}</p> */}
      <DescripciónPaquete/>
      <VueloAlojo/>
    </div>

  );
};

export default PagDetalle;