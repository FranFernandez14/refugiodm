import React, { useState, useEffect } from 'react';
import Reserva from '../../admin/Reserva';
import axios from 'axios';
import Sidebar from '../Sidebar';
import '../admin.css'

const ReservaContainer = () => {
  const [reservas, setReservas] = useState([]);

  const fetchReservas = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/reservas');
      setReservas(response.data);
    } catch (error) {
      console.error('Error fetching reservas:', error);
    }
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  return (
    <div className='admin-container'>
    <Sidebar/>
    <Reserva reservas={reservas} />
    </div>
  );
};

export default ReservaContainer;
