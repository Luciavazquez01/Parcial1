import React from 'react';
import estilos from './Title.css';

export const Title = () => {
    return (
        <div className={estilos.titleContainer}>
            <h1 className={estilos.title}>Recetas</h1>
        </div>
    );
};

export default Title;
