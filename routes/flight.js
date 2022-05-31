const express = require('express');
const app = express();
const flightController = require('../controllers/flight');

// All routes here has /api prefix

app.post('/flight', flightController.validateRequest, flightController.create);
app.get('/flight', flightController.findAll);
app.get('/flight/:id', flightController.findById);
app.put('/flight/:id', flightController.validateRequest, flightController.updateById);
app.delete('/flight/:id', flightController.deleteById);

module.exports = app;
