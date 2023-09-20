import React, { useState, useEffect } from 'react';
import Caracteristica from '../../admin/Caracteristica';
import axios from 'axios';
import Sidebar from '../Sidebar';
import '../admin.css'

const CaracteristicaContainer = () => {
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [newCaracteristicaName, setNewCaracteristicaName] = useState('');

  const fetchCaracteristicas = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/cabañas/tipos/caracteristicas');
      setCaracteristicas(response.data);
    } catch (error) {
      console.error('Error fetching características:', error);
    }
  };

  const handleAddCaracteristica = async (nombre) => {
    try {
      const response = await axios.post('http://localhost:8080/api/cabañas/tipos/caracteristicas', {
        nombreCaracteristica: nombre
      });

      if (response.status === 201) {
        // Refetch características after successful POST
        fetchCaracteristicas();
      }
    } catch (error) {
      console.error('Error adding característica:', error);
    }
  };

  useEffect(() => {
    fetchCaracteristicas();
  }, []);

  return (
    <div className='admin-container'>
      <Sidebar/>
      <Caracteristica
        caracteristicas={caracteristicas}
        onAddCaracteristica={handleAddCaracteristica}
      />
    </div>
  );
};

export default CaracteristicaContainer;
