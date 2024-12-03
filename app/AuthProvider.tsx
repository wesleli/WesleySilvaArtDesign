
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type AuthContextType = {
  login: (username: string, password: string) => boolean;
  isAuthenticated: boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);



export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const login = (username: string, password: string) => {
    // Lógica para autenticar usuário
    if (username === "admin" && password === "admin1234") {
      setIsAuthenticated(true);
      return true;
    }
    return false;
    
  };
  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ login, isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};