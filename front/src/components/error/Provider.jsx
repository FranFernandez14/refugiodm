import React, { useState } from 'react';
import ErrorPermiso from './ErrorPermiso';

const ErrorPermisoProvider = ({ children }) => {
  const [mostrarError, setMostrarError] = useState(false);

  const abrirModalError = () => {
    setMostrarError(true);
  };

  const cerrarModalError = () => {
    setMostrarError(false);
  };

  return (
    <div>
      {children(abrirModalError)}
      <ErrorPermiso isOpen={mostrarError} onClose={cerrarModalError} />
    </div>
  );
};

export default ErrorPermisoProvider;