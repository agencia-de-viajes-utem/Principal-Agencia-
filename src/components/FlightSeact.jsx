import React, { Component } from 'react';
import citiesData from '../data/cities.json'; // Importa tu archivo JSON
import '../styles/FlightSearch.css'; // Importa tu archivo de estilos CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/fonts.css';

class FlightSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOrigin: '', // Estado para la ciudad de origen seleccionada
      selectedDestination: '', // Estado para la ciudad de destino seleccionada
    };
  }

  // Función para manejar la selección de origen
  handleOriginSelect = (event) => {
    this.setState({ selectedOrigin: event.target.value });
  }

  // Función para manejar la selección de destino
  handleDestinationSelect = (event) => {
    this.setState({ selectedDestination: event.target.value });
  }

  render() {
    const { selectedOrigin, selectedDestination } = this.state;

    // Genera opciones para el selector de origen desde el JSON
    const originOptions = citiesData.map((city, index) => (
      <option key={index} value={city}>
        {city}
      </option>
    ));

    // Genera opciones para el selector de destino desde el JSON
    const destinationOptions = citiesData.map((city, index) => (
      <option key={index} value={city}>
        {city}
      </option>
    ));

    return (
      <div className="container-form mt-5 ">
        <h2 className="mb-3" style={{color:"#023047"}}>
          Planifica tu viaje<i className="bi bi-airplane-fill avioncito" style={{ color: "#023047", transform: "rotate(45deg)" }}></i>


          </h2>
        <form className="row gap-1 justify-content-center text-start">
          <div className="col-xl-3 col-lg-4 col-md-5 col-sm-10">
            <label htmlFor="originSelect" className="form-label">Origen</label>
            <select
              id="originSelect"
              className="form-select"
              value={selectedOrigin}
              onChange={this.handleOriginSelect}
            >
              <option value="">- Selecciona origen -</option>
              {originOptions}
            </select>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-5 col-sm-10">
            <label htmlFor="destinationSelect" className="form-label">Destino</label>
            <select
              id="destinationSelect"
              className="form-select"
              value={selectedDestination}
              onChange={this.handleDestinationSelect}
            >
              <option value=""> - Selecciona destino -</option>
              {destinationOptions}
            </select>
          </div>
          <div className="col-xl-2 col-lg-4 col-md-5 col-sm-10">
            <label htmlFor="departureDate" className="form-label">Fecha de Ida</label>
            <input type="date" className="form-control" id="departureDate" />
          </div>
          <div className="col-xl-2 col-lg-4 col-md-5 col-sm-10">
            <label htmlFor="returnDate" className="form-label">Fecha de Vuelta</label>
            <input type="date" className="form-control" id="returnDate" />
          </div>
          <div className="col-xl-1 col-lg-6 col-md-6 col-sm-8 align-self-end mt-4">
            <button className="btn btn-primary w-100" type="submit">
              Buscar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default FlightSearch;
