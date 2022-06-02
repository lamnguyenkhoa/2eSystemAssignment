import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import CountryForm from './CountryForm';
import AirlineForm from './AirlineForm';
import AirportForm from './AirportForm';
import FlightForm from './FlightForm';

/*
This is a popup that display the form for add or edit an item.
The form structure will depend on props.itemType (country, airport, etc.)
*/
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
  else if (props.itemType === 'Flight')
    form = <FlightForm setShow={setShow} item={props.item} formType={props.formType} />;

  let button = '';
  if (props.formType === 'Add')
    button = (
      <Button variant="primary" onClick={handleShow}>
        Add {props.itemType}
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
