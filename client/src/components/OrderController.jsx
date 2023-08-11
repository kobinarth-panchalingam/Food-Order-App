import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
const OrderController = ({ orderPlace }) => {
  const [canOrder, setCanOrder] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch food data from backend server
    const localUser = JSON.parse(sessionStorage.getItem("user"));
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/settings`)
      .then((response) => {
        setCanOrder(response.data[0]["canOrder" + orderPlace]);
      })
      .catch((error) => {
        console.error("Error fetching food data:", error);
      });
  }, []);

  const handleStartOrder = async () => {
    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}/api/settings`, { type: "start", orderPlace: orderPlace });
      setCanOrder(true);
    } catch (error) {
      console.error("Failed to update permision", error);
    }
  };
  const handleStopOrder = async () => {
    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}/api/settings`, { type: "stop", orderPlace: orderPlace });
      setCanOrder(false);
    } catch (error) {
      console.error("Failed to update permision", error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/orders`);
      console.log("Successfully deleted unfinished orders");
    } catch (error) {
      console.error("Error deleting unfinished orders:", error);
    } finally {
      setShowModal(false); // Close the modal after the deletion is complete or if there's an error
    }
  };

  return (
    <div className="container mb-4">
      <div className="p-2 row border">
        {!canOrder ? (
          <Button onClick={handleStartOrder} variant="success">
            Grant Order Permission
          </Button>
        ) : (
          <Button onClick={handleStopOrder} variant="danger">
            Revoke Order Permission
          </Button>
        )}
      </div>

      <div className="p-2 row border">
        <Button onClick={() => setShowModal(true)} variant="danger">
          Delete all orders
        </Button>
      </div>

      {/* confirmation modal before deleting all the orders */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete all unfinished orders? This action cannot be undone.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrderController;
