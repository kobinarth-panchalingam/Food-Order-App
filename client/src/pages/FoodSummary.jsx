import UserOrdersTable from "../components/UserOrdersTable";
import FoodSummaryTable from "../components/FoodSummaryTable";
import NavBar from "../components/NavBar";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import Guide from "../components/Guide";
import Greeting from "../components/Greeting";
import SplitPayer from "../components/SplitPayer";
import { useState } from "react";
import OrderController from "../components/OrderController";

function FoodSummary() {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [selectedPayer, setSelectedPayer] = useState(user.splitwiseId);
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      // Handle swipe left to navigate to the next tab
      navigate("/pastOrders");
    },
    onSwipedRight: () => {
      // Handle swipe right to navigate to the previous tab
      navigate("/currentOrder");
    },
    swipeDuration: 250,
  });
  return (
    <>
      <div className="container-fluid" {...swipeHandlers} style={{ marginBottom: 60 }}>
        <Greeting />
        <FoodSummaryTable />
        {user.role === "admin" && (
          <>
            <SplitPayer selectedPayer={selectedPayer} setSelectedPayer={setSelectedPayer} />
            <OrderController />
          </>
        )}
        <UserOrdersTable from={selectedPayer} />
        <NavBar activeTab={"tab3"} />
      </div>
    </>
  );
}

export default FoodSummary;
