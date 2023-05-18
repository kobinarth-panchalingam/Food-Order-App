import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import LocalStorageService from "../utils/LocalStorageService";

function UserOrders() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(LocalStorageService.getItem("user"));
  // const name = LocalStorageService.getItem("userName");

  useEffect(() => {
    // Fetch user-specific orders from backend server
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/orders/user/${user._id}`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user orders:", error);
      });
  }, [user._id]);

  const handleDeleteOrder = (orderId) => {
    // Send delete request to backend server
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/orders/${orderId}`)
      .then((response) => {
        // Handle successful order deletion
        console.log("Order deleted successfully:", response.data);
        // Remove the deleted order from the state
        setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
      })
      .catch((error) => {
        console.error("Error deleting order:", error);
      });
  };

  return (
    <>
      {orders.length ? (
        <div className="text-center">
          <h2>{user.name} Orders</h2>
          <Table bordered responsive>
            <thead>
              <tr>
                <th>Food</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.food.name}</td>
                  <td>{order.quantity}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleDeleteOrder(order._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <h5 className="text-center mt-4">No Orders Yet</h5>
      )}
    </>
  );
}

export default UserOrders;
