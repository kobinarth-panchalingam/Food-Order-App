import { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import FoodMenu from "../components/FoodMenu";

function App() {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Navbar bg="light">
        <Navbar.Brand href="#">My App</Navbar.Brand>
        <Nav className="justify-content-center">
          <Nav.Link href="#" onClick={() => handleTabSelect("tab1")} active={activeTab === "tab1"}>
            Order Here
          </Nav.Link>
          <Nav.Link href="#" onClick={() => handleTabSelect("tab2")} active={activeTab === "tab2"}>
            All Orders
          </Nav.Link>
        </Nav>
      </Navbar>

      {activeTab === "tab1" && (
        <div>
          <FoodMenu />
        </div>
      )}

      {activeTab === "tab2" && (
        <div>
          <h2>Tab 2 Content</h2>
          {/* Add your content for Tab 2 */}
        </div>
      )}
    </>
  );
}

export default App;
