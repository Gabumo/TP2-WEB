import { Outlet, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export const RoutePrivee = () => {
    const { isAuthenticated, isLoading, error } = useAuth0();

    if (isLoading) {
        return <div>Chargement en cours...</div>;
    }
    if (error) {
        return <div>Erreur: {error.message}</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/se-connecter" />;
};