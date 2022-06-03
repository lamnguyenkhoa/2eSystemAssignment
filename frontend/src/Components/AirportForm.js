import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { getCountries, addAirports, updateAirportsById } from '../api';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';

function AirportForm(props) {
  const defaultAirport = {
    name: '',
    latitude: '0.0',
    longitude: '0.0',
    country_id: '',
  };

  const [validated, setValidated] = useState(false);
  const [airport, setAirport] = useState(props.item || defaultAirport);
  const [countries, setCountries] = useState([]);
  const [map, setMap] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const handleGoogleMapOnClick = (e) => {
    // Format to 6 decimals place of their format in MySQL
    let formatLat = e.latLng.lat().toFixed(6);
    let formatLng = e.latLng.lng().toFixed(6);
    setAirport({ ...airport, longitude: formatLng, latitude: formatLat });
  };

  const handleMapLoad = (map) => {
    setMap(map);
  };

  useEffect(() => {
    getCountries().then((res) => {
      setCountries(res);
    });
  }, []);

  const handleChange = (key, value) => {
    setAirport({ ...airport, [key]: value });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      // Failure
      event.stopPropagation();
    } else {
      // Success
      if (props.formType === 'Add') addAirports(airport);
      if (props.formType === 'Edit') updateAirportsById(airport, airport.id);
      props.setShow(false);
      props.setReload(true);
    }
    setValidated(true);
    console.log(airport);
  };

  /* 
  If add new airport, the `defaultCountryOption` will force the user
  to choose a country, (prevent the first country in the dropdown
  list to be selected as default).
  The `defaultGoogleMapZoomLevel` set to 1 will help user find
  their location on map easier.
  */
  let defaultCountryOption = '';
  let defaultGoogleMapZoomLevel = 15;
  if (props.formType === 'Add') {
    defaultCountryOption = (
      <option value="" disabled defaultValue={true}>
        Choose a country
      </option>
    );
    defaultGoogleMapZoomLevel = 1;
  }

  if (!isLoaded) {
    return <p>Loading</p>;
  }

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formAirportName">
        <Form.Label style={{ fontWeight: 500 }}>Airport name:</Form.Label>
        <Form.Control
          name="name"
          value={airport.name || ''}
          type="text"
          placeholder="Enter airport name..."
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
          value={String(airport.country_id) || ''}
          required
        >
          {defaultCountryOption}
          {countries.map((country, index) => (
            <option key={index} value={country.id}>
              {country.name} ({country.iso_code})
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formAirportLatitude">
        <Form.Label style={{ fontWeight: 500 }}>Airport Latitude:</Form.Label>
        <Form.Control
          name="latitude"
          value={airport.latitude || '0.0'}
          type="number"
          onChange={(e) => {
            handleChange('latitude', e.target.value);
          }}
          readOnly
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formAirportLongitude">
        <Form.Label style={{ fontWeight: 500 }}>Airport Longitude:</Form.Label>
        <Form.Control
          name="longitude"
          value={airport.longitude || '0.0'}
          type="number"
          onChange={(e) => {
            handleChange('longitude', e.target.value);
          }}
          readOnly
          required
        />
      </Form.Group>

      <GoogleMap
        center={{ lat: parseFloat(airport.latitude), lng: parseFloat(airport.longitude) }}
        zoom={defaultGoogleMapZoomLevel}
        mapContainerStyle={{ width: '100%', height: '40vh' }}
        onLoad={handleMapLoad}
        onClick={handleGoogleMapOnClick}
      >
        <Marker
          position={{ lat: parseFloat(airport.latitude), lng: parseFloat(airport.longitude) }}
          map={map}
        ></Marker>
      </GoogleMap>

      <Button className="mt-3" type="submit">
        Save changes
      </Button>
    </Form>
  );
}

export default AirportForm;
