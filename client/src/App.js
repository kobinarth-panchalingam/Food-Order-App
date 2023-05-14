import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import UserOrders from "./components/FoodUserSummary";
import FoodSummary from "./components/FoodSummary";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/userOrders" element={<UserOrders />} />
        <Route exact path="/allOrders" element={<FoodSummary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
