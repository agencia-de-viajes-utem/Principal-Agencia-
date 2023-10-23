import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsSearch, BsFillAirplaneFill, BsFillCalendarCheckFill, BsFillPeopleFill } from "react-icons/bs";
import AirportSearch from './AirportSearch.jsx';
import Button from 'react-bootstrap/Button';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Form from 'react-bootstrap/Form';
import "./CurrentSearch.css"

const App = () => {

  const [origen, setOrigen] = useState([]);
  const [destino, setDestino] = useState([]);
  const [selectedDestino, setSelectedDestino] = useState('');
  const [selectedDates, setSelectedDates] = useState(new Date());
  const [paquetes, setPaquetes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showMonthView, setShowMonthView] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState([]);
  const [paquetesFetched, setPaquetesFetched] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);  
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [busqueda, setBusqueda] = useState({});
  const calendarRef = useRef(null);
 
  const [mostrarBusqueda, setMostrarBusqueda] = useState(false);

  const [data, setData] = useState([]);
  const [options, setOptions] = useState([]);

  // useEffect(() => {
  //   // Fetch data from API and store it in the options state variable
  //   fetch('http://localhost:8080/aeropuertos')
  //     .then(response => response.json())
  //     .then(data => setOptions(data))
  //     .catch(error => console.error(error));
  // }, []);

  
  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(apiUrl + '/listaeropuertos');
        if (!response.ok) {
          throw new Error('Error al obtener los aeropuertos');
        }
        const data = await response.json();
  
         setOptions(data.map((airport) => airport.aeropuerto));
         setData(data);
  
        // console.log("Data recuperada:", data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchAirports();
  }, []);

  const actualizarBusquedaReciente = (nuevaBusqueda) => {
    setBusquedaReciente(nuevaBusqueda);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBusqueda({ ...busqueda, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    actualizarBusquedaReciente(busqueda);
    // Aquí puedes realizar acciones adicionales con la búsqueda, como enviarla al servidor, etc.
  };

  const toggleMostrarBusqueda = () => {
    setMostrarBusqueda(!mostrarBusqueda);
  };

  const handleBuscarClick = async () => {
	if (!origen || origen.length === 0 || !destino || destino.length === 0) {
	  alert('Por favor, selecciona tanto el origen como el destino.');
	  return;
	}
}
const toggleCalendar = () => {
  setShowCalendar(!showCalendar);
};

const handleDateChange = (date) => {
  setSelectedDates(date);
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

const handleCheckboxChange = () => {
  setShowMonthView(!showMonthView);
  setSelectedDates([]); // Limpia las fechas seleccionadas al cambiar de vista
  setPaquetes([]); // Limpia los paquetes al cambiar de vista
  setPaquetesFetched(false); // Reinicia el estado de búsqueda al cambiar de vista
};


  return (
        <div className="row d-flex flex-column " style={{backgroundColor: "#023047", color: "White", borderRadius: "20px", width: '80%'}}>
          <div className="col">
            <div className='d-flex flex-column'>
              <div className="d-flex flex-wrap mb-1">
              <p className="card-text  justify-content-start mr-2 mt-3 mb-2 col-sm-12 col-md-6 col-lg-3" style={{  }}>
              <BsFillAirplaneFill className='mb-3 mx-2' style={{ width: "2rem", height: "2rem", rotate: "45deg" }} /> <h3>Origen</h3>
              {origen.map(item => (
             <div className='d-flex' key={item.id}>{item.aeropuerto}</div>
              ))}
              </p>
                <p className="card-text justify-content-start mt-3 mb-2 mx-auto col-sm-12 col-md-6 col-lg-3 " style={{  marginRight: "0px" }}>
                  <BsFillAirplaneFill className='mb-3' style={{ width: "2rem", height:"2rem",  rotate: "120deg" }}/><h3>Destino</h3>
                  {destino.map(item => (
                  <p className='d-flex'>{item.aeropuerto}</p>
                  ))}
                </p>
                <p className="card-text mx-1 justify-content-start mt-3 mb-2 col-sm-12 col-md-6 col-lg-2" style={{  marginRight: "80px" }}>
                  <BsFillCalendarCheckFill className = 'mb-3' style={{ width: "2rem", height:"2rem", marginRight:""}}/> <h3>Ida y vuelta</h3>
                  {selectedDates.length === 2
                    ? `${formatDate(selectedDates[0])} - ${formatDate(
                        selectedDates[1]
                      )}`
                    : selectedDates.length === 1
                    ? formatDate(selectedDates[0])
                    : selectedMonth}
                </p>
                <p className="card-text justify-content-start mt-3 mb-2 mx-4 col-sm-12 col-md-6 col-lg-2">
                <BsFillPeopleFill className='mb-3' style={{ width: "2rem", height:"2rem", marginLeft:"10px"}}/> <h2>Personas</h2> {numberOfPeople}
                </p>
              </div>
            </div>
          </div>
        </div>
    
  );
}

export default App;
