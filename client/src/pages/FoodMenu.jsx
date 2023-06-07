import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import "../styles/style.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "../components/NavBar";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import Guide from "../components/Guide";

function FoodMenu() {
  const [foods, setFoods] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
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
    const orderList = foods.filter((food) => food.quantity > 0);
    const userId = user._id;
    // Send orderList data to backend server
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/orders`, { userId, orderList })
      .then((response) => {
        // Handle successful order submission
        // toast.success("Suucessfully ordered", {
        //   position: "bottom-center",
        //   autoClose: 1000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: false,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        // });
        navigate("/currentOrder");
      })
      .catch((error) => {
        console.error("Error submitting order:", error);
        toast.error("Submission failed", {
          position: "bottom-center",
          autoClose: 1000,
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
      <div className=" full-height container-fluid swipe-element" {...swipeHandlers}>
        <Guide />
        <NavBar activeTab={"tab1"} />
        <div className="text-center ">
          <h2 className="my-3" style={{ opacity: 0.7 }}>
            Hi {user.name} 😉
          </h2>
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

          <div className="p-1 bg-light text-dark">
            <div className="row">
              <div className="col-6">
                <h4>Total Price: Rs.{totalPrice}</h4>
              </div>

              <div className="col-6">
                <Button variant="warning" onClick={handleOrderSubmit}>
                  Submit Order
                </Button>
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FoodMenu;
