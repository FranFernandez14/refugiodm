import React, { useState, useEffect } from 'react';
import { decodeToken } from 'react-jwt';
import axios from 'axios';
import './ModificarDatos.css';
import { Link, useNavigate } from 'react-router-dom';

const ModificarDatos = () => {
  const [userId, setUserId] = useState(0);
  const [usuario, setUsuario] = useState([]);
  const [nombreIngresado, setNombre] = useState('');
  const [apellidoIngresado, setApellido] = useState('');
  const [emailIngresado, setEmail] = useState('');
  const [nroTelefonoIngresado, setTelefono] = useState('');
  const [dniIngresado, setDni] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      const decodedToken = decodeToken(token, 'secret');
      const Id = decodedToken.id;

      setUserId(Id);
      fetchUsuario(Id);
    }
  }, []);

  useEffect(() => {

    setNombre(usuario.nombre || '');
    setApellido(usuario.apellido || '');
    setEmail(usuario.email || '');
    setTelefono(usuario.nroTelefono || '');
    setDni(usuario.dni || '');
  }, [usuario]);

  const fetchUsuario = async (userId) => {
    try {
      const responseUsuario = await axios.get(`http://localhost:8080/api/usuarios/${userId}`);
      setUsuario(responseUsuario.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAtras = async () => {
    navigate("/perfil")
  }

  const handleModificarDatos = async () => {

    const datosModificados = {
      idUsuario: userId,
      nombre: nombreIngresado,
      apellido: apellidoIngresado,
      email: emailIngresado,
      telefono: nroTelefonoIngresado,
      dni: dniIngresado,
    };

    try {
      // Envía una solicitud POST al servidor con los datos modificados
      const response = await axios.post('http://localhost:8080/api/usuarios/modificarDatos', datosModificados);
      console.log('Datos modificados con éxito:', response.data);
      if (response.status == 200) {
        navigate("/perfil")
      }

    } catch (error) {
      console.error('Error al modificar datos:', error);
    }
  };

  return (
    <div className='perfil1-container'>
      <div className='perfil1'>
        <div className='Titulo2'>Mi Perfil</div>
        <div className='Datos1'>
          <div className='interior1'>
            <div>Nombre: <input type='text' id='nombre' value={nombreIngresado} onChange={(e) => setNombre(e.target.value)} /></div>
            <div>Apellido: <input type='text' id='apellido' value={apellidoIngresado} onChange={(e) => setApellido(e.target.value)} /> </div>
            <div>Correo electrónico: <input type='text' id='mail' value={emailIngresado} onChange={(e) => setEmail(e.target.value)} /></div>
            <div>Teléfono: <input type='text' id='mail' value={nroTelefonoIngresado} onChange={(e) => setTelefono(e.target.value)} /></div>
            <div>DNI: <input type='text' id='dni' value={dniIngresado} onChange={(e) => setDni(e.target.value)} /></div>
            <a className='contra'><h5><Link to="/perfil/cambiarcontraseña">Cambiar Contraseña</Link></h5></a>
            <div className='botones1a'>
              <button className='b2' onClick={handleAtras}>Atrás</button>
              <button className='b2' onClick={handleModificarDatos}>Guardar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModificarDatos;