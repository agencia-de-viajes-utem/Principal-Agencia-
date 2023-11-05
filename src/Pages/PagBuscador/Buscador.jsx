import React, { useState, useEffect, useRef } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../utils/fonts.css';
import AirportSearch from '../../components/AirportSearch/AirportSearch.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import OfferCarouesel from '../../components/OfferCarousel/OfferCarousel.jsx';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, Link } from 'react-router-dom';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import "./Buscador.css"
import { fetchPaquetesAPI } from '../../api/paquetesFechas.js'

function Buscador() {

  const [origen, setOrigen] = useState([]);
  const [destino, setDestino] = useState([]);
  const [selectedDates, setSelectedDates] = useState(new Date());
  const [paquetes, setPaquetes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showMonthView, setShowMonthView] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState([]);
  const [paquetesFetched, setPaquetesFetched] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [urlPaquete, setUrlPaquete] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (
      origen.length !== 0 &&
      destino.length !== 0 &&
      (selectedMonth.length > 0 || selectedDates.length > 0) &&
      numberOfPeople !== '' // Comprueba si se ha seleccionado un número de personas
    ) {
      setIsButtonDisabled(false);
      fetchPaquetes();
    } else {
      setIsButtonDisabled(true);
    }
  }, [origen, destino, selectedMonth, selectedDates, numberOfPeople]);

  const fetchPaquetes = async () => {
    setIsLoading(true);
    const fechaInicio = selectedDates[0]; // Primera fecha seleccionada
    const fechaFin = selectedDates[1]; // Segunda fecha seleccionada (si se selecciona un rango de fechas)
    try {
      const data = await fetchPaquetesAPI(
        origen[0].id,
        destino[0].id,
        fechaInicio,
        fechaFin,
        numberOfPeople
      );
  
      if (data.length === 0) {
        alert('No hay paquetes disponibles para la selección realizada.');
      } else {
        setPaquetes(data);
      }
    } catch (error) {
      console.error('Error al cargar los paquetes:', error);
    } finally {
      setIsLoading(false);
      setPaquetesFetched(true);
    }
  };

  const handleBuscarClick = () => {

    if (origen.length !== 0 && destino.length !== 0 && selectedDates.length === 2 && numberOfPeople !== '') {
      console.log('Buscando paquetes...')
      navigate('/Busqueda', {
        state: {
          paquetes: paquetes,
          origen: origen,
          destino: destino,
          fechaInicio: selectedDates[0],
          fechaFin: selectedDates[1],
          numberOfPeople: numberOfPeople,
        },
      });
    }
  };
  

  // Event listener para cerrar el calendario cuando se hace clic fuera de él
  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    }

    // Agregar el event listener cuando el calendario está abierto
    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      // Quitar el event listener cuando el calendario está cerrado
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      // Asegurarse de quitar el event listener cuando se desmonta el componente
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendar]);



  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateChange = (date) => {
    setSelectedDates(date);
  };

  const handleCheckboxChange = () => {
    setShowMonthView(!showMonthView);
    setSelectedDates([]); // Limpia las fechas seleccionadas al cambiar de vista
    setPaquetes([]); // Limpia los paquetes al cambiar de vista
    setPaquetesFetched(false); // Reinicia el estado de búsqueda al cambiar de vista
  };

  const handleMonthClick = (value) => {
    // El parámetro "value" contiene la fecha del mes seleccionado
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    setSelectedMonth(`${year}-${month}`);

  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(2);
    return `${day}/${month}/${year}`;
  };

  return (
    <div className='container_buscador'>
      <div className="search-group" style={{ position: "relative" }}>
        {/* Inicio HTML de las nubes */}
        <div id="background-wrap">
          <div className="x1">
            <div className="cloud nube1"></div>
          </div>
          <div className="x2">
            <div className="cloud nube2"></div>
          </div>
          <div className="x3">
            <div className="cloud nube3"></div>
          </div>
          <div className="x4">
            <div className="cloud nube4"></div>
          </div>
        </div>
        {/* Fin del HTML de las nubes */}
        <div className='elementos-buscador'>
        <h2 className='h2-busqueda elemento-encima'> ¡Busca tu viaje ahora! </h2>
        <div className="input-group elemento-encima">
          <AirportSearch
            id="input-aeropuerto-origen"

            onAirportSelect={(selected) => setOrigen(selected)}
          />
          <AirportSearch
            id="input-aeropuerto-destino"

            onAirportSelect={(selected) => setDestino(selected)}
          />
          <div className='input-calendar'>
            <input
              id='input-fecha'
              className="elemento-encima rbt-input-main form-control rbt-input"
              type="text"
              autocomplete="off"
              placeholder="Fecha Origen - Salida"
              defaultValue={
                selectedDates.length === 2
                  ? `${formatDate(selectedDates[0])} - ${formatDate(
                    selectedDates[1]
                  )}`
                  : selectedDates.length === 1
                    ? formatDate(selectedDates[0])
                    : selectedMonth
              }
              onClick={toggleCalendar}
            />
            {showCalendar && (
              <div className='calendar' ref={calendarRef}>
                <div className='calendar-inner'>
                  <Calendar
                    onChange={handleDateChange}
                    value={selectedDates}
                    selectRange={showMonthView ? false : true}
                    view={showMonthView ? "year" : undefined}
                    onClickMonth={handleMonthClick}
                    // minDate={new Date()}
                  />
                  <label className='form-check'>
                    <Form.Check
                      type="checkbox"
                      label="Selección por mes"
                      checked={showMonthView}
                      onChange={handleCheckboxChange}
                    />
                  </label>
                </div>
              </div>
            )}
          </div>
          <div>
          <select
        id="input-personas"
        className="elemento-encima rbt-input-main form-control rbt-input custom-select"
        value={numberOfPeople}
        onChange={(e) => setNumberOfPeople(e.target.value)}
      >
        <option disabled hidden value="" style={{ color: 'gray' }}>Número de Personas</option>
        <option value="1" >1</option>
        <option value="2" >2</option>
        <option value="3" >3</option>
        <option value="4" >4</option>
        <option value="5" >5</option>
        <option value="6" >6</option>
        <option value="7" >7</option>
        <option value="8" >8</option>
      </select>
          </div>
        </div>

        <Button
          className={`buscar ${isButtonDisabled ? '' : 'active'}`}
          variant="primary"
          onClick={handleBuscarClick} // Maneja el clic del botón
          disabled={isButtonDisabled} // Utiliza el estado para habilitar/deshabilitar el botón
        >
          BUSCAR
        </Button>
        </div>
      </div>
      {/* {isLoading && <div>Cargando...</div>}
        {paquetesFetched && paquetes.length === 0 && (
          <div className="no-paquetes">
            No se encontraron paquetes en esa fecha o mes seleccionado.
          </div>
        )} */}
      <div className='Carrusel'> 
      <OfferCarouesel /> 
      </div>
    </div>
  );

}

export default Buscador;