import React, { useState, useEffect } from 'react';
import TitleComponent from "../../Components/Title";
import Contenedor from "../../Components/Contenedor";
import Button from '../../Components/Button';
import Tarjeta from "../../Components/Card";
import estilosIndex from "./index.module.css";
import { fetchRecipes, deleteRecipe, addRecipe } from '../../api/api'; 
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const handleDetailsClick = (id) => {
        navigate(`/details/${id}`);
    };

    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [newRecipe, setNewRecipe] = useState({
        title: '',
        description: '',
        ingredients: '',
        instructions: '',
        image: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRecipe((prevRecipe) => ({
            ...prevRecipe,
            [name]: value
        }));
    };
    const handleAddRecipe = async () => {
        try {
            const addedRecipe = await addRecipe(newRecipe); 
            setRecipes([...recipes, addedRecipe]);
            setNewRecipe({ title: '', description: '', ingredients: '', instructions: '', image: '' }); 
            setIsModalOpen(false); 
        } catch (error) {
            alert('Hubo un error al agregar la receta');
        }
    };

    const handleDeleteClick = async (id) => { 
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta receta?');
        if (confirmDelete) {
            try {
                await deleteRecipe(id); 
                setRecipes((prevRecipes) => prevRecipes.filter(recipe => recipe.id !== id));
            } catch (error) {
                alert('Hubo un error al eliminar la receta');
            }
        }
    };

    const [recipes, setRecipes] = useState([]); 

    useEffect(() => {
        const loadRecipes = async () => {
            try {
                const data = await fetchRecipes(); 
                setRecipes(data);
            } catch (error) {
               
            }
        };

        loadRecipes(); 
    }, []);

    return (
        <>
            <TitleComponent children="Recetario" />
            <Contenedor>
                <Button onClickHandler={() => setIsModalOpen(true)}>Agregar receta</Button>
                <div className={estilosIndex.Contenedor}>
                    {recipes.map((recipe) => (
                        <Tarjeta key={recipe.id} title={recipe.title}>
                            <Button onClickHandler={() => handleDetailsClick(recipe.id)}>Detalles</Button>
                            <Button onClickHandler={() => handleDeleteClick(recipe.id)}>Borrar</Button>
                        </Tarjeta>
                    ))}
                </div>
            </Contenedor>

            {/* Modal */}
            {isModalOpen && (
                <div className={estilosIndex.ModalOverlay}>
                    <div className={estilosIndex.ModalContent}>
                        <h2>Agregar Nueva Receta</h2>
                        <div className={estilosIndex.ModalInputs}>
                            <input
                                type="text"
                                name="title"
                                value={newRecipe.title}
                                onChange={handleInputChange}
                                placeholder="Nombre de la receta"
                            />
                            <input
                                type="text"
                                name="description"
                                value={newRecipe.description}
                                onChange={handleInputChange}
                                placeholder="Descripción"
                            />
                            <input
                                type="text"
                                name="ingredients"
                                value={newRecipe.ingredients}
                                onChange={handleInputChange}
                                placeholder="Ingredientes (separados por comas)"
                            />
                            <input
                                type="text"
                                name="instructions"
                                value={newRecipe.instructions}
                                onChange={handleInputChange}
                                placeholder="Instrucciones"
                            />
                            <input
                                type="text"
                                name="image"
                                value={newRecipe.image}
                                onChange={handleInputChange}
                                placeholder="URL de la imagen"
                            />
                        </div>
                        <div className={estilosIndex.ModalButtons}>
                            <Button onClickHandler={handleAddRecipe}>Agregar</Button>
                            <Button onClickHandler={() => setIsModalOpen(false)}>Cancelar</Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default home;
