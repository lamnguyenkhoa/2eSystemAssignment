const axios = require('axios');

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

export function getAirports() {
  let endpoint = '/api/airport';
  return axios.get(endpoint).then((res) => res.data);
}

export function getFlights() {
  let endpoint = '/api/flight';
  return axios.get(endpoint).then((res) => res.data);
}

export function getAirlines() {
  let endpoint = '/api/airline';
  return axios.get(endpoint).then((res) => res.data);
}
