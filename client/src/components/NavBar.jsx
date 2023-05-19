import { Nav, Navbar } from "react-bootstrap";
import "../styles/style.css";
import { Link } from "react-router-dom";

function NavBar({ activeTab }) {
  const handleTabSelect = (tab) => {
    activeTab = tab;
  };

  return (
    <>
      <Navbar bg="light" sticky="top">
        <Navbar.Brand className="mx-2" href="#">
          Pick Me
        </Navbar.Brand>
        <Nav fill variant="tabs" activeKey={activeTab} onSelect={handleTabSelect}>
          <Nav.Link as={Link} to="/foodMenu" eventKey="tab1">
            Order Here
          </Nav.Link>
          <Nav.Link as={Link} to="/currentOrder" eventKey="tab3">
            Current Order
          </Nav.Link>
          <Nav.Link as={Link} to="/allOrders" eventKey="tab2">
            All Orders
          </Nav.Link>
          <Nav.Link as={Link} to="/pastOrders" eventKey="tab4">
            Past Orders
          </Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
}

export default NavBar;
