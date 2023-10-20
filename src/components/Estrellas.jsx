// Estrellas.js
import React, { useState } from 'react';
import '../styles/Estrellas.css';

const Estrellas = ({ valoracion, onStarClick, labelId }) => {
  const [hoveredStar, setHoveredStar] = useState(null);
  const totalEstrellas = 5;

  const handleMouseEnter = (index) => {
    setHoveredStar(index);
  };

  const handleMouseLeave = () => {
    setHoveredStar(null);
  };

  const renderEstrellas = () => {
    const estrellas = [];
    for (let i = 1; i <= totalEstrellas; i++) {
      estrellas.push(
        <span
          key={i}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
          onClick={() => onStarClick(i)}
        >
          {i <= (hoveredStar || valoracion) ? (
            <i
              className={`bi bi-star-fill estrella-llena ${i <= hoveredStar ? 'estrella-iluminada' : ''}`}
              id={`${labelId}-star-${i}`} // Use labelId here
            ></i>
          ) : (
            <i className="bi bi-star estrella-vacia"></i>
          )}
        </span>
      );
    }
    return estrellas;
  };

  return <div className="estrellas">{renderEstrellas()}</div>;
};

export default Estrellas;
