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
              <th>Tipo de usuario</th>
              <th>Modificar usuario</th> {/* Nueva columna */}
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.email}</td>
                <td>{usuario.nombre + ' ' + usuario.apellido}</td>
                <td>{getTipoUsuario(usuario)}</td>
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

function getTipoUsuario(usuario) {
  const numRoles = usuario.roles.length;
  if (numRoles === 1) {
    return 'Usuario';
  } else if (numRoles === 2) {
    return 'Empleado';
  } else if (numRoles === 3) {
    return 'Administrador';
  } else {
    return 'Desconocido';
  }
}

export default Usuario;

