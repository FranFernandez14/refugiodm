import React, { useState, useEffect } from 'react';
import './admin.css';
import axios from 'axios';

const TipoCabaña = ({
  tipoCabaña,
  caracteristicas,
  selectedCaracteristicaId,
  onAgregarCaracteristica,
  onEliminarCaracteristica,
  onCaracteristicaChange,
}) => {
  const [costoActual, setCostoActual] = useState(null); // Estado para almacenar el costo actual
  const [nuevoCosto, setNuevoCosto] = useState({ valorInicial: 0, valorPorPersona: 0 });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    // Obtener el costo actual del tipo de cabaña al cargar el componente
    axios
      .get(`http://localhost:8080/api/cabañas/tipos/${tipoCabaña.idtipoCabaña}/costoactual`)
      .then((response) => {
        setCostoActual(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener el costo actual:', error);
      });
  }, [tipoCabaña.idtipoCabaña]);

  const handleAgregarCosto = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/api/cabañas/tipos/costos/crear`, {
        ...nuevoCosto,
        idTipoCabaña: tipoCabaña.idtipoCabaña,
      });

      if (response.status === 200) {
        // Refrescar el costo actual después de una creación exitosa
        axios
          .get(`http://localhost:8080/api/cabañas/tipos/${tipoCabaña.idtipoCabaña}/costoactual`)
          .then((response) => {
            setCostoActual(response.data);
          })
          .catch((error) => {
            console.error('Error al obtener el costo actual:', error);
          });

        // Reiniciar el formulario y ocultar el formulario de creación
        setNuevoCosto({ valorInicial: 0, valorPorPersona: 0 });
        setMostrarFormulario(false);
      }
    } catch (error) {
      console.error('Error al agregar el costo:', error);
    }
  };

  return (
    <div className='admin-right-content'>
      <h3>{tipoCabaña.nombre}</h3>
      <p>ID: {tipoCabaña.idtipoCabaña}</p>
      <h4>Características:</h4>
      <ul>
        {tipoCabaña.caracteristicas.map((caracteristica) => (
          <li key={caracteristica.idCaracteristica}>
            {caracteristica.nombreCaracteristica}{' '}
            <button onClick={() => onEliminarCaracteristica(tipoCabaña.idtipoCabaña, caracteristica.idCaracteristica)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <select onChange={onCaracteristicaChange} value={selectedCaracteristicaId}>
        <option value="">Seleccionar Característica</option>
        {caracteristicas.map((caracteristica) => (
          <option key={caracteristica.idCaracteristica} value={caracteristica.idCaracteristica}>
            {caracteristica.nombreCaracteristica}
          </option>
        ))}
      </select>
      <button onClick={() => onAgregarCaracteristica(tipoCabaña.idtipoCabaña)}>Agregar</button>

      <h4>Costo Actual:</h4>
      {costoActual ? (
        <p>
          Valor Inicial: {costoActual.valorInicial} | Valor por Persona: {costoActual.valorPorPersona}
        </p>
      ) : (
        <p>No hay costo actual disponible.</p>
      )}

      {mostrarFormulario ? (
        <div>
          <h4>Nuevo Costo:</h4>
          <div>
            <label>Valor Inicial:</label>
            <input
              type='number'
              value={nuevoCosto.valorInicial}
              onChange={(e) => setNuevoCosto({ ...nuevoCosto, valorInicial: parseFloat(e.target.value) })}
            />
          </div>
          <div>
            <label>Valor por Persona:</label>
            <input
              type='number'
              value={nuevoCosto.valorPorPersona}
              onChange={(e) => setNuevoCosto({ ...nuevoCosto, valorPorPersona: parseFloat(e.target.value) })}
            />
          </div>
          <button onClick={handleAgregarCosto}>Confirmar</button>
        </div>
      ) : (
        <button onClick={() => setMostrarFormulario(true)}>Agregar Nuevo Costo</button>
      )}
    </div>
  );
};

export default TipoCabaña;



