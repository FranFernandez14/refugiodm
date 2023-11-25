import React from 'react';
import './admin.css';
import { Link } from 'react-router-dom';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const Reserva = ({ reservas, estadoReserva }) => {
  return (
    <div className="reserva-container-mod">

      <div className='reserva-table'>
        <h2>Reservas {estadoReserva}</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cantidad de Personas</th>
              <th>Número de cabaña</th>
              <th>Monto Total</th>
              <th>Fecha de inicio</th>
              <th>Fecha de fin</th>
              <th>Estado Actual</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => (
              <tr key={reserva.idReserva}>
                <td>{reserva.idReserva}</td>
                <td>{reserva.idCabaña}</td>
                <td>{reserva.cantPersonas}</td>
                <td>{reserva.montoTotal}</td>
                <td>{formatDate(reserva.fechaInicio)}</td>
                <td>{formatDate(reserva.fechaFin)}</td>
                <td>{reserva.estadoActual}</td>
                <td>
                  <button><Link className="modify-button" to={`/gestionarreserva/${reserva.idReserva}` }>Gestionar reserva</Link></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reserva;
