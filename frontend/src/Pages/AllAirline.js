import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import AirlineTable from '../Components/AirlineTable';
import { getAirlines } from '../api';

function AllAirline() {
  const [airlines, setAirlines] = useState([]);

  useEffect(() => {
    getAirlines().then((res) => {
      setAirlines(res);
    });
  }, []);

  return (
    <Container className="App">
      <Row>
        <Col>
          <h1 style={{ margin: '20px 0' }}>All airlines</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <AirlineTable items={airlines} />
        </Col>
      </Row>
    </Container>
  );
}

export default AllAirline;
