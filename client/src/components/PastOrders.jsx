import { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Container } from "react-bootstrap";
import LocalStorageService from "../utils/LocalStorageService";
import OrderCard from "./OrderCard";

function PastOrders() {
  const [pastOrders, setPastOrders] = useState([]);
  const user = JSON.parse(LocalStorageService.getItem("user"));

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

  return (
    <>
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
    </>
  );
}

export default PastOrders;
