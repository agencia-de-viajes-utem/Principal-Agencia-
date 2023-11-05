import React, { useState, useEffect } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './AirportSearch.css';
import { fetchAirports } from '../../api/aeropuertos.js';

function AirportSearch({ className, onAirportSelect }) {
  const [airportOptions, setAirportOptions] = useState([]);
  const [selectedAirports, setSelectedAirports] = useState([]);
  const [airportData, setAirportData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const airports = await fetchAirports();
        setAirportOptions(airports.map((airport) => airport.nombre));
        setAirportData(airports);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSelection = (selectedOptions) => {
    setSelectedAirports(selectedOptions);
    const selectedAirportInfo = airportData
      .filter((airport) => selectedOptions.includes(airport.nombre))
      .map((selectedAirport) => ({
        id: selectedAirport.id,
        nombre: selectedAirport.nombre,
      }));

    // Llamamos a la función proporcionada por la prop "onAirportSelect" y pasamos los aeropuertos seleccionados
    onAirportSelect(selectedAirportInfo);
  };

  return (
    <div>
      <Typeahead
        className={className}
        id="airport-search"
        labelKey="nombre" 
        options={airportOptions}
        placeholder="Buscar aeropuertos..."
        onChange={handleSelection}
        selected={selectedAirports}
      />
    </div>
  );
}

export default AirportSearch;
