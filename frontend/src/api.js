const axios = require('axios');

export function getCountries() {
  let endpoint = '/api/country';
  return axios.get(endpoint).then((response) => response.data);
}

export function getAirports() {
  let endpoint = '/api/airport';
  return axios.get(endpoint).then((response) => response.data);
}

export function getFlights() {
  let endpoint = '/api/flight';
  return axios.get(endpoint).then((response) => response.data);
}

export function getAirlines() {
  let endpoint = '/api/airline';
  return axios.get(endpoint).then((response) => response.data);
}
