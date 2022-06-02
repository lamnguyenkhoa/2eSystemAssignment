import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { getCountries, addAirline, updateAirlineById } from '../api';

function AirlineForm(props) {
  const defaultAirline = {
    name: '',
    country_id: '',
  };

  const [validated, setValidated] = useState(false);
  const [airline, setAirline] = useState(props.item || defaultAirline);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountries().then((res) => {
      setCountries(res);
    });
  }, []);

  const handleChange = (key, value) => {
    setAirline({ ...airline, [key]: value });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      // Success
      if (props.formType === 'Add') addAirline(airline);
      if (props.formType === 'Edit') updateAirlineById(airline, airline.id);
      props.setShow(false);
      window.location.reload();
    }
    setValidated(true);
    console.log(airline);
  };

  let defaultCountryOption = '';

  if (props.formType === 'Add')
    defaultCountryOption = (
      <option value="" disabled defaultValue={true}>
        Choose a country
      </option>
    );

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formAirlineName">
        <Form.Label style={{ fontWeight: 500 }}>Airline name:</Form.Label>
        <Form.Control
          name="name"
          value={airline.name || ''}
          type="text"
          placeholder="Enter airline name..."
          onChange={(e) => {
            handleChange('name', e.target.value);
          }}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="fomrCountryId">
        <Form.Label style={{ fontWeight: 500 }}>Country:</Form.Label>
        <Form.Select
          name="country_id"
          aria-label="Default select example"
          onChange={(e) => {
            handleChange('country_id', e.target.value);
          }}
          value={airline.country_id || ''}
          required
        >
          {defaultCountryOption}
          {countries.map((country, index) => (
            <option key={index} value={String(country.id)}>
              {country.name} ({country.iso_code})
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Button type="submit">Save changes</Button>
    </Form>
  );
}

export default AirlineForm;
