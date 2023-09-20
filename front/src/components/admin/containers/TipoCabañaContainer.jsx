import React, { useState, useEffect } from 'react';
import TipoCabaña from '../../admin/TipoCabaña';
import axios from 'axios';
import Sidebar from '../Sidebar';
import '../admin.css';

const TipoCabañaContainer = () => {
  const [tiposCabaña, setTiposCabaña] = useState([]);
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [selectedCaracteristicaId, setSelectedCaracteristicaId] = useState('');

  const fetchTiposCabaña = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/cabañas/tipos');
      setTiposCabaña(response.data);
    } catch (error) {
      console.error('Error fetching tipos de cabaña:', error);
    }
  };

  const fetchCaracteristicas = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/cabañas/tipos/caracteristicas');
      setCaracteristicas(response.data);
    } catch (error) {
      console.error('Error fetching características:', error);
    }
  };

  const fetchCostoActual = async (idTipoCabaña) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/cabañas/tipos/${idTipoCabaña}/costoactual`);
      return response.data;
    } catch (error) {
      console.error('Error fetching costo actual:', error);
      return null;
    }
  };

  const handleAgregarCaracteristica = async (idTipoCabaña) => {
    try {
      const response = await axios.post('http://localhost:8080/api/cabañas/tipos/agregarCaracteristica', {
        idTipoCabaña,
        idCaracteristica: selectedCaracteristicaId,
      });

      if (response.status === 200) {
        // Refetch tiposCabaña and características after successful POST
        fetchTiposCabaña();
        fetchCaracteristicas();
      }
    } catch (error) {
      console.error('Error adding característica to tipo de cabaña:', error);
    }
  };

  const handleEliminarCaracteristica = async (idTipoCabaña, idCaracteristica) => {
    try {
      const response = await axios.post('http://localhost:8080/api/cabañas/tipos/eliminarCaracteristica', {
        idTipoCabaña,
        idCaracteristica,
      });

      if (response.status === 200) {
        // Refetch tiposCabaña after successful POST
        fetchTiposCabaña();
      }
    } catch (error) {
      console.error('Error removing característica from tipo de cabaña:', error);
    }
  };

  useEffect(() => {
    fetchTiposCabaña();
    fetchCaracteristicas();
  }, []);

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-right-content">
        <div>
          {tiposCabaña.map((tipoCabaña) => (
            <TipoCabaña
              key={tipoCabaña.idtipoCabaña}
              tipoCabaña={tipoCabaña}
              caracteristicas={caracteristicas}
              selectedCaracteristicaId={selectedCaracteristicaId}
              onAgregarCaracteristica={handleAgregarCaracteristica}
              onEliminarCaracteristica={handleEliminarCaracteristica}
              onCaracteristicaChange={(event) =>
                setSelectedCaracteristicaId(event.target.value)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TipoCabañaContainer;
