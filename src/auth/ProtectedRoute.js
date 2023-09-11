import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

// Componente de ruta protegida que redirige a la página de inicio si el usuario no está autenticado
export function ProtectedRoute({ children }) {
    const auth = useAuth();

    return auth.isAuthenticated ? children : <Navigate to="/" />;
}

// Componente de ruta protegida que redirige a la página de inicio si el usuario no está autenticado
export function ProtectedRoute2({ children }) {
    const auth = useAuth();

    return auth.isAuthenticated ? children : <Navigate to="/" />;
}
