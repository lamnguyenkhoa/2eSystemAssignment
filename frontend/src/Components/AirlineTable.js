import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

class AirlineTable extends Component {
  render() {
    const items = this.props.items.map((item) => {
      return (
        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.name}</td>
          <td>{item.country}</td>
        </tr>
      );
    });

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Airline name</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
      </Table>
    );
  }
}

export default AirlineTable;
