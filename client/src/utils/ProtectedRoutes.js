import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isUserLoggedIn = sessionStorage.getItem("user");
  return isUserLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
