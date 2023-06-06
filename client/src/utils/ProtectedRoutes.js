import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import SessionStorageService from "./SessionStorageService";

const ProtectedRoute = () => {
  const isUserLoggedIn = SessionStorageService.getItem("user");
  return isUserLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
