import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import "./FoodMenu.css";
import LocalStorageService from "../utils/LocalStorageService";

function FoodMenu({ tab }) {
  const [foods, setFoods] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const userId = LocalStorageService.getItem("_id");

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
    // const orderList = foods.filter((food) => food.quantity > 0);
    // // Send orderList data to backend server
    // console.log(orderList);
    // axios
    //   .post("/api/orders", { orderList })
    //   .then((response) => {
    //     // Handle successful order submission
    //     console.log("Order submitted successfully:", response.data);
    //     const resetFoods = foods.map((food) => ({ ...food, quantity: 0 }));
    //     setFoods(resetFoods);
    //   })
    //   .catch((error) => {
    //     console.error("Error submitting order:", error);
    //   });

    const orderList = foods.filter((food) => food.quantity > 0);
    // Send orderList data to backend server
    orderList.forEach((order) => {
      const { _id: foodId, quantity } = order;
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/orders`, { userId, foodId, quantity })
        .then((response) => {
          // Handle successful order submission
          console.log("Order submitted successfully:", response.data);
          tab("tab3");
        })
        .catch((error) => {
          console.error("Error submitting order:", error);
        });
    });

    const resetFoods = foods.map((food) => ({ ...food, quantity: 0 }));
    setFoods(resetFoods);
  };

  return (
    <div className="text-center">
      <h2>Food Menu</h2>
      <Table bordered responsive>
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

      <div className="row">
        <div className="col-6">
          <h4>Total Price: Rs.{totalPrice}</h4>
        </div>

        <div className="col-6">
          <Button variant="warning" onClick={handleOrderSubmit}>
            Submit Order
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FoodMenu;
