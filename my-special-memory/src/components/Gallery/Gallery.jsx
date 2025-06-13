import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getStorage, ref as storageRef, listAll, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage';
import './Gallery.css';

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [fullscreenImage, setFullscreenImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const storage = getStorage();

    useEffect(() => {
        const fetchImages = async () => {
            const imagesRef = storageRef(storage, 'imagenes');
            try {
                const result = await listAll(imagesRef);
                const urlPromises = result.items.map((itemRef) => getDownloadURL(itemRef));
                const urls = await Promise.all(urlPromises);
                setImages(urls);
            } catch (error) {
                console.error('Error al obtener las URLs de las imágenes:', error);
            }
        };

        fetchImages();
    }, []);

    const handleImageClick = (image) => setFullscreenImage(image);
    const handleCloseFullscreen = () => setFullscreenImage(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleUpload = async (event) => {
        event.preventDefault();
        if (!selectedImage) return;

        const imageRef = storageRef(storage, `imagenes/${selectedImage.name}`);
        await uploadBytes(imageRef, selectedImage);
        const url = await getDownloadURL(imageRef);
        setImages((prevImages) => [...prevImages, url]);
        setSelectedImage(null);
        event.target.reset();
    };

    const handleDelete = async (image) => {
        const imageName = image.split('/').pop(); // Extrae el nombre del archivo
        const imageRef = storageRef(storage, `imagenes/${imageName}`); // Crea la referencia

        try {
            await deleteObject(imageRef); // Elimina el objeto
            setImages((prevImages) => prevImages.filter((img) => img !== image)); // Actualiza el estado
            handleCloseFullscreen(); // Cierra el overlay
            console.log(`Imagen ${imageName} eliminada exitosamente.`); // Confirmación de eliminación
        } catch (error) {
            console.error('Error al eliminar la imagen:', error);
        }
    };

    return (
        <div id="gallery-content">
            <div className="gallery-header">
                <h2>
                    <i className="fa fa-camera"></i> Galería
                </h2>
                <hr className="divider"/>
            </div>

            <form onSubmit={handleUpload} className="gallery-upload-form">
                <label className="custom-file-upload">
                    <input type="file" accept="image/*" onChange={handleFileChange} required />
                    Seleccionar Imagen
                </label>
                <button type="submit" className="gallery-upload-button" disabled={!selectedImage}>
                    Subir Imagen
                </button>
            </form>

            <div className="gallery-grid">
                {images.length > 0 ? (
                    images.map((image, index) => (
                        <LazyLoadImage
                            key={index}
                            src={image}
                            alt="Momento especial"
                            className="gallery-image"
                            onClick={() => handleImageClick(image)}
                            effect="opacity"
                        />
                    ))
                ) : (
                    <p>Error al cargar la galería de fotos. Intenta de nuevo más tarde.</p>
                )}
            </div>

            {fullscreenImage && (
                <div className="fullscreen-overlay" onClick={handleCloseFullscreen}>
                    <img src={fullscreenImage} alt="Imagen Ampliada" className="fullscreen-image"/>
                    <button className="delete-button" onClick={() => handleDelete(fullscreenImage)}>
                        Eliminar
                    </button>
                </div>
            )}
        </div>
    );
};

export default Gallery;
