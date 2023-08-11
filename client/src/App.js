import "./App.css";
import Login from "./pages/Login";
import UserOrders from "./pages/FoodUserSummary";
import FoodSummary from "./pages/FoodSummary";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import FoodMenu from "./pages/FoodMenu";
import PastOrders from "./pages/PastOrders";
import { useEffect } from "react";
import ProtectedRoute from "./utils/ProtectedRoutes";
import Orders from "./pages/Orders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/foodMenu" element={<FoodMenu />} />
          <Route path="/currentOrder" element={<UserOrders />} />
          <Route path="/allOrders" element={<Orders />} />
          <Route path="/allOrders/esaki" element={<FoodSummary orderPlace={"Esaki"} />} />
          <Route path="/allOrders/university" element={<FoodSummary orderPlace={"University"} />} />
          <Route path="/pastOrders" element={<PastOrders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
