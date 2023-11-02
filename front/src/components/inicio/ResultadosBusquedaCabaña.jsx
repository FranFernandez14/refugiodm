import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './resultadosBusquedaCabaña.css';
import checkIcon from '../../assets/tilde-verde.svg'

const ResultadosBusquedaCabaña = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resultados, fechaInicio, fechaFin } = location.state;
  const [precios, setPrecios] = useState({});
  const [imagenIndex, setImagenIndex] = useState(0);

  useEffect(() => {
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
      return 'N/A';
    }

    const fechaInicioDate = new Date(fechaInicio);
    const fechaFinDate = new Date(fechaFin);
    const diferenciaTiempo = fechaFinDate - fechaInicioDate;
    const dias = diferenciaTiempo / (1000 * 3600 * 24);

    const precioTotal = (costo.valorInicial + costo.valorPorPersona * cabaña.tamaño) * dias;

    return precioTotal;
  };

  const handleImageChange = (index) => {
    setImagenIndex(index);
  };

  return (
    <div>
      <h2>Resultados de la Búsqueda de Cabañas</h2>
      <div className="cabañas-grid">
        {resultados.map((cabaña) => (
          <div key={cabaña.idcabaña} className="cabaña-card">
            <h3>Cabaña N° {cabaña.idcabaña}</h3>
            <p>Tipo de Cabaña: {cabaña.tipoCabaña.nombre}</p>
            <p>Tamaño: {cabaña.tamaño}</p>
            {cabaña.imagenes && cabaña.imagenes.length > 0 && (
              <div className="imagen-container">
                <Carousel
                  selectedItem={imagenIndex}
                  showThumbs={false}
                  onChange={handleImageChange}
                >
                  {cabaña.imagenes.map((imagen) => (
                    <div key={imagen.id}>
                      <img
                        className="cabaña-imagen"
                        src={`http://localhost:8080/api/cabañas/${cabaña.idcabaña}/imagenes/${imagen.id}`}
                        alt="Cabaña"
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
            )}
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
