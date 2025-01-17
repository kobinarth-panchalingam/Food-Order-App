import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { toast } from "react-toastify";

function UserOrdersTable({ from, orderPlace }) {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [users, setUsers] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [isFinishingOrder, setIsFinishingOrder] = useState(false); // Flag to track API call status
  const [offerPrice, setOfferPrice] = useState(0);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

  useEffect(() => {
    getUserOrders().then((userOrders) => {
      setUserOrders(userOrders);
    });
    
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/users`)
      .then((response) => {
        const allUsers = response.data.map((user) => user.name);
        setUsers(allUsers);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [orderPlace]);

  const getUserOrders = async () => {
    const orders = (await axios.get(`${process.env.REACT_APP_API_URL}/api/orders?isFinished=false&orderPlace=${orderPlace}`)).data;
    const userOrderMap = {};
    orders
      .forEach((order) => {
        const { user, orderList, _id } = order;

        const { name } = user;

        orderList.forEach((orderItem) => {
          const { food, quantity } = orderItem;

          if (!userOrderMap[name]) {
            userOrderMap[name] = {
              _id,
              name,
              orders: [{ food: food.name, quantity }],
            };
          } else {
            const existingOrder = userOrderMap[name].orders.find((order) => order.food === food.name);

            if (existingOrder) {
              existingOrder.quantity += quantity;
            } else {
              userOrderMap[name].orders.push({ food: food.name, quantity });
            }
          }
        });
      });
    return Object.values(userOrderMap);
  };

  const confirmFinishOrder = () => {
    setIsFinishingOrder(true); // Set the flag to indicate finishing order API call is in progress
    const splitwiseData = userOrders.map((userOrder) => {
      return {
        orderId: userOrder._id,
        description: userOrder.orders.map((order) => `${order.food}-${order.quantity}`).join(", "),
      };
    });

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/orders/finish`, { splitwiseData, from, offerPrice })
      .then(() => {
        // Fetch the updated user orders after finishing the orders
        axios
          .get(`${process.env.REACT_APP_API_URL}/api/orders`)
          .then((response) => {
            const updatedUserOrders = getUserOrders(response.data);
            setUserOrders(updatedUserOrders);
            toast.success("Order finished successfully");
          })
          .catch((error) => {
            toast.error("Error");
          });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error");
      })
      .finally(() => {
        setIsFinishingOrder(false); // Reset the flag after finishing order API call is complete
      });

    // Close the confirmation modal
    setConfirmationModalOpen(false);
  };

  const cancelFinishOrder = () => {
    setConfirmationModalOpen(false);
  };
  
  const handleFinishOrder = () => {
    if (isFinishingOrder) {
      return;
    }
    setConfirmationModalOpen(true);
  };

  // Find users who haven't ordered yet
  const getUsersWithoutOrders = () => {
    const orderedUsers = userOrders.map((userOrder) => userOrder.name);
    return users.filter((user) => !orderedUsers.includes(user));
  };

  return (
    <>
      {userOrders.length ? (
        <div className="text-center">
          {user.role === "admin" && (
            <div className="container mb-4">
              <div className="p-2 row border">
                <div className="input-group p-0 mb-3">
                  <span className="input-group-text">Offer Price</span>
                  <span className="input-group-text">Rs.</span>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter offer price"
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(parseFloat(e.target.value))}
                  />
                </div>

                <Button variant="success" onClick={handleFinishOrder} disabled={isFinishingOrder}>
                  Finish Orders and Add Splitwise
                </Button>
              </div>
            </div>
          )}
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th>User</th>
                <th>Orders</th>
              </tr>
            </thead>
            <tbody>
              {userOrders.map((userOrder, index) => (
                <tr key={index}>
                  <td>{userOrder.name}</td>
                  <td>
                    <ul>
                      {userOrder.orders.map((order, index) => (
                        <li key={index}>
                          {order.food}: {order.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
              {getUsersWithoutOrders().map((user, index) => (
                <tr key={index}>
                  <td>{user}</td>
                  <td>No orders yet</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <></>
      )}

      {/* Confirmation Modal */}
      <Modal show={confirmationModalOpen} onHide={cancelFinishOrder} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure the payer details are correct?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelFinishOrder}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmFinishOrder}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UserOrdersTable;
