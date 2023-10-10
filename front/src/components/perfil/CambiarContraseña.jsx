import React, { useState, useEffect } from 'react';
import { decodeToken } from 'react-jwt';
import axios from 'axios';
import './CambiarContraseña.css';
import { Link } from 'react-router-dom';

const CambiarContraseña = () => {
  const [userId, setUserId] = useState(0);
  const [usuario, setUsuario] = useState({});
  const [contraseñaActual, setContraseñaActual] = useState('');
  const [contraseñaNueva, setContraseñaNueva] = useState('');
  const [repeticion, setRepeticion] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

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

  const handleConfirmarClick = async () => {
    if (contraseñaNueva.length < 8) {
      setError('La nueva contraseña debe tener al menos 8 caracteres.');
    } else if (contraseñaNueva !== repeticion) {
      setError('Las contraseñas nuevas no coinciden.');
    } else if (contraseñaActual === '' || contraseñaNueva === '' || repeticion === '') {
      setError('Todos los campos deben estar llenos.');
    } else {
      try {
        const response = await axios.post(`http://localhost:8080/api/auth/cambiarContraseña`, {
          idUsuario: userId,
          contraseñaActual: contraseñaActual,
          contraseñaNueva: contraseñaNueva
        });

        if (response.status === 200) {
          setMensaje('Contraseña cambiada con éxito.');
        } else {
          setError('Error al cambiar la contraseña. Inténtalo de nuevo.');
        }
      } catch (error) {
        setError('Error al cambiar la contraseña. Inténtalo de nuevo.');
        console.error('Error al cambiar la contraseña:', error);
      }
    }
  };
  return (
    <div className='perfil1'>
      <br />
      <div className='Titulo1'>Cambiar Contraseña</div>
      <br />
      <div className='Campos'>
        <div>Contraseña Actual <input type='password' id='ContraActual' placeholder='*****' onChange={(e) => setContraseñaActual(e.target.value)}/></div>
        <div>Nueva Contraseña <input type='password' id='ContraNueva' placeholder='*****' onChange={(e) => setContraseñaNueva(e.target.value)} /></div>
        <div>Repetir Contraseña <input type='password' id='Repeticion' placeholder='*****' value={repeticion} onChange={(e) => setRepeticion(e.target.value)} /></div>
        <div className='ContenedorBotones'>
          <button className='b1'><Link to="/perfil/modificardatos">Cancelar</Link></button>
          <button className='b1' onClick={handleConfirmarClick}>Confirmar</button>
        </div>
        {error && <p className="error">{error}</p>}
        {mensaje && <p className="mensaje">{mensaje}</p>}
      </div>
    </div>
  );
};

export default CambiarContraseña;
