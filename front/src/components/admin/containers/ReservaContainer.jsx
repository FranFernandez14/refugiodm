import React, { useState, useEffect } from 'react';
import Reserva from '../../admin/Reserva';
import axios from 'axios';
import Sidebar from '../Sidebar';
import '../admin.css';
import { Link } from 'react-router-dom';

const ReservaContainer = () => {
  const [reservas, setReservas] = useState([]);
  const [estadoReserva, setEstadoReserva] = useState(5);
  const [fechaFinal, setFechaFinal] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const fetchReservasByState = async (estado, fechaInicio, fechaFin, page) => {
    try {
      const response = await axios.get('http://localhost:8080/api/reservas/byState', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }, {
        params: {
          estado: estado,
          fechaInicio: fechaInicio,
          fechaFin: fechaFin,
         // page: page,
          size: 10
        }
      });
      setReservas(response.data.content);
      setEstadoReserva(estado);
    } catch (error) {
      console.error('Error fetching reservas by state:', error);
    }
  };

  useEffect(() => {
    fetchReservasByState("", "", "", currentPage); // Cargar inicialmente las reservas de la página 1
  }, [currentPage]); // Ejecutar cuando currentPage cambia

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1); // Ir a la página anterior
    }
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1); // Ir a la página siguiente
  };

  return (
    <div className='admin-container'>
      <Sidebar />
      <div className='admin-right-content'>
        <div id='reserva-buttons'>
          <div>
            <Link onClick={() => fetchReservasByState(5, fechaInicio, fechaFinal, currentPage)}>Ver reservas pendientes</Link>
          </div>
          <div>
            <Link onClick={() => fetchReservasByState(1, fechaInicio, fechaFinal, currentPage)}>Ver reservas canceladas</Link>
          </div>
          <div>
            <Link onClick={() => fetchReservasByState(4, fechaInicio, fechaFinal, currentPage)}>Ver reservas aceptadas</Link>
          </div>
          <div>
            <Link onClick={() => fetchReservasByState(7, fechaInicio, fechaFinal, currentPage)}>Ver reservas iniciadas</Link>
          </div>
          <div>
            <Link onClick={() => fetchReservasByState(6, fechaInicio, fechaFinal, currentPage)}>Ver reservas finalizadas</Link>
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
        <div className='numPagina'>
          <button onClick={goToPreviousPage}>Anterior</button> {/* Botón para ir a la página anterior */}
          <span>Página {currentPage}</span> {/* Mostrar el número de página actual */}
          <button onClick={goToNextPage}>Siguiente</button> {/* Botón para ir a la página siguiente */}
        </div>
      </div>
    </div>
  );
};

export default ReservaContainer;
