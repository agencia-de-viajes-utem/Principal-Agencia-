import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import './styles/fonts.css'
import NavBar from './components/navBar';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { routes } from '/src/routes/Routes.jsx';


function App() {
  return (
    <Router>
    <div className="App">
      <NavBar />
      <Routes>
      {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<route.component />}  // Corregido aquí
          />
        ))}
         </Routes>
      <div className='container-footer'>
      <Footer />
      </div>
    </div>
    </Router>
  );

}

export default App;
