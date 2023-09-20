import React, { useState } from 'react';
import axios from 'axios';

const ModificarUsuario = ({ usuario }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleAsignarRol = async (rol) => {
    try {
      const response = await axios.post('http://localhost:8080/api/usuarios/roles/' + rol, {
        idUsuario: usuario.id,
      });

      if (response.status === 200) {
        // Actualizar la lista de usuarios u otras acciones necesarias
      }
    } catch (error) {
      console.error('Error al asignar rol:', error);
    }
  };

  return (
    <div>
      <button onClick={() => setShowPopup(true)}>Modificar</button>
      {showPopup && (
        <div className="modal">
          <div className="modal-content">
            <h2>Modificar Usuario</h2>
            <p>Selecciona un rol:</p>
            {usuario.roles.length !== 3 && (
              <button onClick={() => handleAsignarRol('asignarAdministrador')}>
                Asignar Administrador
              </button>
            )}
            {usuario.roles.length !== 2 && (
              <button onClick={() => handleAsignarRol('asignarEmpleado')}>
                Asignar Empleado
              </button>
            )}
            {usuario.roles.length !== 1 && (
              <button onClick={() => handleAsignarRol('asignarUsuario')}>
                Asignar Usuario
              </button>
            )}
            <button onClick={() => setShowPopup(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModificarUsuario;
