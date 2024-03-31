import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GestionarRoles = () => {
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState(null);
    const [permissionsOfSelectedRole, setPermissionsOfSelectedRole] = useState([]);
    const [allPermissions, setAllPermissions] = useState([]);
    const [newRoleName, setNewRoleName] = useState('');

    useEffect(() => {
        // Obtener los roles al montar el componente
        fetchRoles();
        fetchAllPermissions();
    }, []);

    const fetchRoles = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/usuarios/roles', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setRoles(response.data);
        } catch (error) {
            console.error('Error al obtener roles:', error);
        }
    };

    const fetchPermissionsOfRole = async (roleId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/usuarios/roles/${roleId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setPermissionsOfSelectedRole(response.data.permisos);
        } catch (error) {
            console.error('Error al obtener permisos del rol:', error);
        }
    };

    const fetchAllPermissions = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/permisos', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setAllPermissions(response.data);
        } catch (error) {
            console.error('Error al obtener todos los permisos:', error);
        }
    };

    const handleRoleSelect = (roleId) => {
        setSelectedRole(roleId);
        fetchPermissionsOfRole(roleId);
    };

    const handlePermissionAdd = async (permissionId) => {
        try {
            await axios.put('http://localhost:8080/api/usuarios/roles/agregarPermiso', {
                idRol: selectedRole,
                idPermiso: permissionId
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchPermissionsOfRole(selectedRole);
            fetchAllPermissions();
        } catch (error) {
            console.error('Error al agregar permiso:', error);
        }
    };

    const handlePermissionRemove = async (permissionId) => {
        try {
            await axios.put('http://localhost:8080/api/usuarios/roles/eliminarPermiso', {
                idRol: selectedRole,
                idPermiso: permissionId
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchPermissionsOfRole(selectedRole);
            fetchAllPermissions();
        } catch (error) {
            console.error('Error al eliminar permiso:', error);
        }
    };

    const handleNewRoleSubmit = async () => {
        if (newRoleName.trim() !== '') {
            try {
                await axios.post('http://localhost:8080/api/usuarios/roles/crearRol', {
                    nombre: newRoleName
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                fetchRoles();
                setNewRoleName('');
            } catch (error) {
                console.error('Error al crear nuevo rol:', error);
            }
        } else {
            alert('Por favor ingresa un nombre para el nuevo rol.');
        }
    };

    return (
        <div>
            <div className="column">
                <h2>Roles</h2>
                <ul>
                    {roles.map(role => (
                        <li 
                            key={role.id} 
                            onClick={() => handleRoleSelect(role.id)}
                            style={{ cursor: 'pointer', textDecoration: role.id === selectedRole ? 'underline' : 'none' }}
                        >
                            {role.nombre}
                        </li>
                    ))}
                </ul>
                <input
                    type="text"
                    placeholder="Nuevo Rol"
                    value={newRoleName}
                    onChange={(e) => setNewRoleName(e.target.value)}
                />
                <button onClick={handleNewRoleSubmit}>+</button>
            </div>
            <div className="column">
                <h2>Permisos del Rol</h2>
                <ul>
                    {permissionsOfSelectedRole.map(permission => (
                        <li key={permission.id}>
                            {permission.nombre}
                            <button onClick={() => handlePermissionRemove(permission.id)}>➡</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="column">
                <h2>Todos los Permisos</h2>
                <ul>
                    {allPermissions.map(permission => (
                        <li key={permission.id}>
                            <button onClick={() => handlePermissionAdd(permission.id)}>⬅</button>
                            {permission.nombre}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default GestionarRoles;
