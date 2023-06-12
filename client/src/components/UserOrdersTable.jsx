import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";

function UserOrdersTable({ from }) {
  const [userOrders, setUserOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [isFinishingOrder, setIsFinishingOrder] = useState(false); // Flag to track API call status

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
    const userOrderMap = {};

    orders.forEach((order) => {
      const { user, orderList, _id } = order;

      const { name } = user;

      orderList.forEach((orderItem) => {
        const { food, quantity } = orderItem;

        if (!userOrderMap[name]) {
          userOrderMap[name] = {
            _id,
            name,
            orders: [{ food: food.name, quantity }],
          };
        } else {
          const existingOrder = userOrderMap[name].orders.find((order) => order.food === food.name);

          if (existingOrder) {
            existingOrder.quantity += quantity;
          } else {
            userOrderMap[name].orders.push({ food: food.name, quantity });
          }
        }
      });
    });

    return Object.values(userOrderMap);
  };

  const handleFinishOrder = () => {
    if (isFinishingOrder) {
      // If finishing order API call is already in progress, return early
      return;
    }

    setIsFinishingOrder(true); // Set the flag to indicate finishing order API call is in progress
    const splitwiseData = userOrders.map((userOrder) => {
      return {
        orderId: userOrder._id,
        description: userOrder.orders.map((order) => `${order.food}-${order.quantity}`).join(", "),
      };
    });

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/orders/splitwise`, { splitwiseData, from })
      .then(() => {
        // Fetch the updated user orders after finishing the orders
        axios
          .get(`${process.env.REACT_APP_API_URL}/api/orders`)
          .then((response) => {
            const updatedUserOrders = getUserOrders(response.data);
            setUserOrders(updatedUserOrders);
            console.log("Orders finished successfully");
          })
          .catch((error) => {
            console.error("Error fetching order data:", error);
          });
      })
      .catch((error) => {
        console.error("Error finishing orders:", error);
      })
      .finally(() => {
        setIsFinishingOrder(false); // Reset the flag after finishing order API call is complete
      });
  };

  return (
    <>
      {userOrders.length ? (
        <div className="text-center">
          {user.role === "admin" && (
            <div className="container mb-4">
              <div className="p-2 row border">
                <Button variant="success" onClick={handleFinishOrder} disabled={isFinishingOrder}>
                  Finish Orders and Add Splitwise
                </Button>
              </div>
            </div>
          )}
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
      ) : (
        <></>
      )}
    </>
  );
}

export default UserOrdersTable;
