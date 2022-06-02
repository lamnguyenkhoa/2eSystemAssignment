import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FlightTable from '../Components/FlightTable';
import { getFlights } from '../api';

function AllFlight() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    getFlights().then((res) => {
      setFlights(res);
    });
  }, []);

  return (
    <Container className="App">
      <Row>
        <Col>
          <h1 style={{ margin: '20px 0' }}>All flights</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <FlightTable items={flights} />
        </Col>
      </Row>
    </Container>
  );
}

export default AllFlight;
