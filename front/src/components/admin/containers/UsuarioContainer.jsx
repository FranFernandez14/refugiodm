import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../admin.css';
import Sidebar from '../Sidebar';
import ModificarUsuario from '../ModificarUsuario';

const UsuarioContainer = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchUsuarios(currentPage);
    fetchRoles();
  }, [currentPage]);

  const fetchUsuarios = async (page) => {
    try {
      const response = await axios.get(
        'http://localhost:8080/api/usuarios',
        {
          params: {
            page: page,
            size: 10
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );      
      setUsuarios(response.data.content ? response.data.content : []);
    } catch (error) {
      console.error('Error fetching usuarios:', error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8080/api/usuarios/roles',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );      
      setRoles(response.data);
      setSelectedRoles(
        response.data.reduce((acc, role) => {
          return { ...acc, [role.id]: "" };
        }, {})
      );
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const handleRoleChange = async (userId, roleId) => {
    try {
      await axios.put(
        'http://localhost:8080/api/usuarios/cambiarRol',
        {
          idUsuario: userId,
          idRol: roleId
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      // Refresh users after role change
      fetchUsuarios(currentPage);
    } catch (error) {
      console.error('Error changing role:', error);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <div className='admin-container'>
        <Sidebar />
        <div className='admin-right-content'>
          <div className='admin-usuario'>
            <h2>Usuarios</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Nombre</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.nombre + ' ' + usuario.apellido}</td>
                    <td>
                      <select
                        value={selectedRoles[usuario.id]}
                        onChange={(e) => {
                          setSelectedRoles({
                            ...selectedRoles,
                            [usuario.id]: e.target.value
                          });
                          handleRoleChange(usuario.id, e.target.value);
                        }}
                      >
                        <option value="" disabled hidden>
                          {usuario.rol}
                        </option>
                        {roles.map((rol) => (
                          <option key={rol.id} value={rol.id}>{rol.nombre}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      {usuario.fechaHoraBaja == null ? <div>Alta</div> : <div>Baja</div>}
                    </td>
                    <td>
                      <ModificarUsuario usuario={usuario} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='numPagina'>
            <button onClick={goToPreviousPage}>Anterior</button>
            <span>Página {currentPage+1}</span>
            <button onClick={goToNextPage}>Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsuarioContainer;
