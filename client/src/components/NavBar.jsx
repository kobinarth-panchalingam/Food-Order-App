import { Nav, Navbar } from "react-bootstrap";
import "../styles/style.css";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import LocalStorageService from "../utils/LocalStorageService";

function NavBar({ activeTab }) {
  const handleTabSelect = (tab) => {
    activeTab = tab;
  };

  const handleLogout = () => {
    // Delete the user object from LocalStorageService
    LocalStorageService.removeItem("user");

    // Perform any additional logout logic here

    // Redirect to the login or home page
    // Example: window.location.href = "/login";
    window.location.href = "/";
  };

  return (
    <>
      <Navbar bg="light" sticky="top">
        {/* <Navbar.Brand className="mx-2" href="#">
          Pick Me
        </Navbar.Brand> */}
        <Nav fill variant="tabs" activeKey={activeTab} onSelect={handleTabSelect}>
          <Nav.Link as={Link} to="/foodMenu" eventKey="tab1">
            Order Here
          </Nav.Link>
          <Nav.Link as={Link} to="/currentOrder" eventKey="tab2">
            Current Order
          </Nav.Link>
          <Nav.Link as={Link} to="/allOrders" eventKey="tab3">
            All Orders
          </Nav.Link>
          <Nav.Link as={Link} to="/pastOrders " eventKey="tab4">
            Past Orders
          </Nav.Link>
          <Nav.Link onClick={handleLogout}>
            <FiLogOut />
          </Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
}

export default NavBar;
