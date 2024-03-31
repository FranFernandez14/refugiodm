import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import GestionarRoles from './components/admin/GestionarRoles';



const App = () => {
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
    <BrowserRouter>
      {<Navbar/>}
      <div className='wrapper'>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/resultados-busqueda" element={<ResultadosBusquedaCabaña />} />
        <Route path="/detalle-reserva/:idReserva" element={<DetalleReserva />} />
        <Route path="/opiniones" element={<CalificacionContainer/>}/>
        <Route path="/cabañas" element={<NuestrasCabañas/>}/>

        
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/generar-token" element={<GeneracionDeToken/>}/>
            <Route path="/verificar-token" element={<VerificacionDeToken/>}/>
            <Route path="/recuperar-contraseña" element={<RecuperarContraseña/>}/>
          </>
       

        
          <>
            <Route path="/detalle-reserva/:idReserva" element={<DetalleReserva />} />
            <Route path="/perfil" element={<Perfil/>}/>
            <Route path="/perfil/modificardatos" element={<ModificarDatos/>}/>
            <Route path="/perfil/cambiarcontraseña" element={<CambiarContraseña/>}/>
            <Route path="/reservas" element={<ReservasUsuario/>}/>
            <Route path="/calificar/:idReserva" element={<Calificar/>}/>
            <Route path="/editar-calificacion/:idReserva" element={<EditarCalificacion/>}/>
          </>
       

        
          <>
            <Route path="/admin" element={<RutaAdmin />} />
            <Route path="/admin/reservas" element={<ReservaContainer />} />
            <Route path="/gestionarreserva/:id" element={<GestionarReserva />} />
            <Route path="/gestionartipo/:id" element={<GestionarTipoCabaña/>}/>
          </>
        

        
          <>
            <Route path="/admin/*" element={<RutaAdmin />} />
            <Route path="/admin/usuarios" element={<UsuarioContainer />} />
            <Route path="/admin/cabañas" element={<CabañaContainer />} />
            <Route path="/gestionarcabaña/:id" element={<GestionarCabaña />} />
            <Route path="/admin/tipos-cabaña" element={<TipoCabañaContainer />} />
            <Route path="/admin/ganancias" element={<Ganancia/>}/>
            <Route path="/admin/roles" element={<GestionarRoles/>}/>
          </>
        

        <Route
          path="/forbidden"
          element={<Navigate to="/" replace />}
        />
      </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
