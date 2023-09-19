import React, { useState, useEffect } from 'react';
import Cabaña from '../../admin/Cabaña';
import axios from 'axios';
import Sidebar from '../Sidebar';
import '../admin.css'
import { useNavigate } from 'react-router-dom';

const CabañaContainer = () => {
  const [cabañas, setCabañas] = useState([]);
  const [tiposCabaña, setTiposCabaña] = useState([]);
  const [selectedTipoCabaña, setSelectedTipoCabaña] = useState('');
  const [selectedTamaño, setSelectedTamaño] = useState(0);
  const navigate = useNavigate();

  const handleTipoCabañaChange = (event) => {
    setSelectedTipoCabaña(event.target.value);
  };

  const handleTamañoChange = (event) => {
    setSelectedTamaño(event.target.value);
  };

  const handleAddCabaña = async () => {
    if (selectedTamaño >= 1) {
      try {
        // Find the selected tipoCabaña by its nombre
        const selectedTipoCabañaObj = tiposCabaña.find((tipoCabaña) => tipoCabaña.nombre === selectedTipoCabaña);

        const response = await axios.post('http://localhost:8080/api/cabañas', {
          tamaño: selectedTamaño,
          tipoCabaña: { idtipoCabaña: selectedTipoCabañaObj.idtipoCabaña }
        });

        if (response.status === 201) {
          // Refetch cabañas after successful POST
          fetchCabañas();
        }
      } catch (error) {
        console.error('Error adding cabaña:', error);
      }
    } else {
      console.log('El tamaño debe ser 1 o mayor');
    }
  };

  const fetchCabañas = async () => {
    try {
      const responseCabañas = await axios.get('http://localhost:8080/api/cabañas');
      setCabañas(responseCabañas.data);

      const responseTiposCabaña = await axios.get('http://localhost:8080/api/cabañas/tipos');
      setTiposCabaña(responseTiposCabaña.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleGestionarCabaña = (cabañaId) => {
    navigate(`/gestionarcabaña/${cabañaId}`);
  };

  useEffect(() => {
    fetchCabañas();
  }, []);

  return (
    <div className='admin-container'>
      <Sidebar/>
      <Cabaña
        cabañas={cabañas}
        tiposCabaña={tiposCabaña}
        selectedTipoCabaña={selectedTipoCabaña}
        selectedTamaño={selectedTamaño}
        onTipoCabañaChange={handleTipoCabañaChange}
        onTamañoChange={handleTamañoChange}
        onAddCabaña={handleAddCabaña}
        onGestionarCabaña={handleGestionarCabaña}
      />
    </div>
  );
};

export default CabañaContainer;
