import React, { useState, useEffect } from 'react';
import { decodeToken } from 'react-jwt';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './reservas.css';

const ReservasUsuario = () => {
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      const decodedToken = decodeToken(token, 'secret');
      const id = decodedToken.id;
      setUserId(id);
      fetchReservas(id);
    }
  }, []);

  const fetchReservas = async (id) => {
    try {
      const responseReserva = await axios.get(`http://localhost:8080/api/reservas/misreservas/${id}`);

      if (responseReserva.status === 200) {
        // Ordenar las reservas en orden descendente
        const sortedReservas = responseReserva.data.reverse();
        setReservas(sortedReservas);
      } else {
        setError('Error al cargar las reservas.');
      }
    } catch (error) {
      setError('Error al cargar las reservas. Inténtalo de nuevo.');
      console.error('Error al cargar las reservas:', error);
    }
  };

  const handleCancelarReserva = async (idReserva) => {
    const confirmed = window.confirm('¿Está seguro que quiere cancelar la reserva?');
    if (confirmed) {
      try {
        await axios.post(`http://localhost:8080/api/reservas/${idReserva}/cancelarByUsuario`);
        fetchReservas(userId);
      } catch (error) {
        console.error('Error al cancelar la reserva:', error);
      }
    }
  };

  return (
    <div className='reservas-usuario-container'>
      <h1 className='reservas-titulo'>Mis Reservas</h1>
      {error && <p className="reservas-error">{error}</p>}
      <ul className="reservas-lista">
        {reservas.map(reserva => (
          <li key={reserva.id} className="reserva-item">
            <h3 className="reserva-id">Reserva #{reserva.idReserva}</h3>
            <p className='reserva-descripcion'>Cabaña N°{reserva.idCabaña}</p>
            <p className="reserva-fecha">Fecha de Ingreso: {new Date(reserva.fechaInicio).toLocaleDateString()}</p>
            <p className="reserva-fecha">Fecha de Salida: {new Date(reserva.fechaFin).toLocaleDateString()}</p>
            <p className="reserva-descripcion">Cantidad de Personas: {reserva.cantPersonas}</p>
            <p className='reserva-descripcion'>Estado actual: {reserva.estadoActual}</p>
            <p className='reserva-descripcion'>Monto: ${reserva.montoTotal}</p>
            {reserva.estadoActual === 'Finalizada' && (
              <Link to={`/calificar/${reserva.idReserva}`}>
                <button>Calificar</button>
              </Link>
            )}
            {reserva.estadoActual === 'Pendiente' && (
              <button onClick={() => handleCancelarReserva(reserva.idReserva)}>Cancelar</button>
            )}
            {reserva.estadoActual === 'Calificada' && (
              <Link to={`/editar-calificacion/${reserva.idReserva}`}>
                <button>Editar Calificación</button>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservasUsuario;
