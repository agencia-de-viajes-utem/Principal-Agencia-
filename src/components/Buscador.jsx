import React, { useState, useEffect, useRef } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/fonts.css';
import AirportSearch from './AirportSearch';
import 'bootstrap/dist/css/bootstrap.min.css';
import OfferCarouesel from './OfferCarousel.jsx';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, Link } from 'react-router-dom';

import PagBusqueda from './PagBusqueda';

function Buscador(){

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
  if (origen.length !== 0 && destino.length !== 0 && (selectedMonth.length > 0 || selectedDates.length > 0)) {
    console.log("¡Hola Mundo!", origen, destino, selectedDates);
    setIsButtonDisabled(false);
    //Hacer fetch y guardarlo en paquetes
    //Aca hay 2 condiciones, pudo haber elegido x mes o rango de fecha
    fetchPaquetes();
  }else{
    setIsButtonDisabled(true);
  }
}, [origen, destino, selectedMonth ,selectedDates]);

const fetchPaquetes = async () => {
  setIsLoading(true);
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    let apiEndpoint = '';
    if (showMonthView) {
      // Vista de mes
      const mesSeleccionado = selectedMonth.split('-')[1];
      apiEndpoint = `/paquetes/mes?origen=${origen[0].id}&destino=${destino[0].id}&mes=${mesSeleccionado}`;
    } else {
      // Vista de días
      const formattedDates = selectedDates.map((date) => {
        date.setHours(0, 0, 0, 0);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      });
      const fechaInicio = formattedDates[0];
      const fechaFin = formattedDates[formattedDates.length - 1];
      apiEndpoint = `/paquetes?origen=${origen[0].id}&destino=${destino[0].id}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
    }

    const response = await fetch(apiUrl + apiEndpoint);
    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }
    const data = await response.json();
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

  console.log("Paquetes:", paquetes);
};

const handleBuscarClick = () => {
  // Verifica si los campos están llenos
  if (origen.length !== 0 && destino.length !== 0 && (selectedMonth.length > 0 || selectedDates.length > 0)) {
    // Redirige a la página de búsqueda y pasa los paquetes como un parámetro
    console.log(`/pag-busqueda/${encodeURIComponent(JSON.stringify(paquetes))}`);
    navigate(`/pag-busqueda/${encodeURIComponent(JSON.stringify(paquetes))}`);
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
  console.log(month);
};

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(2);
  return `${day}/${month}/${year}`;
};

    return(
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
          <h2 className='h2-busqueda elemento-encima'> ¡Empieza a Explorar! </h2>
          <div className="input-group">
            <div className='input-aeropuerto'>
              <AirportSearch
                id="input-aeropuerto-origen"
                className="origen input-style elemento-encima"
                onAirportSelect={(selected) => setOrigen(selected)}
              />
              <AirportSearch
                id="input-aeropuerto-destino"
                className="destino input-style elemento-encima"
                onAirportSelect={(selected) => setDestino(selected)}
              />
            </div>
            <div className="date-input-container">
      <input
        id='input-fecha'
        className="input-style elemento-encima"
        type="text"
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
        <div className="calendar-container" ref={calendarRef}>
          <Calendar
            onChange={handleDateChange}
            value={selectedDates}
            selectRange={showMonthView ? false : true}
            view={showMonthView ? "year" : undefined}
            onClickMonth={handleMonthClick}
          />
          <label>
          <Form.Check
            type="checkbox"
            text={"Selección por mes"}
            checked={showMonthView}
            onChange={handleCheckboxChange}
          />
          </label>
        </div>
      )}
    </div>
    <div className="people-input-container elemento-encima">
      <input
        id='input-personas'
        name='numeroDePersonas'
        className="input-style "
        type="number"
        placeholder='Número de personas'
        defaultValue={numberOfPeople}
        onChange={(e) => setNumberOfPeople(e.target.value)}
      />
    </div>
  </div>
      
        <Button
          className="buscar"
          variant="primary"
          onClick={handleBuscarClick} // Maneja el clic del botón
          disabled={isButtonDisabled} // Utiliza el estado para habilitar/deshabilitar el botón
        >
          BUSCAR
        </Button>

        </div>
        {isLoading && <div>Cargando...</div>}
        {paquetesFetched && paquetes.length === 0 && (
          <div className="no-paquetes">
            No se encontraron paquetes en esa fecha o mes seleccionado.
          </div>
        )}
        <div className=''> <OfferCarouesel /> </div>
        <Link to={`/pag-busqueda/1`}>
           <button>Ir a la página de búsqueda</button>
          </Link>
        </div>
    );

}

export default Buscador;