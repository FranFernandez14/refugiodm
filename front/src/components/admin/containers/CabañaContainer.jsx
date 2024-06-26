import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import '../admin.css';
import { useNavigate } from 'react-router-dom';

const CabañaContainer = () => {
  const [cabañas, setCabañas] = useState([]);
  const [tiposCabaña, setTiposCabaña] = useState([]);
  const [selectedTipoCabaña, setSelectedTipoCabaña] = useState('');
  const [selectedTamaño, setSelectedTamaño] = useState('');
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
        const selectedTipoCabañaObj = tiposCabaña.find((tipoCabaña) => tipoCabaña.nombre === selectedTipoCabaña);
  
        const response = await axios.post('http://localhost:8080/api/cabañas/crear',  {
          tamaño: selectedTamaño,
          idTipoCabaña: selectedTipoCabañaObj.id
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        },);
  
        if (response.status === 200) {
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
      const responseCabañas = await axios.get('http://localhost:8080/api/cabañas', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setCabañas(responseCabañas.data);

      const responseTiposCabaña = await axios.get('http://localhost:8080/api/cabañas/tipos', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
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
      <Sidebar />
      <div className='admin-right-content'>
        <h2>Cabañas</h2>
        <select className='input-tamaño' value={selectedTipoCabaña} onChange={handleTipoCabañaChange}>
          <option value="" >Seleccione un tipo de cabaña</option>
          {tiposCabaña.map((tipoCabaña) => (
            <option key={tipoCabaña.id} value={tipoCabaña.nombre}>
              {tipoCabaña.nombre}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={selectedTamaño}
          onChange={handleTamañoChange}
          placeholder="Tamaño de Cabaña"
          className='input-tamaño input-mod'
        />
        <button onClick={handleAddCabaña} className='button-mod'>Agregar Cabaña</button>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tamaño</th>
              <th>Tipo de Cabaña</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cabañas.map((cabaña) => (
              <tr key={cabaña.idcabaña}>
                <td>{cabaña.idcabaña}</td>
                <td>{cabaña.tamaño}</td>
                <td>{cabaña.tipoCabaña.nombre}</td>
                <td className='button-table-container'>
                  <button onClick={() => handleGestionarCabaña(cabaña.idcabaña)}>Gestionar Cabaña</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CabañaContainer;
