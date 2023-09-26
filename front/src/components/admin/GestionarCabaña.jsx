import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import es from 'date-fns/locale/es';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './gestionarCabaña.css'


const GestionarCabaña = () => {
  const { id } = useParams();
  const [cabaña, setCabaña] = useState({});
  const [imagenIndex, setImagenIndex] = useState(0);
  const [nuevaImagen, setNuevaImagen] = useState(null);
  const [estados, setEstados] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState([null, null]);

  const fetchCabaña = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/cabañas/${id}`);
      setCabaña(response.data);
    } catch (error) {
      console.error('Error fetching cabaña:', error);
    }
  };

  const fetchEstados = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/cabañas/${id}/estados`);
      setEstados(response.data);
    } catch (error) {
      console.error('Error fetching estados:', error);
    }
  };

  const handleEliminarImagen = async (imagenId) => {
    try {
      await axios.delete(`http://localhost:8080/api/cabañas/${id}/imagenes/${imagenId}`);
      fetchCabaña();
    } catch (error) {
      console.error('Error eliminando imagen:', error);
    }
  };

  const handleAgregarImagen = async () => {
    if (nuevaImagen && nuevaImagen.length > 0) {
      try {
        const formData = new FormData();

        for (let i = 0; i < nuevaImagen.length; i++) {
          formData.append('files', nuevaImagen[i]);
        }

        await axios.post(`http://localhost:8080/api/cabañas/${id}/imagenes`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setNuevaImagen(null);
        console.log("hola") // Restablecer el campo de entrada de archivos
        fetchCabaña(); // Actualizar la lista de imágenes
      } catch (error) {
        fetchCabaña();
        console.error('Error al agregar imágenes:', error);
      }
    }
  };

  const handleEliminarMantenimiento = async (estadoId) => {
    try {
      await axios.delete(`http://localhost:8080/api/estados/cabañaestados/${estadoId}`);
      fetchEstados();
    } catch (error) {
      console.error('Error eliminando estado de mantenimiento:', error);
    }
  };

  const handleNextImage = () => {
    setImagenIndex((prevIndex) => (prevIndex === cabaña.imagenes.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrevImage = () => {
    setImagenIndex((prevIndex) => (prevIndex === 0 ? cabaña.imagenes.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    fetchCabaña();
    fetchEstados();
  }, [id]);

  const getExcludedDateIntervals = () => {
    const excludedIntervals = estados
      .filter((estado) => estado.nombre === 'Mantenimiento' || estado.nombre === 'Ocupada')
      .map((estado) => {
        const startDate = estado.fechaInicio ? new Date(estado.fechaInicio) : null;
        const endDate = estado.fechaFin ? new Date(estado.fechaFin) : null;

        if (startDate && endDate) {
          return { start: startDate, end: endDate };
        }

        return null;
      })
      .filter((interval) => interval !== null);

    return excludedIntervals;
  };

  const handleEnviarMantenimiento = async () => {
    if (selectedDateRange[0] && selectedDateRange[1]) {
      const fechaInicio = selectedDateRange[0].toISOString().substring(0, 10);
      const fechaFin = selectedDateRange[1].toISOString().substring(0, 10);

      try {
        await axios.post(`http://localhost:8080/api/cabañas/${id}/mantenimiento`, {
          id,
          nombre: 'Mantenimiento',
          fechaInicio,
          fechaFin,
        });
        setSelectedDateRange([null, null]);
        fetchEstados();
      } catch (error) {
        console.error('Error al enviar mantenimiento:', error);
      }
    } else {
      console.error('Las fechas de inicio y fin deben seleccionarse.');
    }
  };

  const currentImage = cabaña.imagenes && cabaña.imagenes[imagenIndex];

  return (
    <div className='gestionar-container'>
      <div className='gestionar-container2'>
        <div><h2>Gestionar Cabaña {id}</h2></div>
        <div>Tipo: {cabaña.tipocabaña}</div>
        <div>Capacidad: {cabaña.tamaño}</div>

        <div><h3>Imágenes Existentes</h3></div>
        <div>
          {currentImage && (
            <div id="imagen-container">
              <div id='cabaña-imagen-container'>
                <img className='cabaña-imagen'
                  src={`http://localhost:8080/api/cabañas/${id}/imagenes/${currentImage.id}`}
                  alt="Cabaña"
                />
              </div>
              <div className='botones-gestionar'>
                <div>
                  <button onClick={handlePrevImage}>Anterior</button>
                </div>
                <div>
                  <button onClick={() => handleEliminarImagen(currentImage.id)}>Eliminar</button>
                </div>
                <div>
                  <button onClick={handleNextImage}>Siguiente</button>
                </div>


              </div>
            </div>
          )}
          <div>
            <div>
              <div><input
                type="file"
                name=""
                onChange={(e) => setNuevaImagen(e.target.files)}
                multiple  
              />
              </div>
              <div><button onClick={handleAgregarImagen}>Agregar Imágenes</button></div>
            </div>

          </div>
        </div>

        <br></br>
        <div id='calendario-estados-container'>
          <div id='calendario-container'>
            <div><h3>Calendario de Estados</h3></div>
            <div>
              <DatePicker
                minDate={new Date()}
                renderCustomHeader={({
                  monthDate,
                  customHeaderCount,
                  decreaseMonth,
                  increaseMonth,
                }) => (
                  <div>
                    <button
                      aria-label="Previous Month"
                      className={
                        "react-datepicker__navigation react-datepicker__navigation--previous"
                      }
                      style={customHeaderCount === 1 ? { visibility: "hidden" } : null}
                      onClick={decreaseMonth}
                    >
                      <span
                        className={
                          "react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"
                        }
                      >
                        {"<"}
                      </span>
                    </button>
                    <span className="react-datepicker__current-month">
                      {monthDate.toLocaleString("es", {
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <button
                      aria-label="Next Month"
                      className={
                        "react-datepicker__navigation react-datepicker__navigation--next"
                      }
                      style={customHeaderCount === 0 ? { visibility: "hidden" } : null}
                      onClick={increaseMonth}
                    >
                      <span
                        className={
                          "react-datepicker__navigation-icon react-datepicker__navigation-icon--next"
                        }
                      >
                        {">"}
                      </span>
                    </button>
                  </div>
                )}
                selected={null}
                inline
                excludeDateIntervals={getExcludedDateIntervals()}
                dateFormat="dd/MM/yyyy"
                className="date-picker"
                monthsShown={2}
                selectsRange
                startDate={selectedDateRange[0]}
                endDate={selectedDateRange[1]}
                onChange={(dates) => setSelectedDateRange(dates)}
                locale={es}
              />
            </div>
            <div><button onClick={handleEnviarMantenimiento}>Enviar Mantenimiento</button></div>
          </div>
          <br></br>
          <div id='estados-container'>
            <div><h3>Estados</h3></div>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Fecha de Inicio</th>
                    <th>Fecha de Fin</th>
                    <th>Nombre</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {estados.map((estado) => (
                    <tr key={estado.id}>
                      <td>
                        {estado.fechaInicio ? (
                          new Date(estado.fechaInicio).toLocaleDateString('es', { locale: es })
                        ) : (
                          'Fecha no disponible'
                        )}
                      </td>
                      <td>
                        {estado.fechaFin ? (
                          new Date(estado.fechaFin).toLocaleDateString('es', { locale: es })
                        ) : (
                          'Fecha no disponible'
                        )}
                      </td>
                      <td>{estado.nombre}</td>
                      <td>
                        {estado.nombre === 'Mantenimiento' && (
                          <button onClick={() => handleEliminarMantenimiento(estado.id)}>
                            Eliminar Mantenimiento
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionarCabaña;
