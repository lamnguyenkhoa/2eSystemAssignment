import React from 'react';
import { Container, Button } from 'reactstrap';

function Home() {
  return (
    <Container className="App">
      <h1 style={{ margin: '5vh 0' }}>Homepage</h1>
      <Button
        color="primary"
        onClick={() => {
          window.location.href = '/country';
        }}
        style={{ margin: '0 1vw' }}
      >
        Countries
      </Button>
      <Button
        color="primary"
        onClick={() => {
          window.location.href = '/airline';
        }}
        style={{ margin: '0 1vw' }}
      >
        Airlines
      </Button>
      <Button color="primary" style={{ margin: '0 1vw' }}>
        Airports
      </Button>
      <Button color="primary" style={{ margin: '0 1vw' }}>
        Flights
      </Button>
      <p style={{ margin: '5vh 0' }}>Some interesting text here.</p>
    </Container>
  );
}

export default Home;
