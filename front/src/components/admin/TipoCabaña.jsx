import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const GestionarTipoCabaña = () => {
  const { id } = useParams();

  const [costos, setCostos] = useState([]);
  const [nuevoCosto, setNuevoCosto] = useState({ valorInicial: 0, valorPorPersona: 0 });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [selectedCaracteristica, setSelectedCaracteristica] = useState('');

  // Función para formatear la fecha
  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('es-ES', options);
  };

  const fetchCostos = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/cabañas/tipos/costos/vercostos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setCostos(response.data);
    } catch (error) {
      console.error('Error fetching costos:', error);
    }
  };

  const fetchCaracteristicas = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/cabañas/tipos/${id}/caracteristicas`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setCaracteristicas(response.data);
    } catch (error) {
      console.error('Error fetching características:', error);
    }
  };

  useEffect(() => {
    fetchCostos();
    fetchCaracteristicas();
  }, [id]);

  const handleAgregarCosto = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/cabañas/tipos/costos/crear`,
        {
          ...nuevoCosto,
          idTipoCabaña: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
  
      if (response.status === 200) {
        fetchCostos();
        setNuevoCosto({ valorInicial: 0, valorPorPersona: 0 });
        setMostrarFormulario(false);
      }
    } catch (error) {
      console.error('Error al agregar el costo:', error);
    }
  };
  

  const handleAgregarCaracteristica = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/cabañas/tipos/agregarCaracteristica`,
        {
          idTipoCabaña: id,
          idCaracteristica: selectedCaracteristica,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
  
      if (response.status === 200) {
        fetchCaracteristicas();
      }
    } catch (error) {
      console.error('Error al agregar la característica:', error);
    }
  };
  

  const handleEliminarCaracteristica = async (idCaracteristica) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/cabañas/tipos/eliminarCaracteristica`,
        {
          idTipoCabaña: id,
          idCaracteristica,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
  
      if (response.status === 200) {
        fetchCaracteristicas();
      }
    } catch (error) {
      console.error('Error al eliminar la característica:', error);
    }
  };
  

  return (
    <div className="admin-container">
      <div className="admin-right-content">
        <h3>Editar Tipo de Cabaña con ID: {id}</h3>

        <h4>Historial de Costos:</h4>
        <table>
          <thead>
            <tr>
              <th>ID de Costo</th>
              <th>Valor Inicial</th>
              <th>Valor por Persona</th>
              <th>Fecha/Hora de Alta</th>
              <th>Fecha/Hora de Baja</th>
            </tr>
          </thead>
          <tbody>
            {costos.map((costo) => (
              <tr key={costo.IDCostoTipoCabaña}>
                <td>{costo.IDCostoTipoCabaña}</td>
                <td>{costo.valorInicial}</td>
                <td>{costo.valorPorPersona}</td>
                <td>{formatFecha(costo.fechaHoraAlta)}</td>
                <td>{costo.fechaHoraBaja ? formatFecha(costo.fechaHoraBaja) : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {mostrarFormulario ? (
          <div>
            <h4>Nuevo Costo:</h4>
            <div>
              <label>Valor Inicial:</label>
              <input
                type="number"
                value={nuevoCosto.valorInicial}
                onChange={(e) => setNuevoCosto({ ...nuevoCosto, valorInicial: parseFloat(e.target.value) })}
              />
            </div>
            <div>
              <label>Valor por Persona:</label>
              <input
                type="number"
                value={nuevoCosto.valorPorPersona}
                onChange={(e) => setNuevoCosto({ ...nuevoCosto, valorPorPersona: parseFloat(e.target.value) })}
              />
            </div>
            <button onClick={handleAgregarCosto}>Confirmar</button>
          </div>
        ) : (
          <button onClick={() => setMostrarFormulario(true)}>Agregar Nuevo Costo</button>
        )}

        <h4>Características:</h4>
        <table>
          <thead>
            <tr>
              <th>ID de Característica</th>
              <th>Nombre de Característica</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {caracteristicas.map((caracteristica) => (
              <tr key={caracteristica.idCaracteristica}>
                <td>{caracteristica.idCaracteristica}</td>
                <td>{caracteristica.nombreCaracteristica}</td>
                <td>
                  <button onClick={() => handleEliminarCaracteristica(caracteristica.idCaracteristica)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <h4>Agregar Característica:</h4>
          <select onChange={(e) => setSelectedCaracteristica(e.target.value)}>
            <option value="">Seleccionar Característica</option>
            {caracteristicas.map((caracteristica) => (
              <option key={caracteristica.idCaracteristica} value={caracteristica.idCaracteristica}>
                {caracteristica.nombreCaracteristica}
              </option>
            ))}
          </select>
          <button onClick={handleAgregarCaracteristica}>Agregar Característica</button>
        </div>
      </div>
    </div>
  );
};

export default GestionarTipoCabaña;
