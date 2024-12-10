import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../../firebaseConfig';
import './Playlist.css';

const Playlist = () => {
    const [playlist, setPlaylist] = useState(null);

    useEffect(() => {
        const storedPlaylist = localStorage.getItem('playlist');

        if (storedPlaylist) {
            // Si hay datos en localStorage, los cargamos directamente
            setPlaylist(JSON.parse(storedPlaylist));
        } else {
            // Si no hay datos en localStorage, los obtenemos de Firebase y los guardamos
            const playlistRef = ref(database, 'playlist');

            onValue(playlistRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setPlaylist(data);
                    localStorage.setItem('playlist', JSON.stringify(data)); // Guardamos los datos en localStorage
                } else {
                    console.error('No se encontró la playlist en la base de datos');
                }
            });
        }
    }, []);

    if (!playlist) return <p>Error al cargar la playlist. Intenta de nuevo más tarde.</p>;

    return (
        <div id="playlist-content" className="playlist-container">
            <h2 className="playlist-title"><i className="fa fa-music" aria-hidden="true"></i> Playlist</h2>
            <hr className="divider"/>
            <p className="playlist-description">{playlist.description}</p>

            <div className="spotify-embed">
                <iframe
                    style={{ borderRadius: '15px' }}
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
