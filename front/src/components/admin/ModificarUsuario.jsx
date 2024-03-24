import React, { useState } from 'react';
import axios from 'axios';
import './admin.css';
const ModificarUsuario = ({ usuario }) => {

  const handleAsignarRol = async (rol) => {
    try {
      const response = await axios.post('http://localhost:8080/api/usuarios/roles/' + rol, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }, {
        idUsuario: usuario.id,
      });

      if (response.status === 200) {
      }
    } catch (error) {
      console.error('Error al asignar rol:', error);
    }
  };

  const handleDarBaja = async () => {
    try {
      const response = await axios.put('http://localhost:8080/api/usuarios/darDeBaja/' + usuario.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }, {
      });

      if (response.status === 200) {
      }
    } catch (error) {
      console.error('Error al dar de baja:', error);
    }
  };

  const handleCancelarBaja = async () => {
    try {
      const response = await axios.put('http://localhost:8080/api/usuarios/cancelarBaja/' + usuario.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }, {
      });

      if (response.status === 200) {
      }
    } catch (error) {
      console.error('Error al cancelar baja:', error);
    }
  };



  return (
    <div>

      <div className="modal">
        <div className="modal-content">
          {usuario.roles.length !== 3 && (
            <button className="modify-button" onClick={() => handleAsignarRol('asignarAdministrador')}>
              Asignar Administrador
            </button>
          )}
          {usuario.roles.length !== 2 && (
            <button className="modify-button" onClick={() => handleAsignarRol('asignarEmpleado')}>
              Asignar Empleado
            </button>
          )}
          {usuario.roles.length !== 1 && (
            <button className="modify-button" onClick={() => handleAsignarRol('asignarUsuario')}>
              Asignar Usuario
            </button>
          )}
          {usuario.fechaHoraBaja == null && (
            < button className="modify-button" onClick={() => handleDarBaja()}>
              Dar de baja
            </button>
          )}
          {usuario.fechaHoraBaja != null && (
            < button className="modify-button" onClick={() => handleCancelarBaja()}>
              Cancelar baja
            </button>
          )}
        </div>
      </div>
    </div >
  );
};

export default ModificarUsuario;
