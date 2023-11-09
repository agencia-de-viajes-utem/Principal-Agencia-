import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Filtros from '../../components/Filtros/Filtros';
import SortBy from '../../components/SortBy/SortBy';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { apiCall } from '../../api/paquetes.js'

import "./PagBusqueda.css";

import Loading from '../../utils/Loading/Loading.jsx';
import CurrentSearch from '../../components/CurrentSearch/CurrentSearch.jsx';
import TarjetaPaquete from '../../components/TarjetaPaquete/TarjetaPaquete';

function PagBusqueda() {

  const location = useLocation();
  const { origen, destino, selectedDates, numberOfPeople } = location.state;
  const [paquetesFiltrados, setPaquetesFiltrados] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const filtrarPaquetes = (filtro) => {
    const paquetesFiltrados = paquetes.filter(filtro);
    setPaquetesFiltrados(paquetesFiltrados);
  };

  const fechaInicio = selectedDates[0];
  const fechaFin = selectedDates[1];

  const formatDateForAPI = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (origen && destino && selectedDates.length === 2 && numberOfPeople) {
        const solicitud = {
          origen_id: origen[0].id,
          destino_id: destino[0].id,
          fechaInit: formatDateForAPI(selectedDates[0]),
          fechaFin: formatDateForAPI(selectedDates[1]),
          personas: numberOfPeople,
        };

        try {
          setIsLoading(true);
          const paquetesEncontrados = await apiCall('/paquetes', 'POST', solicitud);
          console.log('Paquetes encontrados:', paquetesEncontrados);
          setPaquetesFiltrados(paquetesEncontrados);
        } catch (error) {
          console.error('Error al buscar paquetes', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();

  }, [origen, destino, selectedDates, numberOfPeople]);

  return (
    <div>

      <div className='d-flex justify-content-center align-items-center mb-4'>
        <CurrentSearch
          origen={origen}
          destino={destino}
          selectedDates={selectedDates}
          numberOfPeople={numberOfPeople}
        />
      </div>
      <div className="PagBusqueda">
        <div className="body">
          <h1>Paquetes</h1>

          <div className='botones'>
            <button type='button' className='btn' onClick={() => setShowModal(true)}>Filtros</button>
            <SortBy paquetes={paquetesFiltrados} setPackages={setPaquetesFiltrados} />
          </div>

          <div className="loading-container">
            {isLoading ? (
              <Loading /> // Muestra loading mientras se cargan los paquetes
            ) : (
              <ul className='lista-paquetes'>
                {paquetesFiltrados.map((paquete) => (
                  <TarjetaPaquete paquete={paquete} key={paquete.id} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Body>
          <Filtros filtrarPaquetes={filtrarPaquetes} />
        </Modal.Body>

      </Modal>

    </div>
  );
}

export default PagBusqueda;
