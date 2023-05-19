import React, { useContext } from 'react'
import { Navigate, useLoaderData } from 'react-router-dom'
import { AuthContext } from '../context';

export const ProtectedRoute = ({ Component }) => {
    const { logged } = useContext(AuthContext)
    const data = useLoaderData()

    if (!logged) {
        return <Navigate to="/" />;
    }
    return <Component protectedData={data} />;
};
