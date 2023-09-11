import { Navigate,Route} from "react-router-dom";
import { useAuth} from "../auth/AuthProvider";
import { useState } from "react";

export function ProtectedRoute({children}){
    const auth = useAuth()

    return auth.isAuthenticated ? children : <Navigate to="/"/>
}

export function ProtectedRoute2({children}){
    const auth = useAuth()

    return auth.isAuthenticated ? children : <Navigate to="/"/>
}