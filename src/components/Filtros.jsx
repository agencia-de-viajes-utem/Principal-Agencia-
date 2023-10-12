import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import '../styles/Filtros.css';
import "bootstrap-icons/font/bootstrap-icons.css"
import '../styles/fonts.css';

const Filtros = ({}) => {
  const [stars, setStars] = useState('');
  const [serviceType, setServiceType] = useState('');

  const handleReset = () => {
    setStars('');
    setServiceType('');
  };

  return (
    <Form className='contenedor-filtros'>
      <h2>Filtros</h2>
      <FormGroup>
        <Label className='label' for="stars">
          Estrellas
          </Label>
        <Input className='input'
          type="select"
          id="stars"
          value={stars}
          onChange={(e) => setStars(e.target.value)}
        >
          <option value="">Todas las estrellas</option>
          <option value="1">1 estrella</option>
          <option value="2">2 estrellas</option>
          <option value="3">3 estrellas</option>
          <option value="4">4 estrellas</option>
          <option value="5">5 estrellas</option>
        </Input>
      </FormGroup>

      <FormGroup>
        <Label className='label' for="serviceType">Servicio</Label>
        <Input className='input'
          type="select"
          id="serviceType"
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
        >
          <option value="">Todos los tipos</option>
          <option value="standard">Estándar</option>
          <option value="luxury">Lujo</option>
          <option value="allInclusive">Todo Incluido</option>
        </Input>
      </FormGroup>

      <div className='botones'>
        <Button>
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
