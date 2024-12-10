// src/components/BottomNav/BottomNav.js
import React, { useState } from 'react';
import './BottomNav.css';

const BottomNav = ({ onGalleryClick, onPlaylistClick, onPoemsClick, onMomentsClick, onTernurinesClick }) => {
    const [activeButton, setActiveButton] = useState('gallery');

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

    const handleMomentsClick = (e) => {
        e.preventDefault();
        setActiveButton('moments');
        onMomentsClick();
    };

    const handleTernurinesClick = (e) => {
        e.preventDefault();
        setActiveButton('ternurines');
        onTernurinesClick();
    };

    return (
        <nav>
            <a href="#" onClick={handleGalleryClick} className={activeButton === 'gallery' ? 'active' : ''}>
                <i className="fa fa-camera" aria-hidden="true"></i> Gallery
            </a>
            <a href="#" onClick={handleTernurinesClick} className={activeButton === 'ternurines' ? 'active' : ''}>
                <i className="fa fa-paw" aria-hidden="true"></i> Ternurines
            </a>
            <a href="#" onClick={handlePlaylistClick} className={activeButton === 'playlist' ? 'active' : ''}>
                <i className="fa fa-music" aria-hidden="true"></i> Playlist
            </a>
            <a href="#" onClick={handlePoemsClick} className={activeButton === 'poems' ? 'active' : ''}>
                <i className="fa fa-book" aria-hidden="true"></i> Poems
            </a>
            <a href="#" onClick={handleMomentsClick} className={activeButton === 'moments' ? 'active' : ''}>
                <i className="fa fa-heart" aria-hidden="true"></i> Moments
            </a>
        </nav>
    );
};

export default BottomNav;
