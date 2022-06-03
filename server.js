require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const countryRoute = require('./routes/country');
const airlineRoute = require('./routes/airline');
const airportRoute = require('./routes/airport');
const flightRoute = require('./routes/flight');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

const port = process.env.PORT || 5000;
const host = process.env.HOST || 'localhost';

app.use('/api', countryRoute);
app.use('/api', airlineRoute);
app.use('/api', airportRoute);
app.use('/api', flightRoute);

// Basic route
app.listen(port, function () {
  console.log(`⚡Server is running on ${host}:${port}`);
});

if (process.env.NODE_ENV === 'dev') {
  app.get('/', function (req, res) {
    res.send(`⚡Server is running on ${host}:${port} on dev env`);
  });
}

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
