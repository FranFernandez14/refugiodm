import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function VerificacionDeToken() {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get('email');

  const handleVerificarToken = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/verificarToken', null, {
        params: {
          email: email,
          token: token,
        },
      });

      if (response.status === 200) {
        navigate(`/recuperar-contraseña?email=${email}&token=${token}`);
      } else {
        setError('Token incorrecto. Inténtelo nuevamente.');
      }
    } catch (error) {
      setError('Error. Inténtelo más tarde.');
      console.error('Error al verificar el token:', error);
    }
  };

  return (
    <div>
      <h2>Ingrese el token que le hemos enviado por correo electrónico:</h2>
      <input type="text" placeholder="Token" value={token} onChange={(e) => setToken(e.target.value)} />
      <button onClick={handleVerificarToken}>Confirmar</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default VerificacionDeToken;
