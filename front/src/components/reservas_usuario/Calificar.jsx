import React, { useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Calificar = () => {
  const { idReserva } = useParams();
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [error, setError] = useState('');

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/api/reservas/calificaciones/calificar/${idReserva}`, {
        puntaje: rating, // Agrega el campo puntaje
        reseña: review, // Agrega el campo reseña
      });

      if (response.status === 200) {
        navigate('/reservas');
      } else {
        setError('Error al enviar la reseña.');
      }
    } catch (error) {
      setError('Error al enviar la reseña. Inténtalo de nuevo.');
      console.error('Error al enviar la reseña:', error);
    }
  };

  return (
    <div>
      <h1>Calificar Servicio</h1>
      <div>
        <label>Calificación:</label>
        <ReactStars
          count={5}
          onChange={handleRatingChange}
          size={24}
          activeColor="#ffd700"
        />
      </div>
      <div>
        <label>Reseña:</label>
        <textarea
          rows="4"
          cols="50"
          value={review}
          onChange={handleReviewChange}
          style={{ resize: 'none' }} // Hace que el recuadro de texto no sea redimensionable
        />
      </div>
      <button onClick={handleSubmit}>Enviar reseña</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Calificar;
