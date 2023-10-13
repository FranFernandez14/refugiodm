import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const GestionarReserva = ({}) => {
  const [reserva, setReserva] = useState(null);

  const { id } = useParams();

  const idReserva = id;

  const fetchReserva = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/reservas/${idReserva}`);
      setReserva(response.data);
    } catch (error) {
      console.error('Error fetching reserva:', error);
    }
  };

  useEffect(() => {
    fetchReserva();
  }, []);

  const handleCancelarByAdmin = async () => {
    try {
      await axios.post(`http://localhost:8080/api/reservas/${idReserva}/cancelarByAdmin`);
      // Realizar alguna acción después de cancelar la reserva
      fetchReserva(); // Refetch de los datos después de la acción
    } catch (error) {
      console.error('Error cancelando la reserva:', error);
    }
  };

  const handleAceptarByAdmin = async () => {
    try {
      await axios.post(`http://localhost:8080/api/reservas/${idReserva}/aceptarByAdmin`);
      // Realizar alguna acción después de aceptar la reserva
      fetchReserva(); // Refetch de los datos después de la acción
    } catch (error) {
      console.error('Error aceptando la reserva:', error);
    }
  };

  const handleFinalizarByAdmin = async () => {
    try {
      await axios.post(`http://localhost:8080/api/reservas/${idReserva}/finalizarByAdmin`);
      // Realizar alguna acción después de finalizar la reserva
      fetchReserva(); // Refetch de los datos después de la acción
    } catch (error) {
      console.error('Error finalizando la reserva:', error);
    }
  };

  const handleIniciarByAdmin = async () => {
    try {
      await axios.post(`http://localhost:8080/api/reservas/${idReserva}/iniciarByAdmin`);
      // Realizar alguna acción después de aceptar la reserva
      fetchReserva(); // Refetch de los datos después de la acción
    } catch (error) {
      console.error('Error aceptando la reserva:', error);
    }
  };

  const formatDate = (dateString) => {
    if (dateString) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }
    return '-';
  };

  if (!reserva) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>Gestionar Reserva</h2>
      <div>
        <h3>Detalles de la reserva:</h3>
        <p>ID de Cabaña: {reserva.idCabaña}</p>
        <p>Cantidad de Personas: {reserva.cantPersonas}</p>
        <p>Monto Total: {reserva.montoTotal}</p>
        <p>Fecha de Reserva: {reserva.fechaReservaFormatted}</p>
        <p>Fecha de Inicio: {formatDate(reserva.fechaInicio)}</p>
        <p>Fecha de Fin: {formatDate(reserva.fechaFin)}</p>
        <p>Estado Actual: {reserva.estadoActual}</p>
        <p>Nombre de Usuario: {reserva.nombreUsuario}</p>
        <p>DNI: {reserva.dni}</p>
        <p>Email: {reserva.email}</p>
        <p>Teléfono: {reserva.telefono}</p>
      </div>
      <div>
        {reserva.estadoActual === 'Pendiente' && (
          <div>
            <button onClick={handleAceptarByAdmin}>Aceptar Reserva</button>
            <button onClick={handleCancelarByAdmin}>Cancelar Reserva</button>
          </div>
        )}
        {reserva.estadoActual === 'Aceptada' && (
          <div>
            <button onClick={handleCancelarByAdmin}>Cancelar Reserva</button>
            <button onClick={handleIniciarByAdmin}>Iniciar Reserva</button>
          </div>
        )}
        {reserva.estadoActual === 'Iniciada' && (
          <div>
            <button onClick={handleFinalizarByAdmin}>Finalizar Reserva</button>
          </div>
        )}
        {reserva.estadoActual === 'Cancelada' && (
          <div>
            <button onClick={handleAceptarByAdmin}>Aceptar Reserva</button>
          </div>
        )}
      </div>
      <div>
        <h3>Estados de la reserva:</h3>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {reserva.estados.map((estado, index) => (
              <tr key={index}>
                <td>{estado.nombre}</td>
                <td>{estado.fechaInicioREFormatted}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default GestionarReserva;