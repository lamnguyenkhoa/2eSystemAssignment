import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { getAirportById, getFlightsAssociateWithAirportId } from '../api';
import FormModal from '../Components/FormModal';
import DeleteModal from '../Components/DeleteModal';
import LoadingTable from '../Components/LoadingTable';

function AirportDetail() {
  const [airport, setAirport] = useState({});
  const [departFlights, setDepartFlights] = useState([]);
  const [landingFlights, setLandingFlight] = useState([]);
  const [reload, setReload] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getAirportById(window.location.pathname.split('/')[2]).then((res) => {
      setAirport(res[0]);
      setReload(false);
      setLoading(false);
    });
  }, [reload]);

  useEffect(() => {
    getFlightsAssociateWithAirportId(airport.id).then((res) => {
      // Sort flights
      let depart = [];
      let landing = [];
      res.forEach((elem) => {
        if (elem.depart_from === airport.id) depart.push(elem);
        else landing.push(elem);
      });
      setDepartFlights(depart);
      setLandingFlight(landing);
    });
  }, [airport]);

  let departTableData = <LoadingTable col={4} />;

  let landingTableData = <LoadingTable col={4} />;

  if (!isLoading) {
    // Map each flight datarow
    departTableData = departFlights.map((item) => (
      <tr key={item.id}>
        <th scope="row">{item.id}</th>
        <td>{item.airline}</td>
        <td>{item.depart_airport}</td>
        <td>{item.landing_airport}</td>
        <td>
          <FormModal formType="Edit" itemType="Flight" setReload={setReload} item={item} />
        </td>
        <td>
          <DeleteModal itemType="Flight" setReload={setReload} item={item} />
        </td>
      </tr>
    ));

    landingTableData = landingFlights.map((item) => (
      <tr key={item.id}>
        <th scope="row">{item.id}</th>
        <td>{item.airline}</td>
        <td>{item.depart_airport}</td>
        <td>{item.landing_airport}</td>
        <td>
          <FormModal formType="Edit" setReload={setReload} itemType="Flight" item={item} />
        </td>
        <td>
          <DeleteModal itemType="Flight" setReload={setReload} item={item} />
        </td>
      </tr>
    ));
  }

  return (
    <Container className="App">
      <Row style={{ margin: '5vh 0' }}>
        <Col style={{ padding: '0' }}>
          <div style={{ display: 'flex', gap: '3vw', alignItems: 'center' }}>
            <h1>Airport: {airport.name}</h1>
            <FormModal formType="Add" itemType="Flight" setReload={setReload} />
            <FormModal formType="Edit" itemType="Airport" setReload={setReload} item={airport} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Depart from this airport</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table responsive hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Airline</th>
                <th>Depart from</th>
                <th>Landing to</th>
              </tr>
            </thead>
            <tbody>{departTableData}</tbody>
          </Table>
        </Col>
      </Row>
      <br></br>
      <Row>
        <Col>
          <h2>Landing to this airport</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table responsive hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Airline</th>
                <th>Depart from</th>
                <th>Landing to</th>
              </tr>
            </thead>
            <tbody>{landingTableData}</tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default AirportDetail;
