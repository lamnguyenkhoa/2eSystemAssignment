const axios = require('axios');

// Due to backend assume every attribute of the sent body is string
// we need to make sure that
function toString(o) {
  Object.keys(o).forEach((k) => {
    if (typeof o[k] === 'object') {
      return toString(o[k]);
    }

    o[k] = '' + o[k];
  });

  return o;
}

/*=================== COUNTRIES ==================*/

export function getCountries() {
  let endpoint = '/api/country';
  return axios.get(endpoint).then((res) => res.data);
}

export function addCountry(country) {
  let endpoint = '/api/country';
  return axios.post(endpoint, toString(country)).then((res) => res.data);
}

export function updateCountryById(country, id) {
  let endpoint = '/api/country/' + id;
  return axios.put(endpoint, toString(country)).then((res) => res.data);
}

export function deleteCountryById(id) {
  let endpoint = '/api/country/' + id;
  return axios.delete(endpoint).then((res) => res.data);
}

/*=================== AIRLINES ==================*/

export function getAirlines() {
  let endpoint = '/api/airline';
  return axios.get(endpoint).then((res) => res.data);
}

export function addAirline(airline) {
  let endpoint = '/api/airline';
  return axios.post(endpoint, toString(airline)).then((res) => res.data);
}

export function updateAirlineById(airline, id) {
  let endpoint = '/api/airline/' + id;
  return axios.put(endpoint, toString(airline)).then((res) => res.data);
}

export function deleteAirlineById(id) {
  let endpoint = '/api/airline/' + id;
  return axios.delete(endpoint).then((res) => res.data);
}

/*=================== AIRPORTS ==================*/

export function getAirports() {
  let endpoint = '/api/airport';
  return axios.get(endpoint).then((res) => res.data);
}

export function addAirports(airport) {
  let endpoint = '/api/airport';
  return axios.post(endpoint, toString(airport)).then((res) => res.data);
}

export function updateAirportsById(airport, id) {
  let endpoint = '/api/airport/' + id;
  return axios.put(endpoint, toString(airport)).then((res) => res.data);
}

export function deleteAirportsById(id) {
  let endpoint = '/api/airport/' + id;
  return axios.delete(endpoint).then((res) => res.data);
}

/*=================== FLIGHTS ==================*/

export function getFlights() {
  let endpoint = '/api/flight';
  return axios.get(endpoint).then((res) => res.data);
}

export function addFlight(flight) {
  let endpoint = '/api/flight';
  return axios.post(endpoint, toString(flight)).then((res) => res.data);
}

export function updateFlightById(flight, id) {
  let endpoint = '/api/flight/' + id;
  return axios.put(endpoint, toString(flight)).then((res) => res.data);
}

export function deleteFlightById(id) {
  let endpoint = '/api/flight/' + id;
  return axios.delete(endpoint).then((res) => res.data);
}
