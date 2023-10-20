import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

import '../styles/fonts.css';
import '../styles/Filtros.css'

import Estrellas from './Estrellas';

const Filtros = ({ filtrarPaquetes }) => {
  const [stars, setStars] = useState('');
  const [serviceTypes, setServiceTypes] = useState([]);

  const handleReset = () => {
    setStars('');
    setServiceTypes([]);
    filtrarPaquetes(() => true); // Restablecer a todos los paquetes
  };

  const services = [
    { id: 'wifi', label: 'WiFi' },
    { id: 'desayuno', label: 'Desayuno' },
    { id: 'bar', label: 'Bar' },
    { id: 'traslado', label: 'Traslado' },
    { id: 'gimnasio', label: 'Gimnasio' },
    { id: 'vistas', label: 'Vistas Panoramicas' },
    { id: 'acondicionado', label: 'Aire Acondicionado' },
    { id: 'spa', label: 'Spa' },
    { id: 'tv', label: 'TV' },
  ];

  const handleServiceTypeChange = (e) => {
    const value = e.target.value;
    setServiceTypes((prevTypes) =>
      prevTypes.includes(value)
        ? prevTypes.filter((type) => type !== value)
        : [...prevTypes, value]
    );
  };

  const handleStarClick = (valoracion) => {
    setStars(stars === valoracion.toString() ? '' : valoracion.toString());
  };

  const handleFilterClick = () => {
    filtrarPaquetes((paquete) => {
      const cumpleValoracion = stars === '' || paquete.valoracion === parseInt(stars);
      const cumpleServicios = serviceTypes.length === 0 || serviceTypes.every((servicio) => paquete['id-servicio'].includes(servicio));

      return cumpleValoracion && cumpleServicios;
    });
  };

  return (
    <Form className="contenedor-filtros">
    <h2>Filtros</h2>
    <FormGroup>
      <legend className="label">
        Estrellas
      </legend>
      <Estrellas valoracion={parseInt(stars)} onStarClick={handleStarClick} labelId="stars" />
    </FormGroup>

    <FormGroup>
  <legend className="label">Servicios</legend>
  <div>
    {services.map((service) => (
      <FormGroup key={service.id} check>
        <Label check for={service.id}>
          <Input
            type="checkbox"
            id={service.id}
            name={service.id}
            value={service.id}
            checked={serviceTypes.includes(service.id)}
            onChange={handleServiceTypeChange}
          />
          {service.label}
        </Label>
      </FormGroup>
    ))}
  </div>
</FormGroup>

      <div className="botones">
        <Button onClick={handleFilterClick}>
          <i className="bi bi-funnel-fill"></i>
          Filtrar
        </Button>
        <Button onClick={handleReset}>
          <i className="bi bi-arrow-counterclockwise"></i>
          Reestablecer
        </Button>
      </div>
    </Form>
  );
};

export default Filtros;
