import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function GeneracionDeToken() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEnviarToken = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/generarToken', null, {
        params: {
          email: email,
        },
      });

      if (response.status === 200) {
        navigate(`/verificar-token?email=${email}`);
      } else {
        setError('Error. Inténtelo más tarde.');
      }
    } catch (error) {
      setError('Error. Inténtelo más tarde.');
      console.error('Error al enviar el token:', error);
    }
  };

  return (
    <div>
      <Link to="/login">Atrás</Link>
      <h2>Ingrese su correo electrónico para recuperar su contraseña</h2>
      <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleEnviarToken}>Confirmar correo electrónico</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default GeneracionDeToken;
