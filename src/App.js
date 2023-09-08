import React, { useState } from 'react';
import './App.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import NavBar from './components/navBar';
import AirportSearch from './components/AirportSearch';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [origen, setOrigen] = useState([]);
  const [destino, setDestino] = useState([]);
  const [selectedDates, setSelectedDates] = useState(new Date());
  const [paquetes, setPaquetes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showMonthView, setShowMonthView] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState([]);
  const [paquetesFetched, setPaquetesFetched] = useState(false);

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

  return (
    <div className="App">
      <NavBar />
      <div className="search-group">
        <div className="input-group">
          <AirportSearch
            className="origen"
            onAirportSelect={(selected) => setOrigen(selected)}
          />
          <AirportSearch
            className="destino"
            onAirportSelect={(selected) => setDestino(selected)}
          />
        </div>
        <div className="calendar-container">
          <Calendar 
            onChange={handleDateChange}
            value={selectedDates}
            selectRange={showMonthView ? false : true}
            view={showMonthView ? "year" : undefined}
            onClickMonth={handleMonthClick}
          />
          <Form.Check
            type="checkbox"
            label="Vista mes"
            checked={showMonthView}
            onChange={handleCheckboxChange}
          />
        </div>
        <Button className="buscar" variant="primary" onClick={handleBuscarClick}>
          Buscar
        </Button>
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
      </div>
    </div>
  );
}

export default App;
