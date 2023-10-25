import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/OfferCarousel.css';
import Carousel from 'react-bootstrap/Carousel';

function OfferCarousel() {
  const [cards, setCards] = useState([]);
  const [cardsToShow, setCardsToShow] = useState(4);

  useEffect(() => {
    const updateCardsToShow = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth >= 1600) {
        setCardsToShow(4);
      } else if (screenWidth >= 1300) {
        setCardsToShow(3);
      } else if (screenWidth >= 1043) {
        setCardsToShow(2);
      } else {
        setCardsToShow(1);
      }
    };

    window.addEventListener('resize', updateCardsToShow);
    updateCardsToShow();

    return () => {
      window.removeEventListener('resize', updateCardsToShow);
    };
  }, []);

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

  const chunkedCards = chunkArray(cards, cardsToShow);

  return (
    <div className="offer mt-5">
      <h1>Destacados</h1>
      <div className="container">
        <Carousel interval={null}>
        {chunkedCards.map((cardGroup, groupIndex) => (
  <Carousel.Item key={`carousel-item-${groupIndex}`}>
    <div className="row justify-content-center">
                {cardGroup.map((card) => (
                 <div key={card.id} className={`col-md-${12 / cardsToShow} col-sm-6 mt-2 mb-2`}>
                    <div className="card mb-2" style={{ height: '100%' }}>
                      <img src={card.imageSrc} alt={card.title} className="card-img-top" />
                      <div className="card-body">
                        <div className="Package-info">
                          <div className="d-flex justify-content-between">
                            <div className="bg-secondary text-white rounded p-2 ida">Ida+Vuelta</div>
                            <div className="bg-primary text-white rounded p-2">{card.description}</div>
                          </div>
                        </div>
                        <h2 className="card-title">{card.title}</h2>
                        <div className="Information">
                          <p>Precio</p>
                          <h3>{card.price}</h3>
                          <p style={{ fontSize: '14px' }}>
                            Duración: {card.startDate} - {card.endDate}
                          </p>
                        </div>
                        <button className="btn btn-primary btn-card">Ver Paquete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default OfferCarousel;
