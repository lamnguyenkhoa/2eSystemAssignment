import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

function MyNavbar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Airports Manager</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/airport">Airports</Nav.Link>
          <Nav.Link href="/airline">Airlines</Nav.Link>
          <Nav.Link href="/flight">Flights</Nav.Link>
          <Nav.Link href="/country">Countries</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
