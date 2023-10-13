import React, { useEffect, useState } from 'react';
import { Bar, Chart } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);
import Axios from 'axios';

const GraficoBarra = ({ year, month }) => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Ganancias Diarias',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    Axios.get(`http://localhost:8080/api/ganancias/mensual?year=${year}&month=${month}`).then((response) => {
      const lastDay = new Date(year, month, 0).getDate(); // Obtenemos el último día del mes
      const labels = Array.from({ length: lastDay }, (_, index) => {
        const day = index + 1;
        return new Date(year, month - 1, day).toLocaleDateString('es-ES', { day: '2-digit' });
      });
      const ganancias = response.data.map((item) => item.monto);
      setData({
        labels,
        datasets: [
          {
            label: 'Ganancias Diarias',
            data: ganancias,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1,
          },
        ],
      });
    });
  }, [year, month]);

  return (
    <div>
      <h2>Ganancias Mensuales Día a Día</h2>
      <Bar data={data} />
    </div>
  );
};

export default GraficoBarra;
