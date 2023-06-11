import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
const OrderController = () => {
  const [canOrder, setCanOrder] = useState(false);
  useEffect(() => {
    // Fetch food data from backend server
    const localUser = JSON.parse(localStorage.getItem("user"));
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/users?index=${localUser.index}`)
      .then((response) => {
        setCanOrder(response.data.user.canOrder);
      })
      .catch((error) => {
        console.error("Error fetching food data:", error);
      });
  }, []);

  const handleStartOrder = async () => {
    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}/api/users`, { type: "start" });
      setCanOrder(true);
    } catch (error) {
      console.error("Failed to update permision", error);
    }
  };
  const handleStopOrder = async () => {
    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}/api/users`, { type: "stop" });
      setCanOrder(false);
    } catch (error) {
      console.error("Failed to update permision", error);
    }
  };

  return (
    <div className="container mb-4">
      <div className="p-2 row border">
        {!canOrder ? (
          <Button onClick={handleStartOrder} variant="success">
            Start Ordering
          </Button>
        ) : (
          <Button onClick={handleStopOrder} variant="danger">
            Stop Ordering
          </Button>
        )}
      </div>
    </div>
  );
};

export default OrderController;
