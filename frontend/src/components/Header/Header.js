import React from 'react';
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap"
import { NavLink, Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../../actions/Actions"

function Header(props) {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link to="/" className="navbar-brand"><Navbar.Brand href="#home">EAT-O-MANIA</Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">

          </Nav>
          {auth.authenticate == false ?
            <Nav>
              <li className="nav-item"><NavLink to="/signin" className="nav-link">Sign in</NavLink></li>
              <li className="nav-item"><NavLink to="/signup" className="nav-link">Sign up</NavLink></li>
            </Nav> :
            <Nav>
              <Button className="nav-item" onClick={logoutHandler}>Logout</Button>
            </Nav>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;