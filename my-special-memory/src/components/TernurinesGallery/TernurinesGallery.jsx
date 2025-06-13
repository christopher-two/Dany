import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ref, getDownloadURL, listAll, uploadBytes, deleteObject } from 'firebase/storage';
import { storage } from '../../firebaseConfig';
import './TernurinesGallery.css';

const TernurinesGallery = () => {
    const [images, setImages] = useState([]);
    const [fullscreenImage, setFullscreenImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            const ternurinesRef = ref(storage, 'ternurines');
            const result = await listAll(ternurinesRef);
            const urls = await Promise.all(result.items.map((item) => getDownloadURL(item)));
            setImages(urls);
        };

        fetchImages();
    }, []);

    const handleImageClick = (image) => {
        setFullscreenImage(image);
    };

    const handleCloseFullscreen = () => {
        setFullscreenImage(null);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleUpload = async (event) => {
        event.preventDefault();
        if (!selectedImage) return;

        const imageRef = ref(storage, `ternurines/${selectedImage.name}`);
        await uploadBytes(imageRef, selectedImage);

        const url = await getDownloadURL(imageRef);
        setImages((prevImages) => [...prevImages, url]);

        setSelectedImage(null);
        event.target.reset();
    };

    const handleDelete = async (image) => {
        const imageName = image.split('/').pop().split('?')[0];
        const imageRef = ref(storage, `ternurines/${imageName}`);

        await deleteObject(imageRef);
        setImages((prevImages) => prevImages.filter((img) => img !== image));
        handleCloseFullscreen();
    };

    return (
        <div id="ternurines-gallery-container">
            <div className="ternurines-header">
                <h2><i className="fa fa-paw" aria-hidden="true"></i> Ternurines</h2>
                <hr className="ternurines-divider" />
            </div>

            <form onSubmit={handleUpload} className="ternurines-upload-form">
                <label className="custom-file-upload">
                    <input type="file" accept="image/*" onChange={handleFileChange} required />
                    Seleccionar Imagen
                </label>
                <button type="submit" className="ternurines-upload-button" disabled={!selectedImage}>
                    Subir Imagen
                </button>
            </form>

            <div className="ternurines-gallery-grid">
                {images.length > 0 ? (
                    images.map((image, index) => (
                        <LazyLoadImage
                            key={index}
                            src={image}
                            alt="Adorable Moment"
                            className="ternurines-gallery-image"
                            onClick={() => handleImageClick(image)}
                            effect="opacity"
                        />
                    ))
                ) : (
                    <p>Cargando ternurines...</p>
                )}
            </div>

            {fullscreenImage && (
                <div className="ternurines-fullscreen-overlay" onClick={handleCloseFullscreen}>
                    <img src={fullscreenImage} alt="Imagen Ampliada" className="ternurines-fullscreen-image" />
                    <button className="ternurines-delete-button" onClick={() => handleDelete(fullscreenImage)}>
                        Eliminar
                    </button>
                </div>
            )}
        </div>
    );
};

export default TernurinesGallery;
