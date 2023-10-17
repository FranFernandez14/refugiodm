import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './nuestrasCabañas.css';
import checkIcon from '../../assets/tilde-verde.svg'

const NuestrasCabañas = () => {
    const [tiposCabañas, setTiposCabañas] = useState([]);

    useEffect(() => {
        const fetchTiposCabañas = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/cabañas/tipos/nuestrasCabañas');
                setTiposCabañas(response.data);
            } catch (error) {
                console.error('Error fetching tipos de cabañas:', error);
            }
        };
        fetchTiposCabañas();
    }, []);

    return (
        <div className="nuestras-cabañas-container">
            {tiposCabañas.map((tipoCabaña, index) => (
                <div key={index} className="tipo-cabaña-card">
                    <h2>{tipoCabaña.nombre}</h2>
                    <div className="divider"></div>
                    <p>{tipoCabaña.descripcion}</p>
                    <div className="divider"></div>
                    <div id="caracteristicas">
                        <ul>
                            {tipoCabaña.caracteristicas.map((caracteristica) => (
                                <li key={caracteristica.nombreCaracteristica}>
                                    <div className="caracteristica-item">
                                        <img src={checkIcon} alt="Check Icon" className="svg-icon" />
                                        <span>{caracteristica.nombreCaracteristica}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NuestrasCabañas;
