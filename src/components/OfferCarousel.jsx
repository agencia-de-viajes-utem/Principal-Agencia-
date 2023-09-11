import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function OfferCarousel() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Simula una llamada a una API para obtener los datos del archivo JSON
    fetch('src/components/tarjetas.json')
      .then((response) => response.json())
      .then((data) => setCards(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div className="container mt-5 d-flex">
      <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {cards.map((card, index) => (
            <div key={card.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <div className="row">
                <div className="col-12 col-md-4 col-lg-3">
                  <div
                    className="card mb-3"
                    style={{
                      width: '300px',
                      height: '500px',
                      borderRadius: '8px',
                    }}
                  >
                    <img
                      src={card.imageSrc}
                      alt={card.title}
                      className="card-img-top"
                      style={{
                        maxHeight: '300px',
                        maxWidth: '100%',
                      }}
                    />
                    <div className="card-body">
                      <div className="Package-info">
                        <p>Ida+Vuelta</p>
                      </div>
                      <h2 className="card-title">{card.title}</h2>
                      <p className="card-text">{card.description}</p>
                      <div>
                        <p>Precio</p>
                        <h3>{card.price}</h3>
                      </div>
                      <button className="btn btn-primary">Ver Paquete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>
    </div>
  );
}

export default OfferCarousel;