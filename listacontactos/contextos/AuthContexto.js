import React, { createContext } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const user = { email: 'usuario@app.com' };

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};
