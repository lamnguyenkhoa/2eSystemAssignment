import React, { Component } from 'react';
import { Table } from 'reactstrap';

class AirlineTable extends Component {
  render() {
    const items = this.props.items.map((item) => {
      return (
        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.country_id}</td>
          <td>{item.name}</td>
        </tr>
      );
    });

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Country ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
      </Table>
    );
  }
}

export default AirlineTable;
