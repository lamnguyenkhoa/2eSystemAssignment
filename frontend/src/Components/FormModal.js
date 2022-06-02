import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import CountryForm from './CountryForm';
import AirlineForm from './AirlineForm';
import AirportForm from './AirportForm';

function FormModal(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let form = '';
  if (props.itemType === 'Country')
    form = <CountryForm setShow={setShow} item={props.item} formType={props.formType} />;
  else if (props.itemType === 'Airline')
    form = <AirlineForm setShow={setShow} item={props.item} formType={props.formType} />;
  else if (props.itemType === 'Airport')
    form = <AirportForm setShow={setShow} item={props.item} formType={props.formType} />;

  let button = '';
  if (props.formType === 'Add')
    button = (
      <Button variant="primary" onClick={handleShow}>
        Add
      </Button>
    );
  else if (props.formType === 'Edit')
    button = (
      <Button variant="warning" onClick={handleShow}>
        Edit
      </Button>
    );

  return (
    <>
      {button}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.formType} an item</Modal.Title>
        </Modal.Header>
        <Modal.Body>{form}</Modal.Body>
      </Modal>
    </>
  );
}

export default FormModal;
