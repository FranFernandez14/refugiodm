import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './navbar.css';
import { decodeToken } from 'react-jwt';

export default function Navbar() {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userRoles, setUserRoles] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      const decodedToken = decodeToken(token, 'secret');
    }

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

  const handleToggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  return (
    <div className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div><Link to="/"><h2 className='logo'>Refugio de montaña</h2></Link></div>
      <div className='botones'>
        <div><li><Link to="/cabañas">Nuestras cabañas</Link></li></div>
        <div><li><Link to= "/opiniones">Opiniones</Link></li></div>
        <div>
          <div className={`menu-icon ${menuVisible ? 'open' : ''}`} onClick={handleToggleMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
      </div>
      <ol className={`nav-links ${menuVisible ? 'active' : ''}`}>
          <>
            <li><Link to="/login" onClick={handleToggleMenu}>Iniciar Sesión</Link></li>
            <li><Link to="/registro" onClick={handleToggleMenu}>Registrarse</Link></li>
          </>
       
          <>
            <li><Link to="/perfil" onClick={handleToggleMenu}>Mi perfil</Link></li>
            <li><Link to="/reservas" onClick={handleToggleMenu}>Mis reservas</Link></li>
            <li><Link onClick={handleLogout} >Cerrar sesión</Link></li>
          </>
        
          <>
            <li><Link to="/perfil" onClick={handleToggleMenu}>Mi perfil</Link></li>
            <li><Link to="/reservas" onClick={handleToggleMenu}>Mis reservas</Link></li>
            <li><Link to="/admin/reservas" onClick={handleToggleMenu}>Menú de administrador</Link></li>
            <li><Link onClick={handleLogout}>Cerrar sesión</Link></li>
          </>
        
      </ol>
    </div>
  );
}
