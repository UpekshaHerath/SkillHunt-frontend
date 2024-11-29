'use client';
import { createContext, useState, useEffect, ReactNode, useContext } from 'react';

// Define the shape of the AuthContext
interface AuthContextType {
  user: { token: string } | null;
  login: (token: string) => void;
  logout: () => void;
}

// Create the AuthContext with a default value of undefined
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the props for the AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<{ token: string } | null>(null);
  useContext(AuthContext);

  useEffect(() => {
    // Check if a token exists on app load
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token });
      console.log("Set the token in the auth context")
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setUser({ token });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
