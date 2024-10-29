// src/components/Playlist.js
import React, { useEffect, useState } from 'react';
import './Playlist.css'; // Asegúrate de importar tu CSS

const Playlist = () => {
    const [playlist, setPlaylist] = useState(null);

    useEffect(() => {
        const loadPlaylist = async () => {
            try {
                const response = await fetch('/data/playlist.json');
                if (!response.ok) throw new Error('Error al cargar el JSON');
                const data = await response.json();
                setPlaylist(data.playlist);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        loadPlaylist();
    }, []);

    if (!playlist) return <p>Error al cargar la playlist. Intenta de nuevo más tarde.</p>;

    return (
        <div id="playlist-content" className="playlist-container">
            <h2 className="playlist-title"><i className="fa fa-music" aria-hidden="true"></i> Playlist</h2>
            <hr className="divider"/>
            <p className="playlist-description">{playlist.description}</p>

            {/* Nuevo iframe de Spotify */}
            <div className="spotify-embed">
                <iframe
                    style={{borderRadius: '15px'}} /* Bordes redondeados para el iframe */
                    src="https://open.spotify.com/embed/playlist/7xKCQnkp71J9mWwBouhYBq?utm_source=generator&theme=0"
                    width="100%"
                    height="352"
                    frameBorder="0"
                    allowFullScreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                ></iframe>
            </div>

            <ul className="playlist-songs">
                {playlist.songs.map((song, index) => (
                    <li key={index} className="playlist-song">
                        <strong>
                            <a href={song.url} target="_blank" rel="noopener noreferrer">{song.title}</a>
                        </strong><br/>
                        <em>{song.description}</em>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Playlist;
