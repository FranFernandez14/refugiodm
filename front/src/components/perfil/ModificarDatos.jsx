import React, { useState, useEffect } from 'react';
import { decodeToken } from 'react-jwt';
import UsuarioContainer from '../admin/containers/UsuarioContainer';
import axios from 'axios';
import './ModificarDatos.css';
import { Link } from 'react-router-dom';

const ModificarDatos = ()  => {
  
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
    <div className='perfil1'>
      <br></br>
      <div className='Titulo1'>Mi Perfil</div>
      <br></br>
      <div className='Datos1'>
        <div className='interior1'>
        <div>Nombre: <input type='text' id='nombre' placeholder={usuario.nombre}/></div>
        <div>Apellido: <input type='text' id='apellido' placeholder={usuario.apellido}/> </div>
        <div>Correo electrónico: <input type='text' id='mail' placeholder={usuario.email}/></div>
        <div>Teléfono: <input type='text' id='mail' placeholder={telefono (usuario)}/></div>
        <div>DNI: 
        <input type='text' id='dni' placeholder={dni (usuario)}/>
        </div>
        <a className='contra'><h5><Link to="/perfil/cambiarcontraseña">Cambiar Contraseña</Link></h5></a>
        <div className='botones1'>
          <button><Link to="/perfil">Cancelar</Link></button>
          <button><Link to="/perfil">Guardar</Link></button>
        </div>
        </div>
      </div>
    </div>
  )
}

function telefono (usuario){
  const num = usuario.nro_telefono;
  if (num == null){
    return ('Agregar teléfono')
  }else{
    return (usuario.nro_telefono)
  }
}
function dni (usuario){
  const num_dni = usuario.dni;
  if (num_dni == null){
    return ('Agregar DNI')
   }else{
    return (usuario.dni)
   }
}

export default ModificarDatos;
