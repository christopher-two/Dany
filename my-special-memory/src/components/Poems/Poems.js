import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../../firebaseConfig';
import './Poems.css';

const Poems = () => {
    const [poems, setPoems] = useState([]);
    const [expandedPoemIndex, setExpandedPoemIndex] = useState(null); // Estado para el índice del poema expandido

    useEffect(() => {
        const storedPoems = localStorage.getItem('poems');
        if (storedPoems) {
            setPoems(JSON.parse(storedPoems));
        } else {
            const poemsRef = ref(database, 'poems');
            onValue(poemsRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setPoems(data);
                    localStorage.setItem('poems', JSON.stringify(data));
                } else {
                    console.error('No se encontraron los poemas en la base de datos');
                }
            });
        }
    }, []);

    const toggleExpandPoem = (index) => {
        // Alternar entre expandir y colapsar el poema seleccionado
        setExpandedPoemIndex(expandedPoemIndex === index ? null : index);
    };

    return (
        <div id="poems-content">
            <h2>
                <i className="fa fa-book" aria-hidden="true"></i> Poems
            </h2>
            <hr className="divider" />
            <div className="poems-grid">
                {poems.length > 0 ? (
                    poems.map((poem, index) => (
                        <div
                            key={index}
                            className={`poem-card ${expandedPoemIndex === index ? 'expanded' : ''}`} // Añade la clase "expanded" si el poema está expandido
                            onClick={() => toggleExpandPoem(index)}
                        >
                            <h3>{poem.title}</h3>
                            {expandedPoemIndex === index ? (
                                <p className="poem-full">{poem.text}</p>
                            ) : (
                                <p className="poem-excerpt">{poem.text.split('\n')[0]}...</p>
                            )}
                            <p className="poem-author">- {poem.author}</p>
                        </div>
                    ))
                ) : (
                    <p>Error al cargar los poemas. Intenta de nuevo más tarde.</p>
                )}
            </div>
        </div>
    );
};

export default Poems;