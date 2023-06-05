import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import LocalStorageService from "./LocalStorageService";

const ProtectedRoute = () => {
  const isUserLoggedIn = LocalStorageService.getItem("user");
  return isUserLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
