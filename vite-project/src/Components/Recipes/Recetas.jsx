import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Recetas.css";

export const Recetas = () => {
  const [recetas, setRecetas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/dishes")
      .then((response) => response.json())
      .then((data) => setRecetas(data))
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  const eliminarReceta = (id) => {
    fetch(`http://localhost:3000/dishes/${id}`, { method: "DELETE" })
      .then(() => setRecetas(recetas.filter((receta) => receta.id !== id)))
      .catch((error) => console.error("Error deleting recipe:", error));
  };

  return (
    <div className="recetas-container">
      <h1>Recetas</h1>
      <div className="recetas-list">
        {recetas.map((receta) => (
          <div key={receta.id} className="receta-card">
            <h3>{receta.name}</h3>
            <p>{receta.description}</p>
            <p>{receta.image}</p>
            <Link to={`/details/${receta.id}`}>
              <button>Detalles</button>
            </Link>
            <Link to={`/edit/${receta.id}`}>
              <button>Editar</button>
            </Link>
            <button onClick={() => eliminarReceta(receta.id)}>Eliminar</button>
          </div>
        ))}
      </div>
      <Link to="/agregar">
        <button className="add-recipe-button">Agregar Nueva Receta</button>
      </Link>
    </div>
  );
};
