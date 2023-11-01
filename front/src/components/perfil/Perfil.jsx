import React, { useState, useEffect } from 'react';
import { decodeToken } from 'react-jwt';
import axios from 'axios';
import './perfil.css';
import { Link } from 'react-router-dom';

const Perfil = () => {

  const [userId, setUserId] = useState(0);
  const [usuario, setUsuario] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      const decodedToken = decodeToken(token, 'secret');
      const Id = decodedToken.id;

      setUserId(Id);
      fetchUsuario(Id);
    }
  }, []);

  const fetchUsuario = async (userId) => {
    try {
      const responseUsuario = await axios.get(`http://localhost:8080/api/usuarios/${userId}`);
      setUsuario(responseUsuario.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className='perfil-container'>
      <div className='perfil'>
        <div className='Titulo'>Mi Perfil</div>
        <div className='Datos'>
          <div className='interior'>
            <div className='datoPersona'>Nombre: <p className='dato'> {usuario.nombre}</p></div>
            <div className='datoPersona'>Apellido: <p className='dato'> {usuario.apellido}</p></div>
            <div className='datoPersona'>Correo electrónico: <p className='dato'> {usuario.email}</p></div>
            <div className='datoPersona'>Teléfono: <p className='dato'> {telefono(usuario)}</p></div>
            <div className='datoPersona'>DNI: <p className='dato'> {dni(usuario)}</p></div>
            <div className='botones'>
              <button className='b2'><Link to="/">Volver Atrás</Link></button>
              <button className='b2'><Link to="/perfil/modificardatos">Modificar Datos</Link></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function telefono(usuario) {
  const num = usuario.nroTelefono;
  if (num == null) {
    return ('-')
  } else {
    return (num)
  }
}
function dni(usuario) {
  const num_dni = usuario.dni;
  if (num_dni == null) {
    return ('-')
  } else {
    return (usuario.dni)
  }
}

export default Perfil;