import React from 'react';
import './admin.css';
import ModificarUsuario from './ModificarUsuario'; // Nuevo componente de ventana emergente

const Usuario = ({ usuarios }) => {
  return (
    <div className='admin-right-content'>
      <div className='admin-usuario'>
        <h2>Usuarios</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Nombre</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th> 
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.email}</td>
                <td>{usuario.nombre + ' ' + usuario.apellido}</td>
                <td>{usuario.rol.nombre}</td>
                <td>
                  {usuario.fechaHoraBaja == null && <div>Alta</div>}
                  {usuario.fechaHoraBaja != null && <div>Baja</div>}
                </td>
                <td>
                  <ModificarUsuario usuario={usuario} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Usuario;

