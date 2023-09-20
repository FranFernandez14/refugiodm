import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { decodeToken } from 'react-jwt';

const DetalleReserva = () => {
  const location = useLocation();
  const [id, setId] = useState(0);
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decodedToken = decodeToken(token, 'secret');
      const id = decodedToken.id;
      setId(id);
    }
  }, []);
  const {
    idCabaña,
    nombreTipoCabaña,
    caracteristicas,
    costoTotal,
    fechaInicio,
    fechaFin,
    tamaño,
  } = location.state;

  const [reservaConfirmada, setReservaConfirmada] = useState(false);
  const [mostrarCancelarModal, setMostrarCancelarModal] = useState(false);
  const [mostrarConfirmarModal, setMostrarConfirmarModal] = useState(false);

  const navigate = useNavigate();

  const handleConfirmarReserva = () => {
    setMostrarConfirmarModal(true);
    setMostrarCancelarModal(false);
  };

  const handleCancelarReserva = () => {
    setMostrarCancelarModal(true);
    setMostrarConfirmarModal(false);
  };

  const handleConfirmarReservaAceptado = () => {
    axios
      .post('http://localhost:8080/api/reservas/reservar', {
        IDUsuario: id, 
        IDCabaña: idCabaña,
        cantPersonas: tamaño,
        montoTotal: costoTotal,
        fechaInicio: fechaInicio.toISOString().substring(0,10),
        fechaFin: fechaFin.toISOString().substring(0,10),
      })
      .then((response) => {
        setReservaConfirmada(true);
        navigate('/');
      })
      .catch((error) => {
        console.error('Error al confirmar la reserva:', error);
      });
    setMostrarConfirmarModal(false);
  };

  const handleConfirmarCancelar = (confirmar) => {
    if (confirmar) {
      navigate('/');
    } else {
      setMostrarCancelarModal(false);
    }
  };

  return (
    <div>
      {reservaConfirmada ? (
        <div>
          <h2>Reserva Confirmada</h2>
          <p>ID de Reserva: #{/* Deberías mostrar el ID de reserva aquí */}</p>
          <p>Tipo de Cabaña: {nombreTipoCabaña}</p>
          <p>Características:</p>
          <ul>
            {caracteristicas.map((caracteristica) => (
              <li key={caracteristica.idCaracteristica}>
                {caracteristica.nombreCaracteristica}
              </li>
            ))}
          </ul>
          <p>Costo Total: ${costoTotal}</p>
          <p>Fecha de Inicio: {fechaInicio.toISOString().substring(0,10)}</p>
          <p>Fecha de Fin: {fechaFin.toISOString().substring(0,10)}</p>
        </div>
      ) : (
        <div>
          <h2>Detalle de la Reserva</h2>
          <p>ID de Cabaña: {idCabaña}</p>
          <p>Tipo de Cabaña: {nombreTipoCabaña}</p>
          <p>Características:</p>
          <ul>
            {caracteristicas.map((caracteristica) => (
              <li key={caracteristica.idCaracteristica}>
                {caracteristica.nombreCaracteristica}
              </li>
            ))}
          </ul>
          <p>Costo Total: ${costoTotal}</p>
          <p>Fecha de Inicio: {fechaInicio.toISOString().substring(0,10)}</p>
          <p>Fecha de Fin: {fechaFin.toISOString().substring(0,10)}</p>
          <button onClick={handleConfirmarReserva}>Confirmar Reserva</button>
          <button onClick={handleCancelarReserva}>Cancelar</button>
        </div>
      )}

      {mostrarCancelarModal && (
        <div className="modal">
          <h2>¿Está seguro que desea cancelar?</h2>
          <button onClick={() => handleConfirmarCancelar(true)}>Sí</button>
          <button onClick={() => handleConfirmarCancelar(false)}>No</button>
        </div>
      )}

      {mostrarConfirmarModal && (
        <div className="modal">
          <h2>¿Está seguro que desea confirmar la reserva?</h2>
          <button onClick={handleConfirmarReservaAceptado}>Sí</button>
          <button onClick={() => setMostrarConfirmarModal(false)}>No</button>
        </div>
      )}
    </div>
  );
};

export default DetalleReserva;
