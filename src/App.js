import React, { useState } from 'react';
import './App.css';
import NavBar from './components/navBar';
import AirportSearch from './components/AirportSearch';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [origen, setOrigen] = useState([]);
  const [destino, setDestino] = useState([]);

  const handleBuscarClick = () => {
    console.log('Origen seleccionado:', origen);
    console.log('Destino seleccionado:', destino);
    // Aquí puedes realizar la lógica de búsqueda con los valores de origen y destino.
    
  };

  return (
    <div className="App">
      <NavBar />
      <div className='search-group'> 
        <div className='input-group'>
          {/* Configura el componente AirportSearch para el origen y el destino */}
          <AirportSearch
            className="origen"
            onAirportSelect={(selected) => setOrigen(selected)}
          />
          <AirportSearch
            className="destino"
            onAirportSelect={(selected) => setDestino(selected)}
          />
        </div>
        <Button 
          className="buscar" 
          variant="primary"
          onClick={handleBuscarClick}
        >
          Buscar
        </Button>{' '}
      </div>
    </div>
  );
}

export default App;
