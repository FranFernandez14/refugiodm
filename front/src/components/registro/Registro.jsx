import React, { useState } from 'react';
import "./registro.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Registro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dni, setDni] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const navigate = useNavigate();


  const handleCancelar = async () => {
    navigate('/')
  }

  const handleRegistro = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/registro', {
        email,
        password,
        nombre,
        apellido,
        dni,
        telefono
      });

      if (response.status === 200) {
        navigate('/login');
      } else {
        setError('Registro fallido, verifica tus credenciales.');
      }
    } catch (error) {
      setError('Error al registrarse. Por favor, inténtalo de nuevo.');
      console.error('Error al registrarse:', error);
    }
  };

  return (
    <div className="registro-container">
      <div className='registro'>
        <div className='tituloRegistro'>
          Registrarse
        </div>
        <div><div className='registro1'>
          <div>
            <div><input
              type="text"
              id="nombre"
              value={nombre}
              placeholder='Nombre'
              onChange={(e) => setNombre(e.target.value)}
            />
            </div>
            <div>
              <input
                type="text"
                id="apellido"
                value={apellido}
                placeholder='Apellido'
                onChange={(e) => setApellido(e.target.value)}
              />
            </div>
          </div>
          <div><input
            type="text"
            id="dni"
            value={dni}
            placeholder='Número de documento'
            onChange={(e) => setDni(e.target.value)}
          />
          </div>
          <div>
            <input
              type="email"
              id="email"
              value={email}
              placeholder='Correo Electrónico'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              value={password}
              placeholder='Contraseña'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              type="tel"
              id="telefono"
              value={telefono}
              placeholder='Teléfono'
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>
        </div>
        </div>
        <div className='botones'>
          <div>
            <button type="button" id='cancelar' onClick={handleCancelar}>
              Cancelar
            </button>
          </div>
          <div>
            <button type="button" onClick={handleRegistro}>
              Registrarse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registro;
