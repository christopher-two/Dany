import React, {useEffect, useState} from 'react';
import './Poems.css';

const Poems = () => {
    const [poems, setPoems] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null); // Estado para manejar la expansión

    useEffect(() => {
        const loadPoems = async () => {
            try {
                const response = await fetch('/data/poems.json');
                if (!response.ok) throw new Error('Error al cargar el JSON');
                const data = await response.json();
                setPoems(data.poems);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        loadPoems();
    }, []);

    const handleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index); // Alterna entre expandir y colapsar
    };

    return (
        <div id="poems-content" className="poems-container">
            <h2>
                <i className="fa fa-book" aria-hidden="true"></i> Poems
            </h2>
            <hr className="divider"/>
            <div id="poems-content" className="poems-grid">
                {poems.length > 0 ? (
                    poems.map((poem, index) => (
                        <div
                            key={index}
                            className={`poem-card ${expandedIndex === index ? 'expanded' : ''}`}
                            onClick={() => handleExpand(index)} // Maneja el clic para expandir
                        >
                            <h3>{poem.title}</h3>
                            <p className="poem-excerpt">{poem.text.split('\n')[0]}...</p>
                            <p className="poem-author">- {poem.author}</p>
                            {expandedIndex === index && (
                                <div className="poem-full">
                                    <p dangerouslySetInnerHTML={{__html: poem.text.replace(/\n/g, '<br>')}}></p>
                                </div>
                            )}
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