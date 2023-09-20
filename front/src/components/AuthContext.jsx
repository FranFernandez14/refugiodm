import React, { createContext, useState, useContext, useEffect } from 'react';

// Crea el contexto de autenticación
const AuthContext = createContext();

// Proveedor de autenticación que incluye el estado del token JWT
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // Función para verificar si el usuario está autenticado
  const isAuthenticated = () => {
    return !!token;
  };

  // Función para cerrar sesión
  const logout = () => {
    // Elimina el token del almacenamiento local
    localStorage.removeItem('accessToken');
    setToken(null);
  };

  useEffect(() => {
    // Obtiene el token del almacenamiento local al cargar la aplicación
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acceder al contexto de autenticación
const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth, AuthContext };
