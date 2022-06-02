import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import FormModal from './FormModal';
import { deleteCountryById } from '../api';
class CountryTable extends Component {
  handleDelete = (id) => {
    deleteCountryById(id);
    window.location.reload();
  };

  render() {
    const items = this.props.items.map((item) => {
      return (
        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.name}</td>
          <td>{item.iso_code}</td>
          <td>
            <FormModal formType="Edit" inputType="Country" item={item} />
          </td>
          <td>
            <Button variant="danger" onClick={this.handleDelete(item.id)}>
              Delete
            </Button>
          </td>
        </tr>
      );
    });

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>ISO code</th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
      </Table>
    );
  }
}

export default CountryTable;
