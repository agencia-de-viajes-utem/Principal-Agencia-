import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import 'react-calendar/dist/Calendar.css';
import './styles/fonts.css'
import NavBar from './components/navBar';
import Footer from './components/Footer';
import Buscador from './components/Buscador';
import 'bootstrap/dist/css/bootstrap.min.css';
import PagBusqueda from './components/PagBusqueda';

function App() {
 
  return (
    <Router>
    <div className="App">
      <NavBar />
      <Routes>

        <Route path="/" element={<Buscador />} />
        <Route path="/pag-busqueda/:id_paquete" element={<PagBusqueda />} />
        
      </Routes>
      <div className='container-footer'>
        <Footer />
      </div>
    </div>
    </Router>
  );

}

export default App;
