import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

function OrderCard ({ order, expanded, onToggleExpand }) {
  const { _id, updatedAt, orderList } = order;
  const formattedDateTime = new Date(updatedAt).toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleToggleExpand = () => {
    onToggleExpand(_id);
  };

  const calculateTotalPrice = () => {
    const totalPrice = orderList.reduce((sum, orderItem) => sum + orderItem.food.price * orderItem.quantity, 0);    
    return totalPrice.toFixed(2);
  };

  return (
    <Card bg="light " border="success">
      <Card.Header>Order ID: {_id}</Card.Header>
      <Card.Body onClick={handleToggleExpand}>
        {expanded ? (
          <>
            <strong>Ordered Date:</strong> {formattedDateTime}
            <br />
            <strong>Ordered Foods:</strong>
            <ul>
              {orderList.map((orderItem) => (
                <li key={orderItem._id}>
                  {orderItem.food.name} - {orderItem.quantity}
                </li>
              ))}
            </ul>
            <strong>Total Price:</strong> Rs. {calculateTotalPrice()}
          </>
        ) : (
          <>
            <Row>
              <Col>
                <Button variant="secondary">See More</Button>
              </Col>
              <Col xs="auto">
                <strong>Rs. {calculateTotalPrice()}</strong>
              </Col>
            </Row>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default OrderCard;
