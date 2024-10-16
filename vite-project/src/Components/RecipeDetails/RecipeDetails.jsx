import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./RecipeDetails.css";

export const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecipeDetails = async (id) => {
    const response = await fetch(`http://localhost:3000/dishes/${id}`);
    if (!response.ok) {
      throw new Error("Error al obtener los detalles de la receta");
    }
    return response.json();
  };

  const loadRecipeDetails = async () => {
    try {
      const data = await fetchRecipeDetails(id);
      setRecipeDetails(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecipeDetails();
  }, [id]);

  const handleVolverHome = () => {
    navigate("/");
  };

  if (loading) {
    return <div>Cargando detalles...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!recipeDetails) {
    return <div>No se encontraron detalles para esta receta.</div>;
  }

  return (
    <div className="detailsContainer">
      <button className="backButton" onClick={handleVolverHome}>
        Atrás
      </button>
      <div className="detailsContent">
        <h2>Nombre de la receta: {recipeDetails.name || "Sin título"}</h2>
        <p>Descripción: {recipeDetails.description || "Sin descripción"}</p>
        <p>Preparación: {recipeDetails.preparation || "Sin información"}</p>
        <p>
          Ingredientes:{" "}
          {recipeDetails.ingredients
            ? recipeDetails.ingredients.join(", ")
            : "Sin ingredientes"}
        </p>
        <p>Categorías: {recipeDetails.categories || "Sin categorías"}</p>
      </div>
    </div>
  );
};

export default RecipeDetails;
