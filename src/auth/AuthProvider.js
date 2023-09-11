// Importación de módulos y componentes
import { useContext, createContext, useState, useEffect } from "react";

// Props para AuthProvider (ajustado para uso correcto)
const AuthProviderProps = {
    children: React.ReactNode
};

// Creación del contexto de autenticación
const AuthContext = createContext({
    isAuthenticated: false,
});

// Componente AuthProvider
export function AuthProvider({ children = AuthProviderProps }) {
    // Estado para verificar si el usuario está autenticado
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    return <AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>
}

// Hook personalizado useAuth
export const useAuth = () => useContext(AuthContext);
