// src/components/Welcome.js
import React from 'react';
import './Welcome.css';

const Welcome = () => {
    return (
        <div id="welcome-div" className="welcome-div">
            <h1 className="welcome-title">¡Bienvenida a nuestra App!</h1>
            <p className="welcome-message">
                En nuestra web, encontrarás diversas secciones para explorar y disfrutar:
            </p>
            <ul className="section-list">
                <li className="fade-in">🎨 <strong>Galería:</strong> Un espacio para ver nuestras fotos.</li>
                <li className="fade-in">🎶 <strong>Playlists:</strong> Selecciones musicales que iré creando con el tiempo.</li>
                <li className="fade-in">📜 <strong>Poemas:</strong> Una colección de poemas que me gustan y que me recuerdan a ti.</li>
            </ul>
            <p className="welcome-message">
                ¡Y esto es solo el comienzo! Pronto añadiremos más secciones y actualizaciones emocionantes.
            </p>
        </div>
    );
};

export default Welcome;
