import React, { useState, useEffect } from 'react';
import './Header.css'; // Asegúrate de tener un archivo CSS para estilos adicionales

const quotes = ["Love", "dannonino", "niña sandia", "hermosa"];

const Header = () => {
    const [currentQuote, setCurrentQuote] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentQuote((prevQuote) => (prevQuote + 1) % quotes.length);
        }, 2000); // Cambia cada 2 segundos

        return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
    }, []);

    return (
        <header>
            <h1>Welcome, Dany</h1>
            <p>
                Welcome to our special corner! This is a space dedicated to celebrating our relationship over the years,
                where every memory and shared moment comes to life. Here, we cherish the laughter, the hugs, and the
                adventures we've experienced together, creating a mosaic of love and connection that unites us. Enjoy this
                journey through our story, a testament to everything we’ve built together.
            </p>
            <div className="social-icons">
                <a href="https://www.facebook.com/lolo.vfg/" target="_blank" rel="noopener noreferrer">
                    <i className="fa fa-facebook"></i>
                </a>
                <a href="https://www.instagram.com/christopher_two_/" target="_blank" rel="noopener noreferrer">
                    <i className="fa fa-instagram"></i>
                </a>
            </div>
            <div className="background-quotes">{quotes[currentQuote]}</div> {/* Clase corregida */}
        </header>
    );
};

export default Header;
