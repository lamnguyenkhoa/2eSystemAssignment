import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

function MyNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt=""
            src="/airport-navbar.png"
            width="32px"
            height="32px"
            className="d-inline-block align-top"
          />{' '}
          Airports Manager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/airport">Airports</Nav.Link>
            <Nav.Link href="/airline">Airlines</Nav.Link>
            <Nav.Link href="/country">Countries</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
