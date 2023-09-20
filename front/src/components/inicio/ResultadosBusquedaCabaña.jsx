import React, { useState, useEffect } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResultadosBusquedaCabaña = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resultados, fechaInicio, fechaFin } = location.state;
  const [precios, setPrecios] = useState({}); // Estado para almacenar los precios de tipos de cabaña

  useEffect(() => {
    // Obtenemos los costos de cada tipo de cabaña y los almacenamos en el estado de precios
    resultados.forEach((cabaña) => {
      axios
        .get(`http://localhost:8080/api/cabañas/tipos/${cabaña.tipoCabaña.idtipoCabaña}/costoactual`)
        .then((response) => {
          setPrecios((prevPrecios) => ({
            ...prevPrecios,
            [cabaña.idcabaña]: response.data,
          }));
        })
        .catch((error) => {
          console.error('Error al obtener el costo:', error);
        });
    });
  }, [resultados]);

  const calcularPrecioTotal = (cabaña) => {
    const costo = precios[cabaña.idcabaña];
    if (!costo) {
      return 'N/A'; // Si no se ha obtenido el costo, muestra 'N/A'
    }

    // Calculamos la cantidad de días entre la fecha de inicio y la fecha de fin
    const fechaInicioDate = new Date(fechaInicio);
    const fechaFinDate = new Date(fechaFin);
    const diferenciaTiempo = fechaFinDate - fechaInicioDate;
    const dias = diferenciaTiempo / (1000 * 3600 * 24);

    // Calculamos el precio total
    const precioTotal = (costo.valorInicial + costo.valorPorPersona * cabaña.tamaño) * dias;

    // Devolvemos el precio total calculado
    return precioTotal;
  };

  return (
    <div>
      <h2>Resultados de la Búsqueda de Cabañas</h2>
      <ul>
        {resultados.map((cabaña) => (
          <li key={cabaña.idcabaña}>
            <h3>Cabaña ID: {cabaña.idcabaña}</h3>
            <p>Tipo de Cabaña: {cabaña.tipoCabaña.nombre}</p>
            <p>Tamaño: {cabaña.tamaño}</p>
            <p>Costo Total: ${calcularPrecioTotal(cabaña)}</p>
            <p>Características:</p>
            <ul>
              {cabaña.tipoCabaña.caracteristicas.map((caracteristica) => (
                <li key={caracteristica.idCaracteristica}>
                  {caracteristica.nombreCaracteristica}
                </li>
              ))}
            </ul>
            <button
              onClick={() => {
                navigate(`/detalle-reserva/${cabaña.idcabaña}`, {
                  state: {
                    idCabaña: cabaña.idcabaña,
                    tamaño: cabaña.tamaño,
                    idtipoCabaña: cabaña.tipoCabaña.idtipoCabaña,
                    nombreTipoCabaña: cabaña.tipoCabaña.nombre,
                    caracteristicas: cabaña.tipoCabaña.caracteristicas,
                    costoTotal: calcularPrecioTotal(cabaña),
                    fechaInicio: fechaInicio,
                    fechaFin: fechaFin,
                  },
                });
              }}
            >
              Reservar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultadosBusquedaCabaña;

