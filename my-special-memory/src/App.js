// src/App.js
import React, { useState, useEffect } from 'react';
import './css/styles.css';
import './css/fonts.css';
import Header from './components/Header/Header';
import BottomNav from './components/BottomNav/BottomNav';
import Gallery from './components/Gallery/Gallery';
import Playlist from './components/Playlist/Playlist';
import Poems from './components/Poems/Poems';
import Moments from './components/Moments/Moments';
import Ternurines from './components/TernurinesGallery/TernurinesGallery';
import Welcome from './components/Welcome/Welcome';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import 'font-awesome/css/font-awesome.min.css';

const App = () => {
    const [activeSection, setActiveSection] = useState('welcome');

    useEffect(() => {
        const snowContainer = document.createElement('div');
        snowContainer.classList.add('snow-container');
        document.body.appendChild(snowContainer);

        for (let i = 0; i < 50; i++) { // Ajusta el número de copos
            const snowflake = document.createElement('div');
            snowflake.classList.add('snowflake');
            snowflake.style.left = Math.random() * 100 + 'vw';
            snowflake.style.animationDuration = 5 + Math.random() * 5 + 's'; // Duración aleatoria
            snowflake.style.fontSize = Math.random() * 1.5 + 0.5 + 'em'; // Tamaño aleatorio
            snowflake.textContent = '❄'; // Puedes cambiar este emoji si lo deseas
            snowContainer.appendChild(snowflake);
        }

        return () => {
            document.body.removeChild(snowContainer);
        };
    }, []);

    const onMomentsClick = () => setActiveSection('moments');
    const onTernurinesClick = () => setActiveSection('ternurines');

    return (
        <div className="App">
            <Header />
            <BottomNav
                onGalleryClick={() => setActiveSection('gallery')}
                onPlaylistClick={() => setActiveSection('playlist')}
                onPoemsClick={() => setActiveSection('poems')}
                onMomentsClick={onMomentsClick}
                onTernurinesClick={onTernurinesClick}
            />
            <main>
                {activeSection === 'gallery' && <Gallery />}
                {activeSection === 'playlist' && <Playlist />}
                {activeSection === 'poems' && <Poems />}
                {activeSection === 'moments' && <Moments />}
                {activeSection === 'ternurines' && <Ternurines />}
                {activeSection === 'welcome' && <Welcome />}
            </main>
            <ScrollToTop />
        </div>
    );
};

export default App;
