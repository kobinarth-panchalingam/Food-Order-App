import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Greeting from "../components/Greeting";
import NavBar from "../components/NavBar";
function Orders() {
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

  const handleEsakiClick = () => {
    navigate("/allOrders/esaki"); // Navigate to the Esaki page
  };

  const handleUniversityClick = () => {
    navigate("/allOrders/university"); // Navigate to the University page
  };
  return (
    <>
      <div className="container-fluid" {...swipeHandlers} style={{ marginBottom: 60 }}>
        <Greeting />
        <div className=" d-flex flex-column align-items-center justify-content-center vh-100">
          <Button variant="primary" onClick={handleEsakiClick} className="mb-3 col-12 h-25">
            Esaki
          </Button>
          <Button variant="success" onClick={handleUniversityClick} className="col-12 h-25">
            University
          </Button>
        </div>
        <NavBar activeTab={"tab3"} />
      </div>
    </>
  );
}

export default Orders;
