import UserOrdersTable from "../components/UserOrdersTable";
import FoodSummaryTable from "../components/FoodSummaryTable";
import NavBar from "../components/NavBar";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import Guide from "../components/Guide";
import Greeting from "../components/Greeting";

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
      <div className="container-fluid" {...swipeHandlers} style={{ marginBottom: 60 }}>
        <Greeting />
        <FoodSummaryTable />
        <UserOrdersTable />
        <NavBar activeTab={"tab3"} />
      </div>
    </>
  );
}

export default FoodSummary;
