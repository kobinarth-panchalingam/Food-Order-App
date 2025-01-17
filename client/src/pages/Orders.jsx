import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import Greeting from "../components/Greeting";
import NavBar from "../components/NavBar";

function Orders() {
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

  const handleEsakiClick = () => {
    navigate("/allOrders/esaki");
  };

  const handleUniversityClick = () => {
    navigate("/allOrders/university");
  };
  
  return (
    <>
      <div className="container-fluid vh-100 d-flex flex-column" {...swipeHandlers} style={{ marginBottom: 60 }}>
        <Greeting />
        <div className="flex-grow-1">
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
