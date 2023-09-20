import axios from 'axios';

// Crear una instancia personalizada de Axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // La URL de tu servidor de backend
});

// Obtener el token JWT del almacenamiento local (localStorage)
const token = localStorage.getItem('accessToken');

// Configurar las cabeceras para incluir el token JWT en todas las solicitudes
if (token) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Ahora puedes usar axiosInstance para realizar solicitudes HTTP en tu aplicación
export default axiosInstance;
