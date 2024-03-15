import React, { useState, useEffect } from 'react';
import Reserva from '../../admin/Reserva';
import axios from 'axios';
import Sidebar from '../Sidebar';
import '../admin.css';
import { Link } from 'react-router-dom';

const ReservaContainer = () => {
  const [reservas, setReservas] = useState([]);
  const [estadoReserva, setEstadoReserva] = useState("");
  const [fechaFinal, setFechaFinal] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');

  const fetchReservasByState = async (estado, fechaInicio, fechaFin) => {
    try {
      console.log("Hola");
      const response = await axios.get('http://localhost:8080/api/reservas/byState', {
        params: {
          estado: estado,
          fechaInicio: fechaInicio,
          fechaFin: fechaFin
        }
      });
      setReservas(response.data.content);
      setEstadoReserva(estado);
    } catch (error) {
      console.error('Error fetching reservas by state:', error);
    }
  };

  useEffect(() => {
    fetchReservasByState("", "", ""); // Carga inicialmente todas las reservas
  }, []);

  return (
    <div className='admin-container'>
      <Sidebar />
      <div className='admin-right-content'>
        <div id='reserva-buttons'>
          <div>
            <Link onClick={() => fetchReservasByState(5, fechaInicio, fechaFinal)}>Ver reservas pendientes</Link>
          </div>
          <div>
            <Link onClick={() => fetchReservasByState(1, fechaInicio, fechaFinal)}>Ver reservas canceladas</Link>
          </div>
          <div>
            <Link onClick={() => fetchReservasByState(4, fechaInicio, fechaFinal)}>Ver reservas aceptadas</Link>
          </div>
          <div>
            <Link onClick={() => fetchReservasByState(7, fechaInicio, fechaFinal)}>Ver reservas iniciadas</Link>
          </div>
          <div>
            <Link onClick={() => fetchReservasByState(6, fechaInicio, fechaFinal)}>Ver reservas finalizadas</Link>
          </div>
        </div>
        <div className='filtroFecha'>
          <div className='Filtro'>
            <label htmlFor="FechaInicio">Fecha de Inicio:</label>
            <input type="date" id="FechaInicio" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
          </div>
          <div className='Filtro'>
            <label htmlFor="FechaFin">Fecha de Fin:</label>
            <input type="date" id="FechaFin" value={fechaFinal} onChange={(e) => setFechaFinal(e.target.value)} />
          </div>
        </div>
        <Reserva reservas={reservas} estadoReserva={estadoReserva} />
      </div>
    </div>
  );
};

export default ReservaContainer;
