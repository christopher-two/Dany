import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component'; // Importar el componente de carga perezosa
import './Gallery.css';

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [fullscreenImage, setFullscreenImage] = useState(null); // Estado para la imagen en pantalla completa

    useEffect(() => {
        const loadGallery = async () => {
            try {
                const response = await fetch('/data/img.json');
                if (!response.ok) throw new Error('Error al cargar el JSON');
                const data = await response.json();
                setImages(data.gallery);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        loadGallery();
    }, []);

    const handleImageClick = (image) => {
        setFullscreenImage(image); // Actualiza el estado de la imagen en pantalla completa
    };

    const handleCloseFullscreen = () => {
        setFullscreenImage(null); // Cierra la imagen en pantalla completa
    };

    return (
        <div id="gallery-content">
            <div className="gallery-header">
                <h2>
                    <i className="fa fa-camera"></i> Galería
                </h2>
                <hr className="divider" />
            </div>
            <div className="gallery-grid">
                {images.length > 0 ? (
                    images.map((image, index) => (
                        <LazyLoadImage
                            key={index}
                            src={image}
                            alt="Momento especial"
                            className="gallery-image"
                            onClick={() => handleImageClick(image)} // Maneja el clic en la imagen
                            effect="opacity" // Efecto de aparición suave
                            placeholderSrc="/path/to/placeholder/image.jpg" // Puedes colocar una imagen de carga aquí
                        />
                    ))
                ) : (
                    <p>Error al cargar la galería de fotos. Intenta de nuevo más tarde.</p>
                )}
            </div>

            {fullscreenImage && ( // Condición para mostrar la imagen en pantalla completa
                <div className="fullscreen-overlay" onClick={handleCloseFullscreen}>
                    <img src={fullscreenImage} alt="Imagen Ampliada" className="fullscreen-image" />
                </div>
            )}
        </div>
    );
};

export default Gallery;
