import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { decodeToken } from 'react-jwt';
import './detalleReserva.css'
import checkIcon from '../../assets/tilde-verde.svg'

const DetalleReserva = () => {
  const location = useLocation();
  const [id, setId] = useState(0);
  useEffect(() => {
    const token = localStorage.getItem('token');
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
    axios
      .post(
        'http://localhost:8080/api/reservas/reservar',
        {
          IDUsuario: id,
          IDCabaña: idCabaña,
          cantPersonas: tamaño,
          montoTotal: costoTotal,
          fechaInicio: fechaInicio.toISOString().substring(0, 10),
          fechaFin: fechaFin.toISOString().substring(0, 10),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setReservaConfirmada(true);
        }
      })
      .catch((error) => {
        console.error('Error al confirmar la reserva:', error);
      });
  };
  
  const handleCancelarReserva = () => {
    navigate('/');
  };

  return (
    <div className='detalle-reserva-container'>
      <div className='detalle-reserva'>
        <h2>Detalle de la Reserva</h2>
        <p>Cabaña N° {idCabaña}</p>
        <p>Tipo de Cabaña: {nombreTipoCabaña}</p>
        <p>Características:</p>
        <div id='caracteristicas'><ul>
          {caracteristicas.map((caracteristica) => (
            <li key={caracteristica.nombreCaracteristica}>
              <div className="caracteristica-item">
                <img src={checkIcon} alt="Check Icon" className="svg-icon" />
                <span>{caracteristica.nombreCaracteristica}</span>
              </div>
            </li>
          ))}
        </ul>
        </div>

        <p>Costo Total: ${costoTotal}</p>
        <p>Fecha de Inicio: {fechaInicio.toISOString().substring(0, 10)}</p>
        <p>Fecha de Fin: {fechaFin.toISOString().substring(0, 10)}</p>

        {reservaConfirmada ? (
          <p style={{ color: 'green' }}>Reserva confirmada</p>
        ) : (
          <div className='detalle-botones'>
            <div>
              <button onClick={handleConfirmarReserva}>Confirmar Reserva</button>
            </div>
            <div>
              <button onClick={handleCancelarReserva}>Cancelar</button>
            </div>
          </div>
        )}

        {reservaConfirmada && (
          <button onClick={() => navigate('/reservas')}>Ir a mis reservas</button>
        )}
      </div>
    </div>
  );
};

export default DetalleReserva;