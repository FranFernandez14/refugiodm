import React, { useState } from 'react';
import "./login.css";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Atras from '../../assets/atras.svg'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Agregar estado para el manejo de errores
  const navigate = useNavigate();

  const handleCancelar = async () => {
    navigate('/')
  }

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password
      });
      if (response.status === 200 && response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        navigate('/');
        window.location.reload();
      } else {
        setError('Inicio de sesión fallido. Verifica tus credenciales.');
      }
    } catch (error) {
      setError('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className="login-container">
      <div className='login'>
        <div className='login1'>
          <div className='login2'>
            <div>
              <button className='atras' onClick={handleCancelar}>
                <img src={Atras} width="22px" height="22px" id='svgatras' />
              </button>
            </div>
            <div className='tituloLogin'>
              Iniciar sesión
            </div>
          </div>
        </div>
        <div className='login1'>
          <div>
            <input
              type="text"
              id="email"
              value={email}
              placeholder='Correo electrónico'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className='login1'>
          <div><input
            type="password"
            id="password"
            placeholder='Contraseña'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /></div>
          <div>{error && <p style={{ color: 'red' }}>{error}</p>} { }</div>
          <div className='links'>Recuperar contraseña</div>
        </div>
        <div className='login1'>
          <button type="button" onClick={handleLogin}>
            Iniciar Sesión
          </button>
          <div id='noregistrado'>
            <div>¿No estás registrado?</div>
            <div><Link to="/registro"><div className='links'>Registrarse</div></Link></div>
          </div>
        </div>
      </div>


    </div>
  );
}

export default Login;
