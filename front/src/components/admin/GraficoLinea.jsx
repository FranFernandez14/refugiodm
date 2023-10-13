import React, { useEffect, useState } from 'react';
import { Line, Chart } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import Axios from 'axios';

ChartJS.register(...registerables);

const GraficoLinea = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Ganancias Mensuales',
        data: [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    Axios.get(`http://localhost:8080/api/ganancias/anual?year=${year}`).then((response) => {
      const labels = response.data.map((item) => item.mes);
      const ganancias = response.data.map((item) => item.monto);
      setData({
        labels,
        datasets: [
          {
            label: 'Ganancias Mensuales',
            data: ganancias,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      });
    });
  }, [year]);

  const years = Array.from({ length: new Date().getFullYear() - 2022 + 1 }, (_, index) => 2022 + index);

  return (
    <div>
      <h2>Ganancias Anuales Mes a Mes</h2>
      <label htmlFor="yearSelector">Selecciona el año: </label>
      <select
        id="yearSelector"
        value={year}
        onChange={(e) => setYear(parseInt(e.target.value))}
      >
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
      <Line
        data={data}
        options={{
          scales: {
            x: {
              ticks: {
                callback: (value, index, values) => {
                  // Convierte el valor numérico del mes a su representación en español
                  return new Date(0, index, 1).toLocaleDateString('es-ES', { month: 'long' });
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default GraficoLinea;
