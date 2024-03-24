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
      const response = await axios.get('http://localhost:8080/api/usuarios', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }, {
        params: {
          page: page,
          size: 10
        },
      });
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error fetching usuarios:', error);
    }
  };
  
  useEffect(() => {
    fetchUsuarios(currentPage); // Cargar inicialmente los usuarios de la página 1
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
    <div>
      <div className='admin-container'>
        <Sidebar />
        <Usuario usuarios={usuarios} />
      </div>
      <div className='numPagina'>
          <button onClick={goToPreviousPage}>Anterior</button> {/* Botón para ir a la página anterior */}
          <span>Página {currentPage}</span> {/* Mostrar el número de página actual */}
          <button onClick={goToNextPage}>Siguiente</button> {/* Botón para ir a la página siguiente */}
      </div>
    </div>
  );
};

export default UsuarioContainer;
