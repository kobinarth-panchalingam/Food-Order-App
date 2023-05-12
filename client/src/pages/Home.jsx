import { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import FoodMenu from "../components/FoodMenu";
import FoodSummary from "../components/FoodSummary";
import UserOrders from "../components/FoodUserSummary";

function App() {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Navbar bg="light">
        <Navbar.Brand className="mx-2" href="#">
          Pick Me
        </Navbar.Brand>
        <Nav className="justify-content-center">
          <Nav.Link href="#" onClick={() => handleTabSelect("tab1")} active={activeTab === "tab1"}>
            Order Here
          </Nav.Link>
          <Nav.Link href="#" onClick={() => handleTabSelect("tab2")} active={activeTab === "tab2"}>
            All Orders
          </Nav.Link>
          <Nav.Link href="#" onClick={() => handleTabSelect("tab3")} active={activeTab === "tab3"}>
            Your Order
          </Nav.Link>
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
