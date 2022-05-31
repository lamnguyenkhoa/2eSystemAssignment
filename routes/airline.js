const express = require('express');
const app = express();
const airlineController = require('../controllers/airline');

// All routes here has /api prefix

app.post('/airline', airlineController.validateRequest, airlineController.create);
app.get('/airline', airlineController.findAll);
app.get('/airline/:id', airlineController.findById);
app.put('/airline/:id', airlineController.validateRequest, airlineController.updateById);
app.delete('/airline/:id', airlineController.deleteById);

module.exports = app;
