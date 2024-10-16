import React from 'react';
import './Card.css';

export const Card = ({ title, description, type, image, onViewDetails, onDelete }) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <p><strong>Tipo:</strong> {type}</p>
        <button onClick={onViewDetails}>Ver detalles</button>
        <button onClick={onDelete}>Eliminar</button>
      </div>
    </div>
  );
};

export default Card;

