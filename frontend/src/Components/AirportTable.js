import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

class AirportTable extends Component {
  render() {
    const items = this.props.items.map((item) => {
      return (
        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.name}</td>
          <td>{item.latitude}</td>
          <td>{item.longitude}</td>
          <td>{item.country}</td>
        </tr>
      );
    });

    return (
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
        <tbody>{items}</tbody>
      </Table>
    );
  }
}

export default AirportTable;
