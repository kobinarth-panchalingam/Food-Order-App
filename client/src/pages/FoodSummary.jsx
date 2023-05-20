import UserOrdersTable from "../components/UserOrdersTable";
import FoodSummaryTable from "../components/FoodSummaryTable";
import NavBar from "../components/NavBar";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";

function FoodSummary() {
  const navigate = useNavigate();
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
      <div className="full-height container-fluid" {...swipeHandlers}>
        <NavBar activeTab={"tab3"} />
        <FoodSummaryTable />
        <UserOrdersTable />
      </div>
    </>
  );
}

export default FoodSummary;
