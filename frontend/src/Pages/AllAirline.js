import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { getAirlines } from '../api';
import FormModal from '../Components/FormModal';
import DeleteModal from '../Components/DeleteModal';

function AllAirline() {
  const [airlines, setAirlines] = useState([]);

  useEffect(() => {
    getAirlines().then((res) => {
      setAirlines(res);
    });
  }, []);

  return (
    <Container className="App">
      <Row style={{ margin: '5vh 0' }}>
        <Col>
          <div style={{ display: 'flex', gap: '3vw', alignItems: 'center' }}>
            <h1>All airlines</h1>
            <FormModal formType="Add" itemType="Airline" />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table responsive hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {/* Map each airline datarow  */}
              {airlines.map((item) => (
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.country}</td>
                  <td>
                    <FormModal formType="Edit" itemType="Airline" item={item} />
                  </td>
                  <td>
                    <DeleteModal itemType="Airline" item={item} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default AllAirline;
