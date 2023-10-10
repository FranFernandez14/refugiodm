import React, { useState, useEffect } from 'react';
import { decodeToken } from 'react-jwt';
import UsuarioContainer from '../admin/containers/UsuarioContainer';
import axios from 'axios';
import './reservas.css';
import { Link } from 'react-router-dom';


const ReservasUsuario = () => {
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    

    axios.get('http://localhost:8080/api/reservas')
      .then(response => {
        if (response.status === 200) {
          setReservas(response.data);
        } else {
          setError('Error al cargar las reservas.');
        }
      })
      .catch(error => {
        setError('Error al cargar las reservas. Inténtalo de nuevo.');
        console.error('Error al cargar las reservas:', error);
      });
  }, []);

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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReservasUsuario;