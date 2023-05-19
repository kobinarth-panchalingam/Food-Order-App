import { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Container } from "react-bootstrap";
import LocalStorageService from "../utils/LocalStorageService";
import OrderCard from "../components/OrderCard";
import NavBar from "../components/NavBar";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";

function PastOrders() {
  const [pastOrders, setPastOrders] = useState([]);
  const user = JSON.parse(LocalStorageService.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/orders/completed/user/${user._id}`)
      .then((response) => {
        setPastOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching past orders:", error);
      });
  }, []);

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
      // Handle swipe left to navigate to the next tab
    },
    onSwipedRight: () => {
      // Handle swipe right to navigate to the previous tab
      navigate("/allOrders");
    },
  });

  return (
    <>
      <div className="full-height" {...swipeHandlers}>
        <NavBar activeTab={"tab4"} />
        <Container>
          {pastOrders.length ? (
            <Row>
              {pastOrders.map((order) => (
                <Col key={order._id} lg={4} md={6} sm={12} className="mb-4">
                  <OrderCard order={order} expanded={order.expanded} onToggleExpand={handleExpandOrder} />
                </Col>
              ))}
            </Row>
          ) : (
            <h4 className="text-center">No Past Orders</h4>
          )}
        </Container>
      </div>
    </>
  );
}

export default PastOrders;
