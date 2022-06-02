import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { getCountries } from '../api';
import FormModal from '../Components/FormModal';
import DeleteModal from '../Components/DeleteModal';

function AllCountry() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountries().then((res) => {
      setCountries(res);
    });
  }, []);

  return (
    <Container className="App">
      <Row style={{ margin: '5vh 0' }}>
        <Col>
          <div style={{ display: 'flex', gap: '3vw', alignItems: 'center' }}>
            <h1>All countries</h1>
            <FormModal formType="Add" itemType="Country" />
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
                <th>ISO code</th>
              </tr>
            </thead>
            <tbody>
              {/* Map each country datarow  */}
              {countries.map((item) => (
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.iso_code}</td>
                  <td>
                    <FormModal formType="Edit" itemType="Country" item={item} />
                  </td>
                  <td>
                    <DeleteModal itemType="Country" item={item} />
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

export default AllCountry;
