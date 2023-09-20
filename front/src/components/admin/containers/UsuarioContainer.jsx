import React, { useState, useEffect } from 'react';
import Usuario from '../../admin/Usuario';
import axios from 'axios';
import '../admin.css';
import Sidebar from '../Sidebar';

const UsuarioContainer = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/usuarios');
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error fetching usuarios:', error);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div className='admin-container'>
      <Sidebar />
      <Usuario usuarios={usuarios} />
    </div>
  );
};

export default UsuarioContainer;
