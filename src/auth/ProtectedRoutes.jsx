import React from 'react'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoutes({ children }) {
    const token = localStorage.getItem('userToken');

        if (!token) {
            return <Navigate to='/login' replace/>
        }
            console.log(token);
        return children
}
