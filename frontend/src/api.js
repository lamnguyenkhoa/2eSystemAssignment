const axios = require('axios');

/*=================== COUNTRIES ==================*/

export function getCountries() {
  let endpoint = '/api/country';
  return axios.get(endpoint).then((res) => res.data);
}

export function addCountry(country) {
  let endpoint = '/api/country';
  return axios.post(endpoint, country).then((res) => res.data);
}

export function updateCountryById(country, id) {
  let endpoint = '/api/country/' + id;
  return axios.put(endpoint, country).then((res) => res.data);
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
  return axios.post(endpoint, airline).then((res) => res.data);
}

export function updateAirlineById(airline, id) {
  let endpoint = '/api/airline/' + id;
  return axios.put(endpoint, airline).then((res) => res.data);
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
  return axios.post(endpoint, airport).then((res) => res.data);
}

export function updateAirportsById(airport, id) {
  let endpoint = '/api/airport/' + id;
  return axios.put(endpoint, airport).then((res) => res.data);
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
  return axios.post(endpoint, flight).then((res) => res.data);
}

export function updateFlightById(flight, id) {
  let endpoint = '/api/flight/' + id;
  return axios.put(endpoint, flight).then((res) => res.data);
}

export function deleteFlightById(id) {
  let endpoint = '/api/flight/' + id;
  return axios.delete(endpoint).then((res) => res.data);
}
