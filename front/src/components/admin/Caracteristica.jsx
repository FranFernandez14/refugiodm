import React, { useState } from 'react';
import Sidebar from './Sidebar';

const Caracteristica = ({ caracteristicas, onAddCaracteristica }) => {
  const [newCaracteristicaName, setNewCaracteristicaName] = useState('');

  const handleNewCaracteristicaChange = (event) => {
    setNewCaracteristicaName(event.target.value);
  };

  const handleAddCaracteristica = () => {
    onAddCaracteristica(newCaracteristicaName);
    setNewCaracteristicaName('');
  };

  return (
    <div className='admin-right-content'>
      <h2>Características</h2>
      <ul>
        {caracteristicas.map((caracteristica) => (
          <li key={caracteristica.idCaracteristica}>
            {caracteristica.nombreCaracteristica}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newCaracteristicaName}
          onChange={handleNewCaracteristicaChange}
          placeholder="Nueva característica"
        />
        <button onClick={handleAddCaracteristica}>Agregar Característica</button>
      </div>
    </div>
  );
};

export default Caracteristica;
