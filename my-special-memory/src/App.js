// src/App.js
import React, {useState} from 'react';
import './css/styles.css'
import './css/fonts.css'
import './css/styles.css'
import Header from './components/Header/Header';
import BottomNav from './components/BottomNav/BottomNav';
import Gallery from './components/Gallery/Gallery';
import Playlist from './components/Playlist/Playlist';
import Poems from './components/Poems/Poems';
import Welcome from './components/Welcome/Welcome';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import 'font-awesome/css/font-awesome.min.css';

const App = () => {
    const [activeSection, setActiveSection] = useState('welcome');

    return (
        <div className="App">
            <Header/>
            <BottomNav
                onGalleryClick={() => setActiveSection('gallery')}
                onPlaylistClick={() => setActiveSection('playlist')}
                onPoemsClick={() => setActiveSection('poems')}
            />
            <main>
                {activeSection === 'gallery' && <Gallery/>}
                {activeSection === 'playlist' && <Playlist/>}
                {activeSection === 'poems' && <Poems/>}
                {activeSection === 'welcome' && <Welcome/>}
            </main>
            <ScrollToTop />
        </div>
    );
};

export default App;
