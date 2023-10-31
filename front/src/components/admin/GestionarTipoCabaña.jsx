import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import './gestionarTipoCabaña.css'

const GestionarTipoCabaña = () => {
    const { id } = useParams();

    const [costos, setCostos] = useState([]);
    const [nuevoCosto, setNuevoCosto] = useState({ valorInicial: 0, valorPorPersona: 0 });
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [selectedCaracteristicaNombre, setSelectedCaracteristicaNombre] = useState('');

    const [caracteristicasTipoCabaña, setCaracteristicasTipoCabaña] = useState([]);
    const [tipoCabaña, setTipoCabaña] = useState(null);
    const [modificandoDescripcion, setModificandoDescripcion] = useState(false);
    const [nuevaDescripcion, setNuevaDescripcion] = useState('');
    const [descripcionModificada, setDescripcionModificada] = useState(false);

    useEffect(() => {
        const fetchTipoCabaña = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/cabañas/tipos/${id}`);
                setTipoCabaña(response.data);
                setNuevaDescripcion(response.data.descripcion);
            } catch (error) {
                console.error('Error fetching tipo de cabaña:', error);
            }
        };
        fetchTipoCabaña();
    }, [id]);

    function formatearFecha(fecha) {
        if (!fecha || isNaN(fecha)) {
            return '-';
        }
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(fecha).toLocaleDateString(undefined, options);

    }

    const fetchCostos = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/cabañas/tipos/costos/vercostos/${id}`);
            setCostos(response.data);
        } catch (error) {
            console.error('Error fetching costos:', error);
        }
    };

    useEffect(() => {
        fetchCostos();
    }, [id]);

    const fetchCaracteristicasTipoCabaña = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/cabañas/tipos/${id}/caracteristicas`);
            setCaracteristicasTipoCabaña(response.data);
        } catch (error) {
            console.error('Error fetching características del tipo de cabaña:', error);
        }
    };

    useEffect(() => {
        fetchCaracteristicasTipoCabaña();
    }, [id]);

    const handleModificarDescripcion = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/cabañas/tipos/${id}/modificarDescripcion`, {
                descripcion: nuevaDescripcion,
            });

            if (response.status === 200) {
                setDescripcionModificada(true);
            }
        } catch (error) {
            console.error('Error modifying description:', error);
        }
    };

    const handleAgregarCaracteristica = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/cabañas/tipos/agregarCaracteristica', {
                idTipoCabaña: id,
                nombreCaracteristica: selectedCaracteristicaNombre,
            });

            if (response.status === 200) {
                fetchCaracteristicasTipoCabaña();
                setSelectedCaracteristicaNombre('');
            }
        } catch (error) {
            console.error('Error adding característica to tipo de cabaña:', error);
        }
    };

    const handleEliminarCaracteristica = async (nombreCaracteristica) => {
        try {
            const response = await axios.post('http://localhost:8080/api/cabañas/tipos/eliminarCaracteristica', {
                idTipoCabaña: id,
                nombreCaracteristica,
            });

            if (response.status === 200) {
                fetchCaracteristicasTipoCabaña();
            }
        } catch (error) {
            console.error('Error removing característica from tipo de cabaña:', error);
        }
    };

    const handleAgregarCosto = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/cabañas/tipos/costos/crear`, {
                ...nuevoCosto,
                idTipoCabaña: id,
            });

            if (response.status === 200) {
                fetchCostos();
                setNuevoCosto({ valorInicial: 0, valorPorPersona: 0 });
                setMostrarFormulario(false);
            }
        } catch (error) {
            console.error('Error al agregar el costo:', error);
        }
    };



    const handleModificarDescripcionClick = () => {
        setModificandoDescripcion(true);
        setDescripcionModificada(false);
    };

    return (
        <div className="admin-container">
            <Sidebar></Sidebar>
            <div className="admin-right-content">
                {tipoCabaña && (
                    <div>
                        <h3>Tipo de cabaña: {tipoCabaña.nombre}</h3>
                        <div>
                            <h4>Descripción:</h4>
                            <div>
                                <textarea
                                    value={nuevaDescripcion}
                                    onChange={(e) => setNuevaDescripcion(e.target.value)
                                    }
                                    className='desc'
                                ></textarea>
                                <button onClick={handleModificarDescripcion}>Guardar Descripción</button>
                                {descripcionModificada && (
                                    <p style={{ color: 'green' }}>Descripción modificada correctamente</p>

                                )}
                            </div>
                        </div>
                    </div>
                )}

                <h4>Historial de Costos:</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Valor Inicial</th>
                            <th>Valor por Persona</th>
                            <th>Fecha de Alta</th>
                            <th>Fecha de Baja</th>
                        </tr>
                    </thead>
                    <tbody>
                        {costos.map((costo) => (
                            <tr key={costo.IDCostoTipoCabaña}>
                                <td>{costo.valorInicial}</td>
                                <td>{costo.valorPorPersona}</td>
                                <td>{formatearFecha(new Date(costo.fechaHoraAlta))}</td>
                                <td>
                                    {costo.fechaHoraBaja ? (formatearFecha(new Date(costo.fechaHoraBaja))) : '-'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                
                    <div>
                        <h4>Nuevo Costo:</h4>
                        <div>
                            <label>Valor Inicial:</label>
                            <input
                                type="number"
                                value={nuevoCosto.valorInicial}
                                onChange={(e) => setNuevoCosto({ ...nuevoCosto, valorInicial: parseFloat(e.target.value) })}
                            />
                        </div>
                        <div>
                            <label>Valor por Persona:</label>
                            <input
                                type="number"
                                value={nuevoCosto.valorPorPersona}
                                onChange={(e) => setNuevoCosto({ ...nuevoCosto, valorPorPersona: parseFloat(e.target.value) })}
                            />
                        </div>
                        <button onClick={handleAgregarCosto}>Confirmar</button>
                    </div>

                <h4>Características del Tipo de Cabaña:</h4>
                <table>
                    <thead>
                        <tr>
                            <th>ID de Característica</th>
                            <th>Nombre de Característica</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {caracteristicasTipoCabaña.map((caracteristica) => (
                            <tr key={caracteristica.idCaracteristica}>
                                <td>{caracteristica.idCaracteristica}</td>
                                <td>{caracteristica.nombreCaracteristica}</td>
                                <td>
                                    <button onClick={() => handleEliminarCaracteristica(caracteristica.nombreCaracteristica)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h4>Agregar Nueva Característica:</h4>
                <input
                    type="text"
                    placeholder="Nombre de Característica"
                    value={selectedCaracteristicaNombre}
                    onChange={(e) => setSelectedCaracteristicaNombre(e.target.value)}
                />
                <button onClick={handleAgregarCaracteristica}>Agregar Característica</button>

            </div>
        </div>
    );
};

export default GestionarTipoCabaña;
