import { Route, Navigate } from 'react-router-dom';
import { decodeToken } from 'react-jwt';

function PrivateRoute({component: Component, permiso }) {
  let token = null;
  token = localStorage.getItem('token');
  const userPermisos = token ? decodeToken(token, 'secret').permisos.map(p => p.nombre) : [];
  
  if(token == null){
    return <Navigate to ="/login"/>
  }

  if (permiso && !userPermisos.includes(permiso)) {
    return <Navigate to="/forbidden" />;
  }
  
  return (<Component />);
}

export default PrivateRoute;
