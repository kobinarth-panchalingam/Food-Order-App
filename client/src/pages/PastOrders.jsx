import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import { toast } from "react-toastify";
import Greeting from "../components/Greeting";
import NavBar from "../components/NavBar";
import OrderCard from "../components/OrderCard";

function PastOrders() {
  const [pastOrders, setPastOrders] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/orders/${user._id}?isFinished=true`)
      .then((response) => {
        setPastOrders(response.data);
      })
      .catch((error) => {
        toast.error("Error fetching past orders:", error.message);
      });
  }, [user._id]);

  const handleExpandOrder = (orderId) => {
    setPastOrders((prevPastOrders) =>
      prevPastOrders.map((order) => {
        if (order._id === orderId) {
          return {
            ...order,
            expanded: !order.expanded, // Toggle the expanded state
          };
        }
        return order;
      })
    );
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      navigate("/pastOrders");
    },
    onSwipedRight: () => {
      navigate("/allOrders");
    },
    swipeDuration: 250,
  });

  return (
    <>
      <div className="full-height container-fluid" {...swipeHandlers} style={{ marginBottom: 60 }}>
        <Greeting />
        {pastOrders.length ? (
          <Row>
            {pastOrders.map((order) => (
              <Col key={order._id} lg={4} md={6} sm={12} className="mb-4">
                <OrderCard order={order} expanded={order.expanded} onToggleExpand={handleExpandOrder} />
              </Col>
            ))}
          </Row>
        ) : (
          <h4 className="text-center mt-5" style={{ opacity: 0.7 }}>
            No Past Orders
          </h4>
        )}
      </div>
      <NavBar activeTab={"tab4"} />
    </>
  );
}

export default PastOrders;
