import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { addCountry, updateCountryById } from '../api';

function CountryForm(props) {
  const defaultCountry = {
    name: '',
    iso_code: '',
  };

  const [validated, setValidated] = useState(false);
  const [country, setCountry] = useState(props.item || defaultCountry);

  const handleChange = (key, value) => {
    setCountry({ ...country, [key]: value });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      // Success
      if (props.formType === 'Add') addCountry(country);
      if (props.formType === 'Edit') updateCountryById(country, country.id);
      props.setShow(false);
      window.location.reload();
    }
    setValidated(true);
    console.log(country);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formCountryName">
        <Form.Label style={{ fontWeight: 500 }}>Country name:</Form.Label>
        <Form.Control
          name="name"
          value={country.name || ''}
          type="text"
          placeholder="Enter country name..."
          onChange={(e) => {
            handleChange('name', e.target.value);
          }}
          required
        />
        <Form.Control.Feedback />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formCountryISO">
        <Form.Label style={{ fontWeight: 500 }}>ISO code:</Form.Label>
        <Form.Control
          name="iso_code"
          value={country.iso_code || ''}
          type="text"
          placeholder="Enter ISO code..."
          onChange={(e) => {
            handleChange('iso_code', e.target.value);
          }}
          required
        />
        <Form.Control.Feedback />
      </Form.Group>
      <Button type="submit">Save changes</Button>
    </Form>
  );
}

export default CountryForm;
