import React, { useState } from "react";
import "./AddRecipes.css";

export const AddRecipes = ({ onAddRecipe }) => {
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [message, setMessage] = useState(""); 

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (recipeName && description) {
      onAddRecipe({ name: recipeName, description, ingredients });
      setRecipeName("");
      setDescription("");
      setIngredients("");
      setMessage("Receta agregada con éxito!"); 
    } else {
      setMessage("Por favor, completa el nombre y la descripción."); 
    }
  };

  return (
    <div className="addRecipeContainer">
      <h2>Agregar Receta</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre de la Receta"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          required
        />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <textarea
          placeholder="Ingredientes (separados por comas)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>
      {message && <p>{message}</p>} 
    </div>
  );
};

export default AddRecipes;
