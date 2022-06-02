import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { deleteCountryById } from '../api';

function DeleteModal(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = () => {
    let deleteAPI = '';
    if (props.itemType === 'Country') deleteAPI = deleteCountryById;

    deleteAPI(props.item.id).then((res) => {
      if (res.affectedRows === 1) {
        // Success
        window.location.reload();
      } else {
        // Failure
        alert('Unable to delete this ' + props.itemType);
      }
    });
    setShow(false);
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.formType} an item</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this {props.itemType}?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;
