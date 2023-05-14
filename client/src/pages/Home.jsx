import { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import FoodMenu from "../components/FoodMenu";
import FoodSummary from "../components/FoodSummary";
import UserOrders from "../components/FoodUserSummary";
import "../styles/style.css";

function App() {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Navbar bg="light" sticky="top">
        <Navbar.Brand className="mx-2" href="#">
          Pick Me
        </Navbar.Brand>
        <Nav fill variant="tabs" activeKey={activeTab} onSelect={handleTabSelect}>
          <Nav.Link eventKey="tab1">Order Here</Nav.Link>
          <Nav.Link eventKey="tab3">Your Order</Nav.Link>
          <Nav.Link eventKey="tab2">All Orders</Nav.Link>
        </Nav>
      </Navbar>

      {activeTab === "tab1" && (
        <div>
          <FoodMenu tab={setActiveTab} />
        </div>
      )}
      {activeTab === "tab2" && (
        <div>
          <FoodSummary />
        </div>
      )}
      {activeTab === "tab3" && (
        <div>
          <UserOrders />
        </div>
      )}
    </>
  );
}

export default App;
