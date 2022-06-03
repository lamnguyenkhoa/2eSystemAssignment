import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { getAirports } from '../api';
import FormModal from '../Components/FormModal';
import DeleteModal from '../Components/DeleteModal';
import LoadingTable from '../Components/LoadingTable';

function AllAirport() {
  const [airports, setAirports] = useState([]);
  const [reload, setReload] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getAirports().then((res) => {
      setAirports(res);
      setLoading(false);
      setReload(false);
    });
  }, [reload]);

  let tableData = <LoadingTable col={5} />;

  if (!isLoading) {
    // Map each airline datarow
    tableData = airports.map((item) => (
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
          <FormModal formType="Edit" itemType="Airport" setReload={setReload} item={item} />
        </td>
        <td>
          <DeleteModal itemType="Airport" setReload={setReload} item={item} />
        </td>
      </tr>
    ));
  }

  return (
    <Container className="App">
      <Row style={{ margin: '5vh 0' }}>
        <Col>
          <div style={{ display: 'flex', gap: '3vw', alignItems: 'center' }}>
            <h1>All airports</h1>
            <FormModal formType="Add" itemType="Airport" setReload={setReload} />
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
            <tbody>{tableData}</tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default AllAirport;
