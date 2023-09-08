import React, { useState, useEffect } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

function AirportSearch({ className, onAirportSelect }) {
  const [options, setOptions] = useState([]);
  const [selectedAirports, setSelectedAirports] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const response = await fetch('http://localhost:8080/aeropuertos');
        if (!response.ok) {
          throw new Error('Error al obtener los aeropuertos');
        }
        const data = await response.json();
        setOptions(data.map((airport) => airport.aeropuerto));
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAirports();
  }, []);

  const handleSelection = (selected) => {
    setSelectedAirports(selected);
    const selectedAirportInfo = selected.map((airportName) => {
      const selectedAirport = data.find((item) => item.aeropuerto === airportName);
      if (selectedAirport) {
        return { id: selectedAirport.id, aeropuerto: selectedAirport.aeropuerto };
      }
      return null;
    });

    // Filtramos los valores nulos en caso de que no se encuentre un aeropuerto
    const filteredSelectedAirportInfo = selectedAirportInfo.filter((info) => info !== null);
    
    // Llamamos a la función proporcionada por la prop "onAirportSelect" y pasamos los aeropuertos seleccionados
    onAirportSelect(filteredSelectedAirportInfo);
  };

  return (
    <div>
      <Typeahead
        className={className}
        id="airport-search"
        labelKey="aeropuerto"
        options={options}
        placeholder="Buscar aeropuertos..."
        onChange={handleSelection}
        selected={selectedAirports}
      />
    </div>
  );
}

export default AirportSearch;
