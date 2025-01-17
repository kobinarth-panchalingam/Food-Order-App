import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import { toast } from "react-toastify";
import Greeting from "../components/Greeting";
import NavBar from "../components/NavBar";

function UserOrders() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user-specific orders from backend server
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/orders/${user._id}?isFinished=false`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        toast.error("Error fetching user orders:", error.message);
      });
  }, [user._id]);

  const handleDeleteFoodItem = (orderId, foodId) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/orders/${orderId}/food/${foodId}`)
      .then((response) => {
        const updatedOrders = orders.map((order) => {
          if (order._id === orderId) {
            order.orderList = order.orderList.filter((item) => item._id !== foodId);
          }
          return order;
        });
        setOrders(updatedOrders);
        toast.success("Food item deleted successfully:", response.data);
      })
      .catch((error) => {
        toast.error("Error deleting food item:", error.message);
      });
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      navigate("/allOrders");
    },
    onSwipedRight: () => {
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
