import React from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css';

export default function NavbarEmpleado() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
    window.location.reload();
  };

  const handleMisReservas = () => {
    navigate('/misreservas');
  };

  const handleMenuEmpleado = () => {
    navigate('/empleado');
  };

  const handlePerfil = () => {
    navigate('/perfil');
  };

  return (
    <div className='navbar'>
      <ul className='nav-link'>
        <li><h2>Refugio de montaña</h2></li>
      </ul>
      <ul className='nav-link'>
      <li><button onClick={handleMenuEmpleado} className="nav-button">Menú de empleado</button></li>
        <li><button onClick={handleMisReservas} className="nav-button">Mis Reservas</button></li>
        <li><button onClick={handlePerfil} className="nav-button">Perfil</button></li>
        <li><button onClick={handleLogout} className="nav-button">Cerrar Sesión</button></li>
      </ul>
    </div>
  );
}
