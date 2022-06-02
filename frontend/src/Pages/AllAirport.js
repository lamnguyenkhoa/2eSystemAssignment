import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { getAirports } from '../api';
import FormModal from '../Components/FormModal';
import DeleteModal from '../Components/DeleteModal';

function AllAirport() {
  const [airports, setAirports] = useState([]);

  useEffect(() => {
    getAirports().then((res) => {
      setAirports(res);
    });
  }, []);

  return (
    <Container className="App">
      <Row style={{ margin: '5vh 0' }}>
        <Col>
          <div style={{ display: 'flex', gap: '3vw', alignItems: 'center' }}>
            <h1>All airports</h1>
            <FormModal formType="Add" itemType="Airport" />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table responsive hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Airport name</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {/* Map each airport datarow  */}
              {airports.map((item) => (
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.latitude}</td>
                  <td>{item.longitude}</td>
                  <td>{item.country}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => {
                        window.location.href = '/airport/' + item.id;
                      }}
                    >
                      View details
                    </Button>
                  </td>
                  <td>
                    <FormModal formType="Edit" itemType="Airport" item={item} />
                  </td>
                  <td>
                    <DeleteModal itemType="Airport" item={item} />
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

export default AllAirport;
