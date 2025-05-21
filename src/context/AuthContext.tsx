import { createContext, useState, useContext, ReactNode } from 'react';
import { Admin, AuthContextType } from '../types';
import { mockAdmins } from '../data/mockData';

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  admin: null,
  login: async () => false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [admin, setAdmin] = useState<Admin | null>(null);

  // Mock login function (would be replaced with actual API call)
  const login = async (username: string, password: string): Promise<boolean> => {
    const foundAdmin = mockAdmins.find(
      (a) => a.adminUsername === username && a.adminPassword === password
    );

    if (foundAdmin) {
      setIsAuthenticated(true);
      // Remove password before storing in state
      const { adminPassword, ...adminData } = foundAdmin;
      setAdmin(adminData as Admin);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};