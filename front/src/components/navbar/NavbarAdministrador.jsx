import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './navbar.css';

export default function NavbarAdministrador() {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleToggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
    window.location.reload();
  };

  const handleMisReservas = () => {
    navigate('/misreservas');
  };

  const handleAdmin = () => {
    navigate('/admin/reservas');
  };

  const handlePerfil = () => {
    navigate('/perfil');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <h2>Refugio de montaña</h2>
      <div className='botones'>
        <div><li><a href="#cabañas">Nuestras cabañas</a></li></div>
        <div><li><a href="#opiniones">Opiniones</a></li></div>
        <div><div className={`menu-icon ${menuVisible ? 'open' : ''}`} onClick={handleToggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        </div>
      </div>
      <ul className={`nav-links ${menuVisible ? 'active' : ''}`}>
        <li><button onClick={handleAdmin} className="nav-button">Menú de Administrador</button></li>
        <li><button onClick={handleMisReservas} className="nav-button">Mis Reservas</button></li>
        <li><button onClick={handlePerfil} className="nav-button">Perfil</button></li>
        <li><button onClick={handleLogout} className="nav-button">Cerrar Sesión</button></li>
      </ul>
    </div>
  );
}
