import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import LocalStorageService from "../utils/LocalStorageService";

function UserOrdersTable() {
  const [userOrders, setUserOrders] = useState([]);
  const user = JSON.parse(LocalStorageService.getItem("user"));

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

  const handleFinishOrder = (orderId) => {
    axios
      .patch(`${process.env.REACT_APP_API_URL}/api/orders/${orderId}`, { to: user.splitwiseId })
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
      });
  };

  return (
    <>
      {userOrders.length ? (
        <div className="text-center">
          <h3>User Orders</h3>
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
                  <td>
                    <Button variant="success" disabled={user.role === "user"} onClick={() => handleFinishOrder(userOrder._id)}>
                      Finish
                    </Button>
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
