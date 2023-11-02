import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Filtros from '../../components/Filtros/Filtros';
import SortBy from '../../components/SortBy/SortBy'
import "./PagBusqueda.css";
import CurrentSearch from '../../components/CurrentSearch/CurrentSearch.jsx'
import TarjetaPaquete from '../../components/TarjetaPaquete/TarjetaPaquete';


function PagBusqueda() {
  const location = useLocation();
  const { paquetes, origen, destino, selectedDates, selectedMonth, numberOfPeople } = location.state;
  const [paquetesFiltrados, setPaquetesFiltrados] = useState(paquetes);

  const filtrarPaquetes = (filtro) => {
    const paquetesFiltrados = paquetes.filter(filtro);
    setPaquetesFiltrados(paquetesFiltrados);
  };


  return (
    <div>
      <div className='d-flex justify-content-center align-items-center mb-4'>
        <CurrentSearch
            origen={origen}
            destino={destino}
            selectedDates={selectedDates}
            selectedMonth={selectedMonth}
            numberOfPeople={numberOfPeople}
        /> 
      </div>
    <div className="PagBusqueda">
      <div className="sidebar">
        
        <Filtros filtrarPaquetes={filtrarPaquetes} />
      </div>
      <div className="body">
        <h1>Paquetes</h1>
        <SortBy paquetes={paquetes} setPackages={setPaquetesFiltrados} />
        <ul className='lista-paquetes'>
          {paquetesFiltrados.map((paquete) => (
            <TarjetaPaquete paquete={paquete} key={paquete.id_paquete} />
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
}

export default PagBusqueda;