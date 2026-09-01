import React, { createContext } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const user = { email: 'usuario@ejemplo.com' };

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};
