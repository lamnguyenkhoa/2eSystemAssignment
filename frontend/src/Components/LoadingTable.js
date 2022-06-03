import React from 'react';
import { Spinner } from 'react-bootstrap';

function LoadingTable(props) {
  let spinner = (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );

  var rows = [];
  for (var i = 0; i < props.col - 1; i++) {
    rows[i] = <td>{spinner}</td>;
  }

  return (
    <tr key={0}>
      <th scope="row">{spinner}</th>
      {rows}
    </tr>
  );
}

export default LoadingTable;
