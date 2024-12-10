import React, { useState, useEffect } from 'react';
import './Moments.css';
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore"; // Importa las funciones necesarias
import { db } from '../../firebaseConfig'; // Asegúrate de que la configuración de Firebase sea correcta

const Moments = () => {
    const [moments, setMoments] = useState([]);
    const [newMoment, setNewMoment] = useState({
        date: '',
        title: '',
        description: '',
        image: ''
    });
    const [showForm, setShowForm] = useState(false); // Para mostrar/ocultar el formulario

    // Definimos fetchMoments fuera del useEffect
    const fetchMoments = async () => {
        const momentsCollection = collection(db, 'moments'); // Referencia a la colección
        const snapshot = await getDocs(momentsCollection); // Obtener documentos
        const momentsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMoments(momentsData);
    };

    // useEffect para cargar momentos al iniciar
    useEffect(() => {
        fetchMoments(); // Llamamos a fetchMoments
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewMoment(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const momentsCollection = collection(db, 'moments'); // Referencia a la colección
            await addDoc(momentsCollection, newMoment); // Agregar el nuevo momento
            setNewMoment({ date: '', title: '', description: '', image: '' }); // Resetear el formulario
            fetchMoments(); // Llamar a fetchMoments para actualizar la lista
        } catch (error) {
            console.error("Error al agregar momento: ", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const momentDoc = doc(db, 'moments', id); // Referencia al documento a eliminar
            await deleteDoc(momentDoc); // Eliminar el documento
            fetchMoments(); // Llamar a fetchMoments para actualizar la lista
        } catch (error) {
            console.error("Error al eliminar momento: ", error);
        }
    };

    return (
        <div>
            <h2 className="moments-title"><i class="fa fa-heart" aria-hidden="true"></i> Moments</h2>
            <div className="divider"></div>
            <div className="moments-container">
                <button className="toggle-form-button" onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Ocultar Formulario' : 'Agregar Momento'}
                </button>
                {showForm && (
                    <form className="moment-form" onSubmit={handleSubmit}>
                        <input type="date" name="date" value={newMoment.date} onChange={handleChange} required/>
                        <input type="text" name="title" placeholder="Título" value={newMoment.title}
                               onChange={handleChange}
                               required/>
                        <textarea name="description" placeholder="Descripción" value={newMoment.description}
                                  onChange={handleChange} required/>
                        <input type="text" name="image" placeholder="URL de Imagen" value={newMoment.image}
                               onChange={handleChange}/>
                        <button type="submit">Agregar Momento</button>
                    </form>
                )}
                <div className="moments-list">
                    {moments.map((moment) => (
                        <div key={moment.id} className="moment-card">
                            <div className="moment-date">{moment.date}</div>
                            <h3 className="moment-title">{moment.title}</h3>
                            <p className="moment-description">{moment.description}</p>
                            {moment.image && <img src={moment.image} alt={moment.title} className="moment-image"/>}
                            <button className="delete-button" onClick={() => handleDelete(moment.id)}>Eliminar</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default Moments;
