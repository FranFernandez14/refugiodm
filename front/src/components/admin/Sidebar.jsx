import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css'
import { decodeToken } from 'react-jwt';

const Sidebar = () => {
    const [userRoles, setUserRoles] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        if (token) {
            const decodedToken = decodeToken(token, 'secret');
            const cantRoles = decodedToken.cantRoles;

            setUserRoles(cantRoles);
        }
    }, []);


    return (
        <div className="sidebar">

            <ol className='sidebar-buttons'>
                <li><Link to="/admin/reservas">Reservas</Link></li>
                {userRoles > 2 && (
                    <>
                        <li><Link to="/admin/usuarios">Usuarios</Link></li>
                        <li><Link to="/admin/tipos-cabaña">Tipos de Cabaña</Link></li>
                        <li><Link to="/admin/cabañas">Cabañas</Link></li>
                        <li><Link to="/admin/ganancias">Ganancias</Link></li>
                    </>)}
            </ol>


        </div>
    );
};

export default Sidebar;
