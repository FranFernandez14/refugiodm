import React, { useState, useEffect } from 'react';
import Reserva from '../../admin/Reserva';
import axios from 'axios';
import Sidebar from '../Sidebar';
import '../admin.css';
import { Link } from 'react-router-dom';

const ReservaContainer = () => {
  const [reservas, setReservas] = useState([]);
  const [estadoReserva, setEstadoReserva] = useState(1);
  const [fechaFinal, setFechaFinal] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const fetchReservasByState = async (estado, fechaInicio, fechaFin, page) => {
    try {
      let queryParams = { estado: estado, page: page, size: 10 };
      if (fechaInicio) {
        queryParams.fechaInicio = fechaInicio;
      }
      if (fechaFin) {
        queryParams.fechaFin = fechaFin;
      }
  
      const response = await axios.get('http://localhost:8080/api/reservas/byState', {
        params: queryParams,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setReservas(response.data.content);
      setEstadoReserva(estado);
    } catch (error) {
      console.error('Error fetching reservas by state:', error);
    }
  };

  useEffect(() => {
    fetchReservasByState(1, "", "", currentPage); // Cargar inicialmente las reservas pendientes
  }, [currentPage]); // Ejecutar cuando currentPage cambia

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1); // Ir a la página anterior
    }
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1); // Ir a la página siguiente
  };

  const handleDateFilterChange = () => {
    fetchReservasByState(estadoReserva, fechaInicio, fechaFinal, currentPage); // Actualizar reservas con las fechas y estado actual
  };

  return (
    <div className='admin-container'>
      <Sidebar />
      <div className='admin-right-content'>
        <div id='reserva-buttons'>
          <div>
            <Link onClick={() => {setCurrentPage(0); setEstadoReserva(1); fetchReservasByState(1, "", "", 0);}}>Ver reservas pendientes</Link>
          </div>
          <div>
            <Link onClick={() => {setCurrentPage(0); setEstadoReserva(2); fetchReservasByState(2, "", "", 0);}}>Ver reservas canceladas</Link>
          </div>
          <div>
            <Link onClick={() => {setCurrentPage(0); setEstadoReserva(3); fetchReservasByState(3, "", "", 0);}}>Ver reservas aceptadas</Link>
          </div>
          <div>
            <Link onClick={() => {setCurrentPage(0); setEstadoReserva(4); fetchReservasByState(4, "", "", 0);}}>Ver reservas iniciadas</Link>
          </div>
          <div>
            <Link onClick={() => {setCurrentPage(0); setEstadoReserva(5); fetchReservasByState(5, "", "", 0);}}>Ver reservas finalizadas</Link>
          </div>
        </div>
        <div className='filtroFecha'>
          <div className='Filtro'>
            <label htmlFor="FechaInicio">Fecha de Inicio:</label>
            <input type="date" id="FechaInicio" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} onBlur={handleDateFilterChange} />
          </div>
          <div className='Filtro'>
            <label htmlFor="FechaFin">Fecha de Fin:</label>
            <input type="date" id="FechaFin" value={fechaFinal} onChange={(e) => setFechaFinal(e.target.value)} onBlur={handleDateFilterChange} />
          </div>
        </div>
        <Reserva reservas={reservas} estadoReserva={estadoReserva} />
        <div className='numPagina'>
          <button onClick={goToPreviousPage}>Anterior</button> {/* Botón para ir a la página anterior */}
          <span>Página {currentPage+1}</span> {/* Mostrar el número de página actual */}
          <button onClick={goToNextPage}>Siguiente</button> {/* Botón para ir a la página siguiente */}
        </div>
      </div>
    </div>
  );
};

export default ReservaContainer;
