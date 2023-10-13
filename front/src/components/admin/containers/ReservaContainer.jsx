import React, { useState, useEffect } from 'react';
import Reserva from '../../admin/Reserva';
import axios from 'axios';
import Sidebar from '../Sidebar';
import '../admin.css';
import { Link } from 'react-router-dom';

const ReservaContainer = () => {
  const [reservas, setReservas] = useState([]);
  const [estadoReserva, setEstadoReserva] = useState(""); // Estado actual de las reservas

  const fetchReservas = async (estado) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/reservas/${estado}`);
      setReservas(response.data);
      setEstadoReserva(estado); // Actualiza el estado de reserva
    } catch (error) {
      console.error('Error fetching reservas:', error);
    }
  };

  useEffect(() => {
    fetchReservas("pendientes"); // Carga inicialmente las reservas pendientes
  }, []);

  return (
    <div className='admin-container'>

      <Sidebar />
      <div className='admin-right-content'>
        <div id='reserva-buttons'>
          <div>
            <Link onClick={() => fetchReservas("pendientes")}>Ver reservas pendientes</Link>
          </div>
          <div>
            <Link onClick={() => fetchReservas("canceladas")}>Ver reservas canceladas</Link>
          </div>
          <div>
            <Link onClick={() => fetchReservas("aceptadas")}>Ver reservas aceptadas</Link>
          </div>
          <div>
            <Link onClick={() => fetchReservas("iniciadas")}>Ver reservas iniciadas</Link>
          </div>
          <div>
            <Link onClick={() => fetchReservas("finalizadas")}>Ver reservas finalizadas</Link>
          </div>
        </div>
        <Reserva reservas={reservas} estadoReserva={estadoReserva} />
      </div>
    </div>

  );
};

export default ReservaContainer;
