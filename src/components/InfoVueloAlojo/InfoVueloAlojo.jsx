import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

import '../../utils/fonts.css';
import './InfoVueloAlojo.css';

function VueloAlojo() {

  return (
    <div className='contenedor-info'>
      <div className='alojamiento'>
        <div className='info-alojamiento'>
          <h3>Alojo</h3>
          <p className='p-medio'>Krystal Cancun</p>
          <p className='p-pequeño'>3 dias, 2 noches</p>
        </div>
        <i className="icono bi bi-house-door-fill"></i>
      </div>
      <div className='vuelo'>
        <div className='info-vuelo'>
          <h3>Vuelo</h3>
          <p className='p-medio'>Santiago de Chile, Cancun</p>
          <p className='p-pequeño'>23 Oct - 29 Oct</p>
        </div>
        <i className="icono bi bi-airplane-fill"></i>
      </div>
    </div>
  );
}

export default VueloAlojo;
