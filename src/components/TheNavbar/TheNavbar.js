import { Navbar, Nav } from "react-bootstrap";
import classes from "./TheNavbar.module.scss";

const TheNavbar = () => {
  return (
    <Navbar bg="primary" variant="dark" sticky="top">
      <Navbar.Brand href="#home">RexAuto</Navbar.Brand>
      <Nav className={classes.links}>
        <Nav.Link href="/bills">Bills</Nav.Link>
        <Nav.Link href="/bill">New Bill</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default TheNavbar;
