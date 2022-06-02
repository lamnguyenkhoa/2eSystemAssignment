import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AirportTable from '../Components/AirportTable';
import { getAirports } from '../api';

function AllAirport() {
  const [airports, setAirports] = useState([]);

  useEffect(() => {
    getAirports().then((res) => {
      setAirports(res);
    });
  }, []);

  return (
    <Container className="App">
      <Row>
        <Col>
          <h1 style={{ margin: '20px 0' }}>All airports</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <AirportTable items={airports} />
        </Col>
      </Row>
    </Container>
  );
}

export default AllAirport;
