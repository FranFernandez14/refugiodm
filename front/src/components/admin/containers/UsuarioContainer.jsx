import React, { useState, useEffect } from 'react';
import Usuario from '../../admin/Usuario';
import axios from 'axios';
import '../admin.css';
import Sidebar from '../Sidebar';

const UsuarioContainer = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchUsuarios(currentPage); 
  }, [currentPage]);
  
  const fetchUsuarios = async (page) => {
    try {
      const response = await axios.get(
        'http://localhost:8080/api/usuarios',
        {
          params: {
            page: page,
            size: 10
          },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error fetching usuarios:', error);
    }
  };
  
  
  useEffect(() => {
    fetchUsuarios(currentPage); 
  }, [currentPage]);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <div className='admin-container'>
        <Sidebar />
        <Usuario usuarios={usuarios} />
      </div>
      <div className='numPagina'>
          <button onClick={goToPreviousPage}>Anterior</button> 
          <span>Página {currentPage}</span> 
          <button onClick={goToNextPage}>Siguiente</button> 
      </div>
    </div>
  );
};

export default UsuarioContainer;
