// src/components/ScrollToTop.js
import React, { useEffect, useState } from 'react';
import './ScrollToTop.css'; // Crear un archivo CSS para estilos

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) { // Cambia este valor según sea necesario
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Desplazamiento suave
        });
    };

    return (
        <button
            className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
            onClick={scrollToTop}
            aria-label="Volver arriba"
        >
            <i className="fa fa-arrow-circle-o-up" aria-hidden="true"></i>
        </button>
    );
};

export default ScrollToTop;
