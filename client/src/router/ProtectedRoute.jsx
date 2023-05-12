import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context';

export const ProtectedRoute = ({ children }) => {
    const { logged } = useContext(AuthContext)

    if (!logged) {
        return <Navigate to="/" />;
    }
    return children;
};
