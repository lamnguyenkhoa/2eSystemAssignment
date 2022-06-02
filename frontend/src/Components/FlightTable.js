import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

class FlightTable extends Component {
  render() {
    const items = this.props.items.map((item) => {
      return (
        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.airline}</td>
          <td>{item.depart_from}</td>
          <td>{item.landing_to}</td>
          <td>{item.depart_time}</td>
          <td>{item.flight_time_sec}</td>
        </tr>
      );
    });

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Airline</th>
            <th>Depart from</th>
            <th>Langing to</th>
            <th>Depart time</th>
            <th>Flight time</th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
      </Table>
    );
  }
}

export default FlightTable;
