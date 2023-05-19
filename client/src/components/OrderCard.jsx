import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

const OrderCard = ({ order, expanded, onToggleExpand }) => {
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
    let totalPrice = 0;

    orderList.forEach((orderItem) => {
      totalPrice += orderItem.food.price * orderItem.quantity;
    });

    return totalPrice.toFixed(2);
  };

  return (
    <Card bg="light " border="success">
      <Card.Header>Order ID: {_id}</Card.Header>
      <Card.Body onClick={handleToggleExpand}>
        {expanded ? (
          <>
            <Card.Text>
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
            </Card.Text>
            {/* Additional expanded content goes here */}
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
