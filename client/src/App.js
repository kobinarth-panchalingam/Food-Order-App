import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import FoodMenu from "./pages/FoodMenu";
import OrderSummary from "./pages/OrderSummary";
import UserOrders from "./pages/UserOrders";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import PastOrders from "./pages/PastOrders";
import ProtectedRoute from "./utils/ProtectedRoutes";
import "./App.css";

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/foodMenu" element={<FoodMenu />} />
            <Route path="/currentOrder" element={<UserOrders />} />
            <Route path="/allOrders" element={<Orders />} />
            <Route path="/allOrders/esaki" element={<OrderSummary orderPlace={"Esaki"} />} />
            <Route path="/allOrders/university" element={<OrderSummary orderPlace={"University"} />} />
            <Route path="/pastOrders" element={<PastOrders />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
