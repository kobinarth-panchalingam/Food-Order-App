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
        <div className=" d-flex flex-column align-items-stretch justify-content-center">
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <button onClick={handleEsakiClick} className="btn btn-secondary p-4  mb-3 col-12">
            <p className="fs-1">Esaki</p>
          </button>
          <button variant="success" onClick={handleUniversityClick} className="btn btn-secondary p-4 mb-3 col-12 ">
            <p className="fs-1">University</p>
          </button>
        </div>
        <NavBar activeTab={"tab3"} />
      </div>
    </>
  );
}

export default Orders;
