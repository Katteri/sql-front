import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const ProtectedRoutes = () => {
  const { accessToken } = useAuth();
  console.log(accessToken);
  return accessToken ? <Outlet/> : <Navigate to='/login'/>;
}

export default ProtectedRoutes;
