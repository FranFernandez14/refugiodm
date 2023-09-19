import React from 'react';
import './admin.css';
import { useNavigate } from 'react-router-dom';

const Cabaña = ({ cabañas, tiposCabaña, selectedTipoCabaña, selectedTamaño, onTipoCabañaChange, onTamañoChange, onAddCabaña, onGestionarCabaña }) => {
  return (
    <div className='admin-right-content'>
      <h2>Cabañas</h2>
      <select value={selectedTipoCabaña} onChange={onTipoCabañaChange}>
        <option value="">Seleccione un tipo de cabaña</option>
        {tiposCabaña.map((tipoCabaña) => (
          <option key={tipoCabaña.idtipoCabaña} value={tipoCabaña.nombre}>
            {tipoCabaña.nombre}
          </option>
        ))}
      </select>
      <input
        type="number"
        value={selectedTamaño}
        onChange={onTamañoChange}
        placeholder="Tamaño de Cabaña"
      />
      <button onClick={onAddCabaña}>Agregar Cabaña</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tamaño</th>
            <th>Tipo de Cabaña</th>
            <th>Acciones</th> {/* Añadimos la columna de acciones */}
          </tr>
        </thead>
        <tbody>
          {cabañas.map((cabaña) => (
            <tr key={cabaña.idcabaña}>
              <td>{cabaña.idcabaña}</td>
              <td>{cabaña.tamaño}</td>
              <td>{cabaña.tipoCabaña.nombre}</td>
              <td>
                <button onClick={() => onGestionarCabaña(cabaña.idcabaña)}>Gestionar Cabaña</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cabaña;
