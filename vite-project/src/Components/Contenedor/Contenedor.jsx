import React from 'react';
import './Contenedor.css';

export const Contenedor = ({ children }) => {
  return (
    <div className="contenedor">
      {children}
    </div>
  );
};

export default Contenedor;
