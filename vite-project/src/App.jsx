import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecipeDetails } from "./Components/RecipeDetails/RecipeDetails";
import { Recetas } from "./Components/Recipes/Recetas";
import { AddRecipes } from "./Components/AddRecipes/AddRecipes";
import { EditRecipe } from "./Components/EditRecipe/EditRecipe"; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Recetas />} />
        <Route path="/details/:id" element={<RecipeDetails />} />
        <Route path="/agregar" element={<AddRecipes />} />
        <Route path="/edit/:id" element={<EditRecipe />} /> 
      </Routes>
    </Router>
  );
};

export default App;
