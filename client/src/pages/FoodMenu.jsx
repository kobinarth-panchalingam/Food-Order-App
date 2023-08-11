import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal } from "react-bootstrap";
import "../styles/style.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "../components/NavBar";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import Guide from "../components/Guide";
import Greeting from "../components/Greeting";

function FoodMenu() {
  const [foods, setFoods] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [canOrder, setCanOrder] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderPlace, setOrderPlace] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch food data from backend server
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/foods`)
      .then((response) => {
        const updatedFoods = response.data.map((food) => ({
          ...food,
          quantity: 0,
        }));
        setFoods(updatedFoods);
      })
      .catch((error) => {
        console.error("Error fetching food data:", error);
      });
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/settings`)
      .then((response) => {
        console.log(response.data[0]);
        setCanOrder(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching food data:", error);
      });
  }, []);

  useEffect(() => {
    // Calculate total price
    const orderTotal = foods.reduce((total, food) => total + food.price * food.quantity, 0);
    setTotalPrice(orderTotal);
  }, [foods]);

  const handleIncrement = (food) => {
    const updatedFoods = foods.map((item) => {
      if (item._id === food._id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setFoods(updatedFoods);
  };

  const handleDecrement = (food) => {
    const updatedFoods = foods.map((item) => {
      if (item._id === food._id && item.quantity > 0) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setFoods(updatedFoods);
  };

  const handleOrderSubmit = () => {
    // Show the confirmation modal
    setShowConfirmation(true);
  };

  const handleConfirmSubmit = () => {
    // Close the modal
    setShowConfirmation(false);

    const orderList = foods.filter((food) => food.quantity > 0);
    const userId = user._id;

    // Send orderList data to backend server
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/orders`, { userId, orderList, orderPlace })
      .then((response) => {
        navigate("/currentOrder");
      })
      .catch((error) => {
        console.error("Error submitting order:", error);
        toast.error(error.response.data.error, {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });

    const resetFoods = foods.map((food) => ({ ...food, quantity: 0 }));
    setFoods(resetFoods);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      // Handle swipe left to navigate to the next tab
      navigate("/currentOrder");
    },
    onSwipedRight: () => {
      // Handle swipe right to navigate to the previous tab
    },
    swipeDuration: 250,
  });

  return (
    <>
      <div className="container-fluid swipe-element" {...swipeHandlers} style={{ marginBottom: 120 }}>
        <Guide />
        <Greeting />
        <div className="text-center pb-2">
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th>Food</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food) => (
                <tr key={food._id} className={food.quantity > 0 ? "selected-row" : ""}>
                  <td>
                    <div>{food.name}</div>
                    <div className="text-secondary">Price: Rs.{food.price}</div>
                  </td>
                  <td>
                    <Button variant="danger" onClick={() => handleDecrement(food)} disabled={food.quantity === 0}>
                      -
                    </Button>
                    <span className="mx-2">{food.quantity}</span>
                    <Button variant="success" onClick={() => handleIncrement(food)}>
                      +
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      {canOrder.canOrderEsaki || canOrder.canOrderUniversity ? (
        <div className="container-fluid bg-white text-dark text-center position-fixed p-2 " style={{ bottom: 60 }}>
          <div className="row">
            <div className="col-6 ">
              <h4>Total: Rs.{totalPrice}</h4>
            </div>

            <div className="col-6">
              <div class="d-grid gap-1">
                <button disabled={totalPrice === 0} className="btn btn-warning" onClick={handleOrderSubmit} type="button" block>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container-fluid bg-white text-dark text-center position-fixed p-2 " style={{ bottom: 60 }}>
          <h3 className="text-danger">You can't order right now</h3>
        </div>
      )}
      {/* Confirmation Modal */}
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Select Order Place
          <div className="mt-3">
            <div className="">
              <button
                hidden={!canOrder.canOrderEsaki}
                className={`btn ${orderPlace === "Esaki" ? "btn-success" : "btn-secondary"} col-12 mb-2`}
                onClick={() => setOrderPlace("Esaki")}
              >
                Esaki
              </button>
              <button
                hidden={!canOrder.canOrderUniversity}
                className={`btn ${orderPlace === "University" ? "btn-success" : "btn-secondary"}  col-12`}
                onClick={() => setOrderPlace("University")}
              >
                University
              </button>
            </div>
          </div>
        </Modal.Body>
        {orderPlace && (
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
              Cancel
            </Button>
            <Button variant="warning" onClick={handleConfirmSubmit}>
              Confirm
            </Button>
          </Modal.Footer>
        )}
      </Modal>
      <ToastContainer />
      <NavBar activeTab={"tab1"} />
    </>
  );
}

export default FoodMenu;
