import React from 'react';
import {Link} from 'react-router-dom';
import './Forbidden.css';


function Forbidden() {
  return (
    <div className='Cuadro'>
      <div className='Texto'>No tienes los permisos necesarios para realizar esta acción</div>
      <button className='atras'><Link to="/">Volver Atrás</Link></button>
    </div>
  )
}

export default Forbidden