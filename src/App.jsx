import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './styles/fonts.css'
import NavBar from './components/navBar';
import AirportSearch from './components/AirportSearch';
import Footer from './components/footer';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/OfferCarousel.jsx'
import OfferCarouesel from './components/OfferCarousel.jsx';

function App() {
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

  const handleBuscarClick = async () => {
    if (!origen || origen.length === 0 || !destino || destino.length === 0) {
      alert('Por favor, selecciona tanto el origen como el destino.');
      return;
    }

    if (showMonthView) {
      // Manejar lógica cuando está en vista de año (year)
      // Por ejemplo, puedes mostrar una alerta con el mes seleccionado
      if (!selectedMonth) {
        alert('Por favor, selecciona un mes.');
        return;
      }
      console.log('Mes seleccionado en vista de año:', selectedMonth);

      // Realizar la solicitud a la API en la vista de año
      const origenId = origen[0].id;
      const destinoId = destino[0].id;
      const mesSeleccionado = selectedMonth.split('-')[1]; // Extraer el mes de selectedMonth

      setIsLoading(true);

      try {
        const response = await fetch(
          `http://localhost:8080/paquetes/mes?origen=${origenId}&destino=${destinoId}&mes=${mesSeleccionado}`
        );
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        const data = await response.json();
        if (data.length === 0) {
          alert('No hay paquetes disponibles para el mes seleccionado.');
        } else {
          setPaquetes(data);
        }
      } catch (error) {
        console.error('Error al cargar los paquetes:', error);
      } finally {
        setIsLoading(false);
        setPaquetesFetched(true);
      }
    } else {
      // Manejar lógica cuando está en vista normal (por día)
      if (!selectedDates || selectedDates.length === 0) {
        alert('Por favor, selecciona las fechas deseadas.');
        return;
      }

      const formattedDates = selectedDates.map((date) => {
        date.setHours(0, 0, 0, 0);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      });

      const origenId = origen[0].id;
      const destinoId = destino[0].id;
      const fechaInicio = formattedDates[0];
      const fechaFin = formattedDates[formattedDates.length - 1];

      setIsLoading(true);

      try {
        console.log(origenId, destinoId, fechaInicio, fechaFin)
        const response = await fetch(
          `http://localhost:8080/paquetes?origen=${origenId}&destino=${destinoId}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
        );
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        const data = await response.json();
        if (data.length === 0) {
          alert('No hay paquetes disponibles para las fechas seleccionadas.');
        } else {
          setPaquetes(data);
        }
      } catch (error) {
        console.error('Error al cargar los paquetes:', error);
      } finally {
        setIsLoading(false);
        setPaquetesFetched(true);
      }
    }
  };

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

  return (
    <div className="App">
      <NavBar />
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
        <Button className="buscar" variant="primary" onClick={handleBuscarClick}>
          BUSCAR
        </Button>
      </div>
      {isLoading && <div>Cargando...</div>}
      {paquetesFetched && paquetes.length === 0 && (
        <div className="no-paquetes">
          No se encontraron paquetes en esa fecha o mes seleccionado.
        </div>
      )}
      {paquetes.length > 0 && (
        <div className="paquetes">
          <h2>Paquetes Disponibles:</h2>
          <pre>{JSON.stringify(paquetes, null, 2)}</pre>
        </div>
      )}
      <div> <OfferCarouesel /> </div>
      </div>
      <div className="footer-placeholder"></div>
      <div className='container-footer'>
      <Footer />
      </div>
    </div>
  );

}

export default App;
