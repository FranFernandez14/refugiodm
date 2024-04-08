import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';
import { decodeToken } from 'react-jwt';

const Sidebar = () => {
    const [userPermisos, setUserPermisos] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const permisos = token ? decodeToken(token, 'secret').permisos.map(p => p.nombre) : [];
        setUserPermisos(permisos);
    }, []);

    return (
        <div className="sidebar">
            <ol className='sidebar-buttons'>
                {userPermisos.includes('GESTIONAR_RESERVAS') && <li><Link to="/admin/reservas">Reservas</Link></li>}
                {userPermisos.includes('GESTIONAR_USUARIOS') && <li><Link to="/admin/usuarios">Usuarios</Link></li>}
                {userPermisos.includes('GESTIONAR_TIPO_CABAÑA') && <li><Link to="/admin/tipos-cabaña">Tipos de Cabaña</Link></li>}
                {userPermisos.includes('GESTIONAR_CABAÑAS') && <li><Link to="/admin/cabañas">Cabañas</Link></li>}
                {userPermisos.includes('VER_GANANCIAS') && <li><Link to="/admin/ganancias">Ganancias</Link></li>}
                {userPermisos.includes('GESTIONAR_ROLES') && <li><Link to="/admin/roles">Roles</Link></li>}
            </ol>
        </div>
    );
};

export default Sidebar;

