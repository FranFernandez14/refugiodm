import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './resultadosBusquedaCabaña.css';
import checkIcon from '../../assets/tilde-verde.svg';

const ResultadosBusquedaCabaña = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resultados, fechaInicio, fechaFin } = location.state;
  const [precios, setPrecios] = useState({});
  // Usar un objeto para rastrear el índice de la imagen seleccionada por cabaña
  const [imagenIndices, setImagenIndices] = useState({});

  useEffect(() => {
    resultados.forEach((cabaña) => {
      axios
        .get(`http://localhost:8080/api/cabañas/tipos/${cabaña.tipoCabaña.idtipoCabaña}/costoactual`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((response) => {
          setPrecios((prevPrecios) => ({
            ...prevPrecios,
            [cabaña.idcabaña]: response.data,
          }));
          // Inicializar el índice de la imagen seleccionada para cada cabaña
          setImagenIndices((prevIndices) => ({
            ...prevIndices,
            [cabaña.idcabaña]: 0,
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
      return 'N/A';
    }

    const fechaInicioDate = new Date(fechaInicio);
    const fechaFinDate = new Date(fechaFin);
    const diferenciaTiempo = fechaFinDate - fechaInicioDate;
    const dias = diferenciaTiempo / (1000 * 3600 * 24);

    const precioTotal = (costo.valorInicial + costo.valorPorPersona * cabaña.tamaño) * dias;

    return precioTotal;
  };

  const handleImageChange = (cabañaId, index) => {
    // Actualizar el índice de la imagen seleccionada para la cabaña específica
    setImagenIndices((prevIndices) => ({
      ...prevIndices,
      [cabañaId]: index,
    }));
  };

  return (
    <div className='resultados-container'>
      <h2 className='resultados-title'>Resultados de la Búsqueda de Cabañas</h2>
      <div className="cabañas-grid">
        {resultados.map((cabaña) => (
          <div key={cabaña.idcabaña} className="cabaña-card">
            <div className='contenedor-caracteristicas'>
              <h3 className='cabaña-title'>Cabaña N° {cabaña.idcabaña}</h3>
              <p>Tipo de Cabaña: {cabaña.tipoCabaña.nombre}</p>
              <p>Tamaño: {cabaña.tamaño}</p>
            </div>
            {cabaña.imagenes && cabaña.imagenes.length > 0 && (
              <div className="imagen-container">
                <Carousel
                  selectedItem={imagenIndices[cabaña.idcabaña]} // Usar el índice específico
                  showThumbs={false}
                  onChange={(index) => handleImageChange(cabaña.idcabaña, index)} // Pasar el ID de la cabaña
                >
                  {cabaña.imagenes.map((imagen) => (
                    <div key={imagen.id} className=''>
                      <img
                        className="cabaña-imagen-mod"
                        src={`http://localhost:8080/api/cabañas/${cabaña.idcabaña}/imagenes/${imagen.id}`}
                        alt="Cabaña"
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
            )}
            <div className='contenedor-caracteristicas-mod'>
              <p>Costo Total: ${calcularPrecioTotal(cabaña)}</p>
              <p>Características:</p>
              <div id='caracteristicas'><ul>
                {cabaña.tipoCabaña.caracteristicas.map((caracteristica) => (
                  <li key={caracteristica.nombreCaracteristica}>
                    <div className="caracteristica-item">
                      <img src={checkIcon} alt="Check Icon" className="svg-icon" />
                      <span>{caracteristica.nombreCaracteristica}</span>
                    </div>
                  </li>
                ))}
              </ul>
              </div>
            </div>

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
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultadosBusquedaCabaña;
