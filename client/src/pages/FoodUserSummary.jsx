import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import Greeting from "../components/Greeting";
import NavBar from "../components/NavBar";

function UserOrders() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();

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
  }, [orders]);

  const handleDeleteFoodItem = (orderId, foodId) => {
    // Send delete request to the backend server
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/orders/${orderId}/food/${foodId}`)
      .then((response) => {
        // Handle successful food item deletion
        console.log("Food item deleted successfully:", response.data);
        // Update the state to remove the deleted food item
        setOrders((prevOrders) =>
          prevOrders.map((order) => {
            if (order._id === orderId) {
              order.orderList = order.orderList.filter((item) => item._id !== foodId);
            }
            return order;
          })
        );
      })
      .catch((error) => {
        console.error("Error deleting food item:", error);
      });
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      // Handle swipe left to navigate to the next tab
      navigate("/allOrders");
    },
    onSwipedRight: () => {
      // Handle swipe right to navigate to the previous tab
      navigate("/foodMenu");
    },
    swipeDuration: 250,
  });

  return (
    <>
      <div className="full-height container-fluid" {...swipeHandlers} style={{ marginBottom: 60 }}>
        <Greeting />
        {orders.length ? (
          <div className="text-center">
            <Table bordered responsive>
              <thead>
                <tr>
                  <th>Food</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) =>
                  order.orderList.map((foodItem) => (
                    <tr key={foodItem._id}>
                      <td>{foodItem.food.name}</td>
                      <td>{foodItem.quantity}</td>
                      <td>
                        <Button variant="danger" onClick={() => handleDeleteFoodItem(order._id, foodItem._id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        ) : (
          <h3 className="text-center mt-5" style={{ opacity: 0.7 }}>
            No Orders Yet
          </h3>
        )}
      </div>
      <NavBar activeTab={"tab2"} />
    </>
  );
}

export default UserOrders;
