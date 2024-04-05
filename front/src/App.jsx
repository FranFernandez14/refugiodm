// Importa los componentes necesarios
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Modal from 'react-modal';
import Navbar from './components/navbar/Navbar';
import ReservaContainer from './components/admin/containers/ReservaContainer';
import UsuarioContainer from './components/admin/containers/UsuarioContainer';
import CabañaContainer from './components/admin/containers/CabañaContainer';
import TipoCabañaContainer from './components/admin/containers/TipoCabañaContainer';
import RutaAdmin from './routes/RutaAdmin';
import Login from './components/login/Login';
import Registro from './components/registro/Registro';
import ResultadosBusquedaCabaña from './components/inicio/ResultadosBusquedaCabaña';
import DetalleReserva from './components/reserva/DetalleReserva';
import { decodeToken } from 'react-jwt';
import Home from './components/pages/Home';
import './app.css'
import GestionarCabaña from './components/admin/GestionarCabaña';
import Perfil from './components/perfil/Perfil';
import GestionarReserva from './components/admin/GestionarReserva';
import ModificarDatos from './components/perfil/ModificarDatos';
import CambiarContraseña from './components/perfil/CambiarContraseña';
import ReservasUsuario from './components/reservas_usuario/ReservasUsuario';
import Calificar from './components/reservas_usuario/Calificar';
import EditarCalificacion from './components/reservas_usuario/EditarCalificacion';
import CalificacionContainer from './components/Calificaciones/CalificacionContainer'
import Ganancia from './components/admin/Ganancia';
import VerificacionDeToken from './components/recuperacion/VerificacionDeToken';
import RecuperarContraseña from './components/recuperacion/RecuperarContraseña';
import GeneracionDeToken from './components/recuperacion/GeneracionDeToken';
import GestionarTipoCabaña from './components/admin/GestionarTipoCabaña';
import NuestrasCabañas from './components/nuestras_cabañas/NuestrasCabañas';
import ErrorPermiso from './components/error/ErrorPermisos';
import GestionarRoles from './components/admin/GestionarRoles';
import PrivateRoute from './routes/PrivateRoute';
import Forbidden from './routes/Forbidden';

const App = () => {
  const [mostrarError, setMostrarError] = useState(false);
  const abrirModalError = () => {
    setMostrarError(true);
  };
  const [userPermisos, setUserPermisos] = useState([]);

  const cerrarModalError = () => {
    setMostrarError(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = decodeToken(token, 'secret');
      setUserPermisos(decodedToken.permisos.map(permiso => permiso.nombre));
    }
  }, []);

  return (
    <BrowserRouter>
      {<Navbar />}
      <div className='wrapper'>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/generar-token" element={<GeneracionDeToken />} />
          <Route path="/verificar-token" element={<VerificacionDeToken />} />
          <Route path="/recuperar-contraseña" element={<RecuperarContraseña />} />
          <Route path="/resultados-busqueda" element={<PrivateRoute component={ResultadosBusquedaCabaña} permiso={"BUSCAR_CABAÑA"} />} />
          <Route path="/detalle-reserva/:idReserva" element={<PrivateRoute component={DetalleReserva} permiso={"BUSCAR_CABAÑA"} />} />
          <Route path="/opiniones" element={<PrivateRoute component={CalificacionContainer} permiso={"VER_OPINIONES"} />} />

          {/* Rutas que requieren autorización */}
          <Route path="/cabañas" element={<PrivateRoute component={NuestrasCabañas} permiso="VER_NUESTRAS_CABAÑAS" />} />
          <Route path="/perfil" element={<PrivateRoute component={Perfil} permiso="GESTIONAR_MIS_DATOS" />} />
          <Route path="/perfil/modificardatos" element={<PrivateRoute component={ModificarDatos} permiso={"GESTIONAR_MIS_DATOS"} />} />
          <Route path="/perfil/cambiarcontraseña" element={<PrivateRoute component ={CambiarContraseña} permiso={"GESTIONAR_MIS_DATOS"}/>} />
          <Route path="/reservas" element={<PrivateRoute component={ReservasUsuario} permiso="GESTIONAR_MI_RESERVA" />} />
          <Route path="/calificar/:idReserva" element={<PrivateRoute component={Calificar} permiso="GESTIONAR_MI_RESERVA" />} />
          <Route path="/editar-calificacion/:idReserva" element={<PrivateRoute component={EditarCalificacion} permiso="GESTIONAR_MI_RESERVA" />} />

          {/* Rutas de administrador */}
          <Route path="/admin/reservas" element={<PrivateRoute component={ReservaContainer} permiso="GESTIONAR_RESERVAS" />} />
          <Route path="/gestionarreserva/:id" element={<PrivateRoute component={GestionarReserva} permiso="GESTIONAR_RESERVAS" />} />
          <Route path="/admin/roles" element={<PrivateRoute component={GestionarRoles} permiso="GESTIONAR_ROLES" />} />
          <Route path="/admin/usuarios" element={<PrivateRoute component={UsuarioContainer} permiso="GESTIONAR_USUARIOS" />} />
          <Route path="/admin/cabañas" element={<PrivateRoute component={CabañaContainer} permiso="GESTIONAR_CABAÑAS" />} />
          <Route path="/gestionarcabaña/:id" element={<PrivateRoute component={GestionarCabaña} permiso="GESTIONAR_CABAÑAS" />} />
          <Route path="/gestionartipo/:id" element={<PrivateRoute component={GestionarTipoCabaña} permiso="GESTIONAR_TIPO_CABAÑA" />} />
          <Route path="/admin/tipos-cabaña" element={<PrivateRoute component={TipoCabañaContainer} permiso="GESTIONAR_TIPO_CABAÑA" />} />
          <Route path="/admin/ganancias" element={<PrivateRoute component={Ganancia} permiso="VER_GANANCIAS" />} />

          {/* Ruta Forbidden */}
          <Route path="/forbidden" element={<Forbidden />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
