const express = require('express');
const app = express();
const airportController = require('../controllers/airport');

// All routes here has /api prefix

app.post('/airport', airportController.validateRequest, airportController.create);
app.get('/airport', airportController.findAll);
app.get('/airport/:id', airportController.findById);
app.put('/airport/:id', airportController.validateRequest, airportController.updateById);
app.delete('/airport/:id', airportController.deleteById);

module.exports = app;
