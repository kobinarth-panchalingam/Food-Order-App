import { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

function UserOrdersTable() {
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/orders`)
      .then((response) => {
        const userOrders = getUserOrders(response.data);
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

  return (
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
  );
}

export default UserOrdersTable;
