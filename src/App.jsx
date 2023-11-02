import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import './utils/fonts.css';
import NavBar from './utils/Header/navBar';
import Footer from './utils/Footer/Footer';
import Buscador from './components/Buscador';
import 'bootstrap/dist/css/bootstrap.min.css';
import PagBusqueda from './components/PagBusqueda';
import PagDetalle from './components/PagDetalle.jsx'

function App() {
  return (
    <Router>
    <div className="App">
      <NavBar />
      <Routes>

        <Route path="/" element={<Buscador />} />
        <Route path="/pag-busqueda" element={<PagBusqueda />} />
        <Route path='/pag-detalle' element={<PagDetalle/>}/>

      </Routes>
      <div className='container-footer'>
      <Footer />
      </div>
    </div>
    </Router>
  );

}

export default App;
