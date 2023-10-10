import React, { useState, useEffect } from 'react';
import { decodeToken } from 'react-jwt';
import axios from 'axios';
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
    const responseReserva = await axios.get(`http://localhost:8080/api/reservas/misreservas/${id}`)
      .then(responseReserva => {
        if (responseReserva.status === 200) {
          setReservas(responseReserva.data);
        } else {
          setError('Error al cargar las reservas.');
        }
      })
      .catch(error => {
        setError('Error al cargar las reservas. Inténtalo de nuevo.');
        console.error('Error al cargar las reservas:', error);
      });
  };

  return (
    <div className='reservas-usuario-container'>
      <h1 className='reservas-titulo'>Mis Reservas</h1>
      {error && <p className="reservas-error">{error}</p>}
      {reservas.length === 0 ? (
        <p className="reservas-vacias">No tienes reservas aún.</p>
      ) : (
        <ul className="reservas-lista">
          {reservas.map(reserva => (
            <li key={reserva.id} className="reserva-item">
              <h3 className="reserva-id">Reserva #{reserva.idReserva}</h3>
              <p className="reserva-fecha">Fecha de Ingreso: {new Date(reserva.fechaInicio).toLocaleDateString()}</p>
              <p className="reserva-fecha">Fecha de Salida: {new Date(reserva.fechaFin).toLocaleDateString()}</p>
              <p className="reserva-descripcion">Cantidad de Personas: {reserva.cantPersonas}</p>
              <button>Calificar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReservasUsuario;