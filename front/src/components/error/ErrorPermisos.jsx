import React from 'react';
import Modal from 'react-modal';

const ErrorPermiso = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },
        content: {
          width: '300px',
          height: '200px',
          margin: 'auto',
          border: '1px solid #ccc',
          borderRadius: '5px',
          padding: '20px',
          textAlign: 'center'
        }
      }}
    >
      <h2>No tienes permiso para realizar esta acción</h2>
      <button onClick={onClose}>Cerrar</button>
    </Modal>
  );
};

export default ErrorPermiso;