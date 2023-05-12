import { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

function FoodSummary() {
  const [foodSummary, setFoodSummary] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Fetch order data for the current date from the backend server
    // const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
    // console.log(currentDate);
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/orders`)
      .then((response) => {
        const orders = response.data;
        const summary = calculateFoodSummary(orders);
        setFoodSummary(summary);
        setShow(true);
      })
      .catch((error) => {
        console.error("Error fetching order data:", error);
      });
  }, []);

  const calculateFoodSummary = (orders) => {
    const summary = {};
    let totalFoods = 0;
    let totalPrice = 0;

    orders.forEach((order) => {
      const { food, quantity } = order;
      if (summary[food._id]) {
        summary[food._id].quantity += quantity;
        summary[food._id].totalPrice += food.price * quantity;
      } else {
        summary[food._id] = {
          food: food.name,
          quantity,
          totalPrice: food.price * quantity,
        };
      }
      totalFoods += quantity;
      totalPrice += food.price;
    });

    return { summary, totalFoods, totalPrice };
  };

  return (
    <div className="text-center">
      <h2>Food Summary</h2>
      <Table bordered responsive>
        <thead>
          <tr>
            <th>Food</th>
            <th>No. of Foods</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {show &&
            Object.values(foodSummary.summary).map((item, index) => (
              <tr key={index}>
                <td>{item.food}</td>
                <td>{item.quantity}</td>
                <td>{item.totalPrice}</td>
              </tr>
            ))}
          <tr>
            <td className="font-weight-bold">Total </td>
            <td className="font-weight-bold"> {foodSummary.totalFoods}</td>
            <td className="font-weight-bold"> {foodSummary.totalPrice}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default FoodSummary;
