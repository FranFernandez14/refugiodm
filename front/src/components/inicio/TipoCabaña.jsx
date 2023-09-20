import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TipoCabaña = () => {
  const [tiposCabaña, setTiposCabaña] = useState([]);

  useEffect(() => {
    // Realizar una solicitud GET a la API para obtener tipos de cabaña
    axios
      .get('http://localhost:8080/api/cabañas/tipos')
      .then((response) => {
        // Al recibir la respuesta exitosa, actualiza el estado con los tipos de cabaña
        setTiposCabaña(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tipos de cabaña:', error);
      });
  }, []);

  return (
    <div>
      <h2>Tipos de Cabaña</h2>
      <ul>
        {tiposCabaña.map((tipoCabaña) => (
          <li key={tipoCabaña.idtipoCabaña}>
            <p>ID: {tipoCabaña.idtipoCabaña}</p>
            <p>Nombre: {tipoCabaña.nombre}</p>
            {/* Mostrar otros detalles de tipoCabaña */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TipoCabaña;
