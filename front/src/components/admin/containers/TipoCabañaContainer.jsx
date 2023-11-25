import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar';

const TipoCabañaContainer = () => {
  const [tiposCabaña, setTiposCabaña] = useState([]);

  useEffect(() => {
    const fetchTiposCabaña = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/cabañas/tipos');
        setTiposCabaña(response.data);
      } catch (error) {
        console.error('Error fetching tipos de cabaña:', error);
      }
    };
    fetchTiposCabaña();
  }, []);

  return (
    <div className='admin-container'>
      <Sidebar/>
      <div className="admin-right-content">
        <div><h2>Tipos de cabaña</h2></div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Cantidad de Cabañas</th>
              <th>Valor por Persona Actual</th>
              <th>Valor Inicial Actual</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tiposCabaña.map((tipoCabaña) => (
              <tr key={tipoCabaña.id}>
                <td>{tipoCabaña.id}</td>
                <td>{tipoCabaña.nombre}</td>
                <td>{tipoCabaña.cantCabañas}</td>
                <td>{tipoCabaña.valorPorPersonaActual}</td>
                <td>{tipoCabaña.valorInicialActual}</td>
                <td className='button-table-container'>
                  <button><Link className="modify-button" to={`/gestionartipo/${tipoCabaña.id}`}>Editar</Link></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TipoCabañaContainer;
