import { Nav, Navbar } from "react-bootstrap";
import "../styles/style.css";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

function NavBar({ activeTab }) {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const handleTabSelect = (tab) => {
    activeTab = tab;
  };

  const handleLogout = () => {
    // Delete the user object from sessionStorage
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("run");
    window.location.href = "/";
  };

  return (
    <>
      <Navbar bg="light" fixed="bottom" className="p-0" style={{ height: 60 }}>
        {/* <Navbar.Brand className="mx-2" href="#">
          Pick Me
        </Navbar.Brand> */}
        <Nav fill variant="tabs" activeKey={activeTab} onSelect={handleTabSelect}>
          <Nav.Link as={Link} to="/foodMenu" eventKey="tab1" className="order-here">
            Order Here
          </Nav.Link>
          <Nav.Link as={Link} to="/currentOrder" eventKey="tab2" className="current-order">
            Current Order
          </Nav.Link>
          <Nav.Link as={Link} to="/allOrders" eventKey="tab3" className="all-orders">
            All Orders
          </Nav.Link>
          <Nav.Link as={Link} to="/pastOrders " eventKey="tab4" className="past-orders  ">
            Past Orders
          </Nav.Link>
          <Nav.Link onClick={handleLogout} className="logout d-flex align-items-center justify-content-center">
            <FiLogOut />
          </Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
}

export default NavBar;
