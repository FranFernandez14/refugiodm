import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function RecuperarContraseña() {
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get('email');
  const token = new URLSearchParams(location.search).get('token');

  const handleCambiarContraseña = async () => {
    if (contraseña !== confirmarContraseña) {
      setError('Las contraseñas no coinciden. Inténtelo nuevamente.');
      return;
    }

    // Agregar validación de longitud de contraseña
    if (contraseña.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/auth/resetearContraseña', {
        email: email,
        token: token,
        contraseñaNueva: contraseña,
      });

      if (response.status === 200) {
        navigate('/login');
      } else {
        setError('Error al cambiar la contraseña. Inténtelo nuevamente.');
      }
    } catch (error) {
      setError('Error. Inténtelo más tarde.');
      console.error('Error al cambiar la contraseña:', error);
    }
  };

  return (
    <div>
      <h2>Ingrese la contraseña nueva:</h2>
      <input type="password" placeholder="Contraseña nueva" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
      <input type="password" placeholder="Confirmar contraseña" value={confirmarContraseña} onChange={(e) => setConfirmarContraseña(e.target.value)} />
      <button onClick={handleCambiarContraseña}>Confirmar</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default RecuperarContraseña;
