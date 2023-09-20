import React from 'react';
import Sidebar from './Sidebar';
import './admin.css'

const Reserva = ({ reservas }) => {
  return (
    <div className='admin-right-content'>
      <h2>Reservas</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cantidad de Personas</th>
            <th>Número de cabaña</th>
            <th>Monto Total</th>
            <th>Nombre</th>
            <th>Fecha de inicio</th>
            <th>Fecha de fin</th>

          </tr>
        </thead>
        <tbody>
          {reservas.map((reserva) => (
            <tr key={reserva.idReserva}>
              <td>{reserva.idReserva}</td>
              <td>{reserva.cabaña.idcabaña}</td>
              <td>{reserva.cantPersonas}</td>
              <td>{reserva.montoTotal}</td>
              <td>{reserva.usuario.nombre + ' ' +reserva.usuario.apellido}</td>
              <td>{reserva.fechaInicio}</td>
              <td>{reserva.fechaFin}</td>
              {/* Agrega más celdas aquí */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reserva;
