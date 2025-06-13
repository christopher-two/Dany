// src/components/Header.js
import React, {useEffect, useState} from 'react';
import './Header.css'; // Archivo CSS para estilos adicionales

const quotes = ["🎅 Merry Christmas!", "🎄 Feliz Navidad, amor", "✨ La magia está en ti", "🎁 Eres mi mejor regalo", "Love", "dannonino", "niña sandia", "hermosa"];
const backgrounds = [
    'https://img.freepik.com/foto-gratis/hermoso-brillante-amor-simbolo_1418-3.jpg?t=st=1733808636~exp=1733812236~hmac=4fb197b2204cb7f0b51a139e104917a5690ed1c66f437f9c7ed7d94df497b0a3&w=1060',
    'https://img.freepik.com/foto-gratis/bola-arbol-navidad-rojo-vista-superior-mesa-aislada-roja_140725-137706.jpg?t=st=1733808673~exp=1733812273~hmac=bb74d941b2f5a81a112e91cb8a89ac80bd21bcc2cc71503ac4ce4d98a800f985&w=1060',
    'https://img.freepik.com/foto-gratis/regalo-rojo-corazon-luces_23-2147591271.jpg?t=st=1733808779~exp=1733812379~hmac=f9fad039d89aa7daf6cc73018136eb13951fa5fca9a2547dc532260450ae30ac&w=1060'
];

const Header = () => {
    const [currentQuote, setCurrentQuote] = useState(0);
    const [currentBackground, setCurrentBackground] = useState(0);

    useEffect(() => {
        const quoteInterval = setInterval(() => {
            setCurrentQuote((prevQuote) => (prevQuote + 1) % quotes.length);
        }, 3000); // Cambia cada 3 segundos

        const backgroundInterval = setInterval(() => {
            setCurrentBackground((prevBackground) => (prevBackground + 1) % backgrounds.length);
        }, 6000); // Cambia el fondo cada 5 segundos

        return () => {
            clearInterval(quoteInterval);
            clearInterval(backgroundInterval);
        }; // Limpia los intervalos al desmontar el componente
    }, []);

    return (
        <header
            style={{
                backgroundImage: `url(${backgrounds[currentBackground]})`,
            }}
            className="responsive-header"
        >
            <h1>🎄 Bienvenida, Dany 🎄</h1>
            <p>
                ¡Hola, mi amor! Este es nuestro rincón especial, ahora lleno del espíritu navideño. Aquí compartimos no
                solo
                nuestras memorias, sino también toda la magia y amor que hacen esta temporada tan especial. 💖
            </p>
            <div className="social-icons">
                <a href="https://www.facebook.com/lolo.vfg/" target="_blank" rel="noopener noreferrer">
                    <i className="fa fa-facebook"></i>
                </a>
                <a href="https://www.instagram.com/christopher_two_/" target="_blank" rel="noopener noreferrer">
                    <i className="fa fa-instagram"></i>
                </a>
            </div>
            <div className="background-quotes">{quotes[currentQuote]}</div>
        </header>
    );
};

export default Header;
