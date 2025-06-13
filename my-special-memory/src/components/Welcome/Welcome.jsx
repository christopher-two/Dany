// src/components/Welcome.js
import React from 'react';
import './Welcome.css';

const Welcome = () => {
    return (
        <div id="welcome-div" className="welcome-div">
            <h1 className="welcome-title">🎄 ¡Feliz Navidad! 🎄</h1>
            <p className="welcome-message">
                Bienvenida a nuestra web navideña, un rincón especial creado con mucho amor para celebrar esta mágica temporada contigo:
            </p>
            <ul className="section-list">
                <li className="fade-in">🎁 <strong>Regalos de Recuerdos:</strong> Un espacio para revivir nuestras fotos más especiales.</li>
                <li className="fade-in">🎶 <strong>Villancicos:</strong> Una selección musical para ambientar esta Navidad.</li>
                <li className="fade-in">📜 <strong>Cartas y Poemas:</strong> Mis palabras más sinceras para ti, inspiradas por la magia navideña.</li>
                <li className="fade-in">✨ <strong>Ternurines Navideños:</strong> Comparte y descubre nuestras ternuritas más adorables con un toque navideño.</li>
                <li className="fade-in">🎇 <strong>Momentos Brillantes:</strong> Una colección de recuerdos de nuestras mejores experiencias juntos.</li>
            </ul>
            <p className="welcome-message">
                Esta página está hecha con todo mi cariño para hacer de esta Navidad un momento inolvidable. ¡Espero que te guste y la disfrutes tanto como yo al crearla!
            </p>
        </div>
    );
};

export default Welcome;
