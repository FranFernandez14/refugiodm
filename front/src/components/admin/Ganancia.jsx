// Ganancia.jsx
import React, { useState } from 'react';
import GraficoBarra from './GraficoBarra';
import GraficoLinea from './GraficoLinea';
import Axios from 'axios';
import Sidebar from './Sidebar';
import './admin.css'

const Ganancia = () => {
    const [tipoGrafico, setTipoGrafico] = useState('mensual'); // 'mensual' o 'anual'
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // El mes actual

    const handleYearChange = (e) => {
        setSelectedYear(parseInt(e.target.value));
    };

    const handleMonthChange = (e) => {
        setSelectedMonth(parseInt(e.target.value));
    };

    return (

        <div className='admin-container'>
            <Sidebar />
            <div className='admin-right-content'>
                <div>
                    <button onClick={() => setTipoGrafico('mensual')} className='button-ganancia'>Mensual</button>
                    <button onClick={() => setTipoGrafico('anual')} className='button-ganancia button-ganancia-mod'>Anual</button>
                </div>
                {tipoGrafico === 'mensual' && (
                    <div>
                        <label>Año:</label>
                        <select onChange={handleYearChange} value={selectedYear}>
                            {Array.from({ length: new Date().getFullYear() - 2022 + 1 }, (_, i) => (
                                <option key={i} value={i + 2022}>
                                    {i + 2022}
                                </option>
                            ))}
                        </select>
                        <label>Mes:</label>
                        <select onChange={handleMonthChange} value={selectedMonth}>
                            {Array.from({ length: 12 }, (_, i) => (
                                <option key={i} value={i + 1}>
                                    {new Date(2022, i, 1).toLocaleDateString('es-ES', { month: 'long' })}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <div className='grafico'>
                    {tipoGrafico === 'mensual' ? (
                        <GraficoBarra year={selectedYear} month={selectedMonth} />
                    ) : (
                        <GraficoLinea year={selectedYear} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Ganancia;
