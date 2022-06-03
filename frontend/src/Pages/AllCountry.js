import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { getCountries } from '../api';
import FormModal from '../Components/FormModal';
import DeleteModal from '../Components/DeleteModal';
import LoadingTable from '../Components/LoadingTable';

function AllCountry() {
  const [countries, setCountries] = useState([]);
  const [reload, setReload] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getCountries().then((res) => {
      setCountries(res);
      setLoading(false);
      setReload(false);
    });
  }, [reload]);

  let tableData = <LoadingTable col={3} />;

  if (!isLoading) {
    // Map each airline datarow
    tableData = countries.map((item) => (
      <tr key={item.id}>
        <th scope="row">{item.id}</th>
        <td>{item.name}</td>
        <td>{item.iso_code}</td>
        <td>
          <FormModal formType="Edit" itemType="Country" setReload={setReload} item={item} />
        </td>
        <td>
          <DeleteModal itemType="Country" setReload={setReload} item={item} />
        </td>
      </tr>
    ));
  }

  return (
    <Container className="App">
      <Row style={{ margin: '5vh 0' }}>
        <Col>
          <div style={{ display: 'flex', gap: '3vw', alignItems: 'center' }}>
            <h1>All countries</h1>
            <FormModal formType="Add" itemType="Country" setReload={setReload} />
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
            <tbody>{tableData}</tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default AllCountry;
