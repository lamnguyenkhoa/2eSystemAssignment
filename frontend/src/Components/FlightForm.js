import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { getAirlines, getAirports, addFlight, updateFlightById } from '../api';

function FlightForm(props) {
  const defaultFlight = {
    airline_id: '',
    depart_from: '',
    landing_to: '',
  };

  const [validated, setValidated] = useState(false);
  const [flight, setFlight] = useState(props.item || defaultFlight);
  const [airlines, setAirlines] = useState([]);
  const [airports, setAirports] = useState([]);
  const [sameAirportError, setSameAirportError] = useState(false);

  useEffect(() => {
    getAirlines().then((res) => {
      setAirlines(res);
    });
    getAirports().then((res) => {
      setAirports(res);
    });
  }, []);

  const handleChange = (key, value) => {
    setFlight({ ...flight, [key]: value });
  };

  const flightValidate = () => {
    if (parseInt(flight.depart_from) === parseInt(flight.landing_to)) {
      setSameAirportError(true);
      return false;
    }

    setSameAirportError(false);
    return true;
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    flightValidate();
    event.preventDefault();
    if (form.checkValidity() === false || flightValidate() === false) {
      // Failure
      event.stopPropagation();
    } else {
      // Success
      if (props.formType === 'Add') addFlight(flight);
      if (props.formType === 'Edit') updateFlightById(flight, flight.id);
      props.setReload(true);
      props.setShow(false);
      setValidated(true);
    }
    console.log(flight);
  };

  /* 
  If add new flight, the `defaultCountryOption` will force the user
  to choose airports and airline, (prevent the first item in the dropdown
  list to be selected as default).
  */
  let defaultAirportOption = '';
  if (props.formType === 'Add')
    defaultAirportOption = (
      <option value="" disabled defaultValue={true}>
        Choose an airport
      </option>
    );
  let defaultAirlineOption = '';
  if (props.formType === 'Add')
    defaultAirlineOption = (
      <option value="" disabled defaultValue={true}>
        Choose an airline
      </option>
    );

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="fomrFlightAirlineId">
        <Form.Label style={{ fontWeight: 500 }}>Airline:</Form.Label>
        <Form.Select
          name="airline_id"
          aria-label="Default select example"
          onChange={(e) => {
            handleChange('airline_id', e.target.value);
          }}
          value={flight.airline_id || ''}
          required
        >
          {defaultAirlineOption}
          {airlines.map((airline, index) => (
            <option key={index} value={String(airline.id)}>
              {airline.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="fomrFlightDepartId">
        <Form.Label style={{ fontWeight: 500 }}>Depart from:</Form.Label>
        <Form.Select
          name="depart_from"
          aria-label="Default select example"
          onChange={(e) => {
            handleChange('depart_from', e.target.value);
          }}
          value={flight.depart_from || ''}
          isInvalid={sameAirportError}
          required
        >
          {defaultAirportOption}
          {airports.map((airport, index) => (
            <option key={index} value={String(airport.id)}>
              {airport.name}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          Depart from and Landing to cannot be same airport
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="fomrFlightLandingId">
        <Form.Label style={{ fontWeight: 500 }}>Landing to:</Form.Label>
        <Form.Select
          name="landing_to"
          aria-label="Default select example"
          onChange={(e) => {
            handleChange('landing_to', e.target.value);
          }}
          value={flight.landing_to || ''}
          isInvalid={sameAirportError}
          required
        >
          {defaultAirportOption}
          {airports.map((airport, index) => (
            <option key={index} value={airport.id}>
              {airport.name}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          Depart from and Landing to cannot be same airport
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit">Save changes</Button>
    </Form>
  );
}

export default FlightForm;
