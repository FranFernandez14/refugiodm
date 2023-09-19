import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import es from 'date-fns/locale/es';
import './buscadorCabaña.css'
import Person from '../../assets/person.svg'
import Calendar from '../../assets/calendar.svg'
import Cabin from '../../assets/cabin.svg'

const BuscadorCabaña = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [cantPersonas, setCantPersonas] = useState(1);
  const [idTipoCabaña, setIdTipoCabaña] = useState('0');
  const [tiposCabaña, setTiposCabaña] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const fetchTiposCabaña = () => {
    axios
      .get('http://localhost:8080/api/cabañas/tipos')
      .then((response) => {
        setTiposCabaña(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los tipos de cabaña:', error);
      });
  };

  useEffect(() => {
    fetchTiposCabaña();
  }, []);

  const handleTipoCabañaChange = (event) => {
    setIdTipoCabaña(event.target.value);
  };

  const handlePersonasIncrement = () => {
    setCantPersonas(cantPersonas + 1);
  };

  const handlePersonasDecrement = () => {
    if (cantPersonas > 1) {
      setCantPersonas(cantPersonas - 1);
    }
  };

  const handleBuscarClick = () => {
    const [fechaInicio, fechaFin] = dateRange;

    if (fechaInicio && fechaFin && cantPersonas >= 1) {
      if (fechaFin <= fechaInicio) {
        setError('La fecha de salida debe ser posterior a la fecha de entrada.');
      } else {
        axios
          .get(`http://localhost:8080/api/cabañas/buscar`, {
            params: {
              fechaInicio: fechaInicio.toISOString().substring(0, 10),
              fechaFin: fechaFin.toISOString().substring(0, 10),
              cantPersonas,
              idTipoCabaña,
            },
          })
          .then((response) => {
            navigate('/resultados-busqueda', {
              state: { resultados: response.data, fechaInicio, fechaFin },
            });
          })
          .catch((error) => {
            console.error('Error en la búsqueda de cabañas:', error);
          });
      }
    } else {
      setError('Seleccione las fechas');
    }
  };

  return (
    <div className="buscador">
      <div className='buscador2'>
        <div className='buscador3-1'>
          <div className='labels'>
            <div className='sublabels'>
              <div><img src={Cabin} width="50px" height="50px" /></div>
              <div>
                <select className='selector' value={idTipoCabaña} onChange={handleTipoCabañaChange}>
                  <option value="">Todas</option>
                  {tiposCabaña.map((tipoCabaña) => (
                    <option key={tipoCabaña.idtipoCabaña} value={tipoCabaña.idtipoCabaña}>
                      {tipoCabaña.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className='labels'>
            <div className='sublabels'>
              <div>
                <div className='icono'>
                  <img src={Person} width="45px" height="45px" /></div>
                <div className='personas'>
                  <button className='button1' onClick={handlePersonasDecrement}>-</button>
                  <div className='spanP'><span><div className='spanP'>{cantPersonas}</div></span></div>
                  <button className='button2' onClick={handlePersonasIncrement}>+</button>
                </div>
              </div>
            </div>
          </div>
          <div className='labels'>
            <div className='sublabels'>
              <div><img src={Calendar} width="38px" height="38px" /></div>
              <div><DatePicker
                dateFormat="dd/MM/yyyy"
                className='date-picker'
                selected={dateRange[0]}
                startDate={dateRange[0]}
                endDate={dateRange[1]}
                onChange={(dates) => setDateRange(dates)}
                minDate={new Date()}
                monthsShown={2}
                selectsRange
                locale={es}
                closeOnScroll={true}
                calendarClassName="custom-month-container"
                placeholderText={error && String(error)}
              />
              </div>
            </div>
          </div>
        </div>
        <div className='buscador3-2'>
          <button className='buscar' onClick={handleBuscarClick}>Buscar</button>
        </div>
      </div>
    </div>
  );
};
export default BuscadorCabaña;
