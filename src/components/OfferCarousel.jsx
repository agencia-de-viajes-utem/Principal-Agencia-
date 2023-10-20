import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/OfferCarousel.css';

function OfferCarouesel() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch('src/mocks/tarjetas.json')
      .then((response) => response.json())
      .then((data) => setCards(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  

  const chunkArray = (arr, chunkSize) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArray.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArray;
  };

  const calculateCardsToShow = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1600) {
      return 4;
    }else if (screenWidth >= 1300) {
      
      return 3;
    } else if (screenWidth >= 1043) {
      return 2;
    } else  {
    
      return 1;
    }
  };

  const chunkedCards = chunkArray(cards,calculateCardsToShow());

  return (
    <div className="offer mx-auto mt-5 " style={{ }}>
      <div id="myCarousel" className="carousel slide mx-auto" data-bs-ride="carousel"style={{width: "90vw"}}>
        <div className="carousel-inner " role="listbox">
          {chunkedCards.map((cardGroup, groupIndex) => (
            <div
              key={`carousel-item-${groupIndex}`}
              className={`carousel-item ${groupIndex === 0 ? 'active' : ''}`}>
              <div className="row">
                {cardGroup.map((card, index) => (
                <div key={card.id} className="col-12 col-md-2 col-ms-5 mt-2 mb-2 mx-auto" style={{}}>
                    <div className="card mb-2"
                      style={{
                        width: '300px', // Ancho completo para todos los tamaños de pantalla
                        height: '95%', // Altura máxima para ocupar todo el espacio disponible
                        borderRadius: '8px',
                       
                      }}
                    >
                      <img
                        src={card.imageSrc}
                        alt={card.title}
                        className="card-img-top"
                        style={{
                          Height: '200px',
                          maxWidth: '100%',
                        }}
                      />
                      <div className="card-body">
                        <div className="Package-info">
                          <div className='cardtop d-flex'>
                            <p style={{ backgroundColor: "#E17700", borderRadius: "10px", width: "90px", textAlign: "center" }}>Ida+Vuelta </p>
                            <p style={{ backgroundColor: "#023047", borderRadius: "10px", width: "100px", textAlign: "center", color: "white" }}> {card.description} </p>
                          </div>
                        </div>
                        <h2 className="card-title"> {card.title} </h2>
                        <div className='Information'>
                          <p>Precio</p>
                          <h3>{card.price}</h3>
                          <p style={{ fontSize: '14px' }}> Duración: {card.startDate} - {card.endDate}</p>
                        </div>
                        <button className="btn btn-primary">Ver Paquete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div >
        <button className="carousel-control-prev d-none d-sm-block " type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
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

export default OfferCarouesel;