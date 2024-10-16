import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditRecipe.css"; 

export const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    preparation: "",
    ingredients: "",
    categories: ""
  });

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
      setRecipe(data);
      setFormData({
        name: data.name || "",
        description: data.description || "",
        preparation: data.preparation || "",
        ingredients: data.ingredients ? data.ingredients.join(", ") : "",
        categories: data.categories || ""
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecipeDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/dishes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          ingredients: formData.ingredients.split(",").map((ing) => ing.trim()),
        }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar la receta");
      }
      navigate("/"); 
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Cargando detalles...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="editRecipeContainer">
      <h2>Editar Receta</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Preparación:</label>
          <textarea
            name="preparation"
            value={formData.preparation}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Ingredientes (separados por comas):</label>
          <input
            type="text"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Categorías:</label>
          <input
            type="text"
            name="categories"
            value={formData.categories}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Actualizar Receta</button>
      </form>
    </div>
  );
};

export default EditRecipe;
