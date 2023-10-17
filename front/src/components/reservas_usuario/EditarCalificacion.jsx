import React, { useState, useEffect } from 'react';
import ReactStars from 'react-rating-stars-component';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditarCalificacion = () => {
  const { idReserva } = useParams();
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [error, setError] = useState('');
  const [originalRating, setOriginalRating] = useState(0);
  const [originalReview, setOriginalReview] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Obtener la calificación y reseña existentes
    async function fetchCalificacion() {
      try {
        const response = await axios.get(`http://localhost:8080/api/reservas/calificaciones/${idReserva}`);
        if (response.status === 200) {
          const data = response.data;
          setOriginalRating(data.puntaje);
          setRating(data.puntaje); // Actualiza el estado con el valor obtenido
          setOriginalReview(data.reseña);
          setReview(data.reseña);
        } else {
          setError('Error al obtener la calificación.');
        }
        setIsLoading(false); // Marcamos que los datos se han cargado
      } catch (error) {
        setError('Error al obtener la calificación. Inténtalo de nuevo.');
        console.error('Error al obtener la calificación:', error);
        setIsLoading(false); // Marcar que los datos no se pudieron cargar
      }
    }

    fetchCalificacion();
  }, [idReserva]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleGuardar = async () => {
    try {
        const response = await axios.put(`http://localhost:8080/api/reservas/calificaciones/editar/${idReserva}`, {
          puntaje: rating,
          reseña: review,
        });
  
        if (response.status === 200) {
          navigate('/reservas');
        } else {
          setError('Error al guardar la calificación.');
        }
      } catch (error) {
        setError('Error al guardar la calificación. Inténtalo de nuevo.');
        console.error('Error al guardar la calificación:', error);
      }
  };

  const handleCancelar = () => {
    navigate('/reservas');
  };

  return (
    <div>
      <h1>Editar Calificación</h1>
      {isLoading ? (
        <p>Cargando datos...</p>
      ) : (
        <div>
          <div>
            <label>Calificación:</label>
            <ReactStars
              count={5}
              value={rating} // Usar el estado rating para el valor
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
              style={{ resize: 'none' }}
            />
          </div>
          <div>
            <button onClick={handleGuardar}>Guardar</button>
            <button onClick={handleCancelar}>Cancelar</button>
          </div>
          {error && <p>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default EditarCalificacion;