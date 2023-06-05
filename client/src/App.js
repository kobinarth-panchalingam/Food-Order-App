import "./App.css";
import Login from "./pages/Login";
import UserOrders from "./pages/FoodUserSummary";
import FoodSummary from "./pages/FoodSummary";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import FoodMenu from "./pages/FoodMenu";
import PastOrders from "./pages/PastOrders";
import { useEffect } from "react";
import LocalStorageService from "./utils/LocalStorageService";
import ProtectedRoute from "./utils/ProtectedRoutes";

function App() {
  useEffect(() => {
    const handleUnload = () => {
      LocalStorageService.removeItem("user");
      LocalStorageService.removeItem("run");
      // Any other items you want to remove from localStorage
    };

    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("unload", handleUnload);
    };
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route exact path="/foodMenu" element={<FoodMenu />} />
          <Route exact path="/currentOrder" element={<UserOrders />} />
          <Route exact path="/allOrders" element={<FoodSummary />} />
          <Route exact path="/pastOrders" element={<PastOrders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
