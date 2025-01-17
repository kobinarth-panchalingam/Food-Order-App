import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import FoodSummaryTable from "../components/FoodSummaryTable";
import Greeting from "../components/Greeting";
import NavBar from "../components/NavBar";
import OrderController from "../components/OrderController";
import SplitPayer from "../components/SplitPayer";
import UserOrdersTable from "../components/UserOrdersTable";

function OrderSummary({ orderPlace }) {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [selectedPayer, setSelectedPayer] = useState(user.splitwiseId);
  const navigate = useNavigate();

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      navigate("/pastOrders");
    },
    onSwipedRight: () => {
      navigate("/currentOrder");
    },
    swipeDuration: 250,
  });

  return (
    <>
      <div className="container-fluid" {...swipeHandlers} style={{ marginBottom: 60 }}>
        <Greeting />
        <FoodSummaryTable orderPlace={orderPlace} />
        {user.role === "admin" && (
          <>
            <SplitPayer selectedPayer={selectedPayer} setSelectedPayer={setSelectedPayer} />
            <OrderController orderPlace={orderPlace} />
          </>
        )}
        <UserOrdersTable from={selectedPayer} orderPlace={orderPlace} />
        <NavBar activeTab={"tab3"} />
      </div>
    </>
  );
}

export default OrderSummary;
