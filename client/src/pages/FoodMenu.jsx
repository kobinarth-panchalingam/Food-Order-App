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
import Greeting from "../components/Greeting";

function FoodMenu() {
  const [foods, setFoods] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  const [canOrder, setCanOrder] = useState(false);
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

    const localUser = JSON.parse(localStorage.getItem("user"));
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/users?index=${localUser.index}`)
      .then((response) => {
        setCanOrder(response.data.user.canOrder);
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
      <div className="container-fluid swipe-element" {...swipeHandlers} style={{ marginBottom: 60 }}>
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

          {canOrder ? (
            <div className=" text-dark">
              <div className="row">
                <div className="col-6">
                  <h4>Total: Rs.{totalPrice}</h4>
                </div>

                <div className="col-6">
                  <Button disabled={totalPrice === 0} variant="warning" onClick={handleOrderSubmit}>
                    Submit Order
                  </Button>
                  <ToastContainer />
                </div>
              </div>
            </div>
          ) : (
            <h3>You can't order right now</h3>
          )}
        </div>
      </div>

      <NavBar activeTab={"tab1"} />
    </>
  );
}

export default FoodMenu;
