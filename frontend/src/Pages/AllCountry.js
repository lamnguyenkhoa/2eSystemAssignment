import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import CountryTable from '../Components/CountryTable';
import { getCountries } from '../api';

function AllCountry() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountries().then((res) => {
      setCountries(res);
    });
  }, []);

  return (
    <Container className="App">
      <Row>
        <Col>
          <h1 style={{ margin: '20px 0' }}>All countries</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <CountryTable items={countries} />
        </Col>
      </Row>
    </Container>
  );
}

export default AllCountry;
