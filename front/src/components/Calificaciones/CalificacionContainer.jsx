import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calificacion from './Calificacion';
import "./calificacion.css"

const CalificacionContainer = () => {
  const [calificaciones, setCalificaciones] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Realizar la solicitud GET para obtener las calificaciones
    async function fetchCalificaciones() {
      try {
        const response = await axios.get('http://localhost:8080/api/reservas/calificaciones');
        if (response.status === 200) {
          setCalificaciones(response.data);
        } else {
          setError('Error al cargar las calificaciones.');
        }
      } catch (error) {
        setError('Error al cargar las calificaciones. Inténtalo de nuevo.');
        console.error('Error al cargar las calificaciones:', error);
      }
    }

    fetchCalificaciones();
  }, []);

  return (
    <div className="calificaciones-container">
      <h1>Opiniones</h1>
      {error && <p className="calificaciones-error">{error}</p>}
      {calificaciones.map((calificacion) => (
        <Calificacion key={calificacion.id} calificacion={calificacion} />
      ))}
    </div>
  );
};

export default CalificacionContainer;
