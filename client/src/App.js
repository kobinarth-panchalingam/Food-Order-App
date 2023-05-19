import "./App.css";
import Login from "./pages/Login";
import UserOrders from "./pages/FoodUserSummary";
import FoodSummary from "./pages/FoodSummary";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FoodMenu from "./pages/FoodMenu";
import PastOrders from "./pages/PastOrders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route exact path="/foodMenu" element={<FoodMenu />} />
        <Route exact path="/currentOrder" element={<UserOrders />} />
        <Route exact path="/allOrders" element={<FoodSummary />} />
        <Route exact path="/pastOrders" element={<PastOrders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
