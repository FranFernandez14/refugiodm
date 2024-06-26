import React, { useState } from 'react';
import axios from 'axios';
import './admin.css';
const ModificarUsuario = ({ usuario }) => {

  const handleDarBaja = async () => {
    try {
      const response = await axios.put('http://localhost:8080/api/usuarios/darDeBaja/' + usuario.id,{}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }, {
      });

      if (response.status === 200) {
        location.reload();
      }
    } catch (error) {
      console.error('Error al dar de baja:', error);
    }
  };

  const handleCancelarBaja = async () => {
    try {
      const response = await axios.put('http://localhost:8080/api/usuarios/cancelarBaja/' + usuario.id,{}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }, {
      });

      if (response.status === 200) {
        location.reload();
      }
    } catch (error) {
      console.error('Error al cancelar baja:', error);
    }
  };



  return (
    <div>

      <div className="modal">
        <div className="modal-content">
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
