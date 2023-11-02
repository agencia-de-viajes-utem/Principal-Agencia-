import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import './utils/fonts.css';
import NavBar from './utils/Header/navBar';
import Footer from './utils/Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { routes } from '/src/routes/Routes.jsx';


function App() {
  if (navigator.permissions) {
    navigator.permissions.query({ name: 'geolocation' })
      .then(permissionStatus => {
        // Verificar el estado actual del permiso
        console.log('Estado actual de permiso de geolocalización:', permissionStatus.state);
  
        // Si el estado actual es 'prompt', muestra el cuadro de diálogo de solicitud de permiso
        if (permissionStatus.state === 'prompt') {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              console.log('Geolocalización concedida', position);
              // Haz aquí lo que necesites con la posición obtenida
            },
            (error) => {
              console.error('Error al obtener la geolocalización:', error);
            }
          );
        }
      })
      .catch(error => {
        console.error('Error al verificar el permiso de geolocalización:', error);
      });
  } else {
    console.log('La API de permisos no es compatible con este navegador');
  }
  

  const obtenerPaisDesdeCoordenadas = async (latitud, longitud) => {
    try {
      const response = await fetch(`https://geocode.xyz/${latitud},${longitud}?json=1`);
      if (response.ok) {
        const data = await response.json();
        return data.poi.addr_city;
      } else {
        throw new Error('Error al obtener el país desde las coordenadas.');
      }
    } catch (error) {
      console.error('Error al obtener el país:', error);
      return null;
    }
  };
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitud = position.coords.latitude;
        const longitud = position.coords.longitude;
        console.log(latitud, longitud);
        try {
          const pais = await obtenerPaisDesdeCoordenadas(latitud, longitud);
          console.log(pais);
        } catch (error) {
          console.error('Error al obtener la ubicación:', error);
        }
      },
      (error) => {
        console.error('Error al obtener la ubicación:', error);
      }
    );
  } else {
    console.error('Geolocalización no soportada por este navegador.');
  }
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
