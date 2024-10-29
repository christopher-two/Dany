// src/components/BottomNav.js
import React, { useState } from 'react';
import './BottomNav.css'; // Asegúrate de que este archivo sea correcto

const BottomNav = ({ onGalleryClick, onPlaylistClick, onPoemsClick }) => {
    const [activeButton, setActiveButton] = useState('gallery'); // Establece la galería como botón activo por defecto

    const handleGalleryClick = (e) => {
        e.preventDefault();
        setActiveButton('gallery');
        onGalleryClick();
    };

    const handlePlaylistClick = (e) => {
        e.preventDefault();
        setActiveButton('playlist');
        onPlaylistClick();
    };

    const handlePoemsClick = (e) => {
        e.preventDefault();
        setActiveButton('poems');
        onPoemsClick();
    };

    return (
        <nav>
            <a
                href="#"
                onClick={handleGalleryClick}
                className={activeButton === 'gallery' ? 'active' : ''}
            >
                <i className="fa fa-camera" aria-hidden="true"></i> Gallery
            </a>
            <a
                href="#"
                onClick={handlePlaylistClick}
                className={activeButton === 'playlist' ? 'active' : ''}
            >
                <i className="fa fa-music" aria-hidden="true"></i> Playlist
            </a>
            <a
                href="#"
                onClick={handlePoemsClick}
                className={activeButton === 'poems' ? 'active' : ''}
            >
                <i className="fa fa-book" aria-hidden="true"></i> Poems
            </a>
        </nav>
    );
};

export default BottomNav;
