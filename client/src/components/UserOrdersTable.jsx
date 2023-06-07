import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";

function UserOrdersTable() {
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

  const handleFinishOrder = (orderId, index) => {
    if (isFinishingOrder) {
      // If finishing order API call is already in progress, return early
      return;
    }

    setIsFinishingOrder(true); // Set the flag to indicate finishing order API call is in progress
    const description = userOrders[index].orders.map((order) => ` ${order.food}-${order.quantity}`).join(", ");
    axios
      .patch(`${process.env.REACT_APP_API_URL}/api/orders/${orderId}`, { description: description })
      .then(() => {
        // Fetch the updated user orders after marking the order as finished
        axios
          .get(`${process.env.REACT_APP_API_URL}/api/orders`)
          .then((response) => {
            const updatedUserOrders = getUserOrders(response.data);
            setUserOrders(updatedUserOrders);
            console.log("Order finished successfully");
          })
          .catch((error) => {
            console.error("Error fetching order data:", error);
          });
      })
      .catch((error) => {
        console.error("Error finishing order:", error);
      })
      .finally(() => {
        setIsFinishingOrder(false); // Reset the flag after finishing order API call is complete
      });
  };

  return (
    <>
      {userOrders.length ? (
        <div className="text-center">
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th>User</th>
                <th>Orders</th>
                {user.role === "admin" && <th>Splitwise</th>}
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
                  {user.role === "admin" && (
                    <td>
                      <Button variant="success" onClick={() => handleFinishOrder(userOrder._id, index)}>
                        Add
                      </Button>
                    </td>
                  )}
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
