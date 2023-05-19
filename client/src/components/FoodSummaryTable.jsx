import { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

function FoodSummaryTable() {
  const [foodSummary, setFoodSummary] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/orders`)
      .then((response) => {
        const summary = calculateFoodSummary(response.data);
        setFoodSummary(summary);
        setShow(true);
      })
      .catch((error) => {
        console.error("Error fetching order data:", error);
      });
  }, []);

  const calculateFoodSummary = (orders) => {
    const summary = {};
    const maleSummary = {};
    const femaleSummary = {};
    let totalMaleFoods = 0;
    let totalFemaleFoods = 0;
    let totalPrice = 0;

    orders.forEach((order) => {
      const { orderList, user } = order;

      orderList.forEach((orderItem) => {
        const { food, quantity } = orderItem;

        if (summary[food._id]) {
          summary[food._id].quantity += quantity;
          summary[food._id].totalPrice += food.price * quantity;
        } else {
          summary[food._id] = {
            food: food.name,
            quantity,
            totalPrice: food.price * quantity,
          };
        }

        if (user && user.gender === "male") {
          if (maleSummary[food._id]) {
            maleSummary[food._id] += quantity;
          } else {
            maleSummary[food._id] = quantity;
          }
          totalMaleFoods += quantity;
        }

        if (user && user.gender === "female") {
          if (femaleSummary[food._id]) {
            femaleSummary[food._id] += quantity;
          } else {
            femaleSummary[food._id] = quantity;
          }
          totalFemaleFoods += quantity;
        }

        totalPrice += food.price * quantity;
      });
    });

    return { summary, maleSummary, femaleSummary, totalMaleFoods, totalFemaleFoods, totalPrice };
  };

  return (
    <div className="text-center">
      <h2>Food Summary</h2>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>Food</th>
            <th>NoS (Male)</th>
            <th>NoS (Female)</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {show &&
            Object.entries(foodSummary.summary).map(([foodId, item], index) => (
              <tr key={index}>
                <td>{item.food}</td>
                <td>{foodSummary.maleSummary[foodId] || 0}</td>
                <td>{foodSummary.femaleSummary[foodId] || 0}</td>
                <td>{item.totalPrice}</td>
              </tr>
            ))}

          <tr>
            <td className="fw-bold">Total</td>
            <td className="fw-bold">{foodSummary.totalMaleFoods}</td>
            <td className="fw-bold">{foodSummary.totalFemaleFoods}</td>
            <td className="fw-bold">{foodSummary.totalPrice}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default FoodSummaryTable;
