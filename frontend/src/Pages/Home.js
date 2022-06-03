import React from 'react';
import { Container, Image } from 'react-bootstrap';

function Home() {
  return (
    <Container style={{ textAlign: 'center' }}>
      <h1 style={{ margin: '5vh 0 0 0' }}>Airports Manager</h1>
      <p>Technical assignment for 2eSystem</p>
      <br></br>
      <p>A simple CRUD webapp with SQL database.</p>
      <p>Click on the link in navbar to manage the respective table.</p>
      <br></br>
      <Image src="/airport-logo.png" fluid />
    </Container>
  );
}

export default Home;
