import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './navbar.css';
import { decodeToken } from 'react-jwt';

const Navbar = () => {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userPermisos, setUserPermisos] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserPermisos = () => {
      if (token) {
        const decodedToken = decodeToken(token, 'secret');
        const permisos = decodedToken.permisos.map(p => p.nombre);
        setUserPermisos(permisos);
      }
    };
    fetchUserPermisos();
    
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
  }, [token]);

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
        {userPermisos.includes('VER_NUESTRAS_CABAÑAS') && <div><li><Link to="/cabañas">Nuestras cabañas</Link></li></div>}
        {userPermisos.includes('VER_OPINIONES') && <div><li><Link to= "/opiniones">Opiniones</Link></li></div>}
        <div>
          <div className={`menu-icon ${menuVisible ? 'open' : ''}`} onClick={handleToggleMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
      </div>
      <ol className={`nav-links ${menuVisible ? 'active' : ''}`}>
        {!token ? (
          <>
            <li><Link to="/login" onClick={handleToggleMenu}>Iniciar Sesión</Link></li>
            <li><Link to="/registro" onClick={handleToggleMenu}>Registrarse</Link></li>
          </>
        ) : (
          <>
            {userPermisos.includes('GESTIONAR_MI_RESERVA') && <li><Link to="/reservas" onClick={handleToggleMenu}>Mis reservas</Link></li>}
            {userPermisos.includes('GESTIONAR_MIS_DATOS') && <li><Link to="/perfil" onClick={handleToggleMenu}>Mi perfil</Link></li>}
            {userPermisos.some(permiso => ['GESTIONAR_RESERVAS', 'GESTIONAR_USUARIOS', 'GESTIONAR_TIPO_CABAÑA', 'GESTIONAR_ROLES', 'GESTIONAR_CABAÑAS', 'VER_GANANCIAS'].includes(permiso)) && (
              <li><Link to="/admin/reservas" onClick={handleToggleMenu}>Menú de administrador</Link></li>
            )}
            <li><Link onClick={handleLogout}>Cerrar sesión</Link></li>
          </>
        )}
      </ol>
    </div>
  );
};

export default Navbar;
