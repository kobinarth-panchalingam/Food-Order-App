import { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

function FoodSummary() {
  const [foodSummary, setFoodSummary] = useState([]);
  const [show, setShow] = useState(false);
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/orders`)
      .then((response) => {
        const orders = response.data;
        const summary = calculateFoodSummary(orders);
        setFoodSummary(summary);
        setShow(true);

        const userOrders = getUserOrders(orders);
        setUserOrders(userOrders);
      })
      .catch((error) => {
        console.error("Error fetching order data:", error);
      });
  }, []);

  const getUserOrders = (orders) => {
    // Create a map to store user orders
    const userOrderMap = {};

    orders.forEach((order) => {
      const { user, food, quantity } = order;

      if (!userOrderMap[user.name]) {
        // If the user is not in the map, create an entry for them
        userOrderMap[user.name] = {
          name: user.name,
          orders: [{ food: food.name, quantity }],
        };
      } else {
        // If the user is already in the map, check if the food already exists in their orders
        const existingOrder = userOrderMap[user.name].orders.find((order) => order.food === food.name);

        if (existingOrder) {
          // If the food already exists, add the quantity to the existing order
          existingOrder.quantity += quantity;
        } else {
          // If the food doesn't exist, add a new order
          userOrderMap[user.name].orders.push({ food: food.name, quantity });
        }
      }
    });

    // Convert the map values to an array
    return Object.values(userOrderMap);
  };

  const calculateFoodSummary = (orders) => {
    const summary = {};
    const maleSummary = {};
    const femaleSummary = {};
    let totalMaleFoods = 0;
    let totalFemaleFoods = 0;
    let totalPrice = 0;
    // console.log(orders);

    orders.forEach((order) => {
      const { food, quantity, user } = order;

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

      if (user && user.gender === "male") {
        if (maleSummary[food._id]) {
          maleSummary[food._id] += quantity;
        } else {
          maleSummary[food._id] = quantity;
        }
        totalMaleFoods += quantity;
      }

      if (user && user.gender === "female") {
        if (femaleSummary[food._id]) {
          femaleSummary[food._id] += quantity;
        } else {
          femaleSummary[food._id] = quantity;
        }
        totalFemaleFoods += quantity;
      }
      totalPrice += food.price * quantity;
    });

    return { summary, maleSummary, femaleSummary, totalMaleFoods, totalFemaleFoods, totalPrice };
  };

  return (
    <div className="text-center">
      <h2>Food Summary</h2>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>Food</th>
            <th>NoS (Male)</th>
            <th>NoS (Female)</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {show &&
            Object.entries(foodSummary.summary).map(([foodId, item], index) => (
              <tr key={index}>
                <td>{item.food}</td>
                <td>{foodSummary.maleSummary[foodId] || 0}</td>
                <td>{foodSummary.femaleSummary[foodId] || 0}</td>
                <td>{item.totalPrice}</td>
              </tr>
            ))}

          <tr>
            <td className="fw-bold">Total</td>
            <td className="fw-bold">{foodSummary.totalMaleFoods}</td>
            <td className="fw-bold">{foodSummary.totalFemaleFoods}</td>
            <td className="fw-bold">{foodSummary.totalPrice}</td>
          </tr>
        </tbody>
      </Table>

      <div className="text-center">
        <h2>User Orders</h2>
        <Table striped bordered responsive>
          <thead>
            <tr>
              <th>User</th>
              <th>Orders</th>
            </tr>
          </thead>
          <tbody>
            {userOrders.map((userOrder, index) => (
              <tr key={index}>
                <td>{userOrder.name}</td>
                <td>
                  <ul>
                    {userOrder.orders.map((order, index) => (
                      <li key={index}>
                        {order.food}: {order.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default FoodSummary;
