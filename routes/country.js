const express = require('express');
const app = express();
const countryController = require('../controllers/country');

// All routes here has /api prefix

app.post('/country', countryController.validateRequest, countryController.create);
app.get('/country', countryController.findAll);
app.get('/country/:id', countryController.findById);
app.put('/country/:id', countryController.validateRequest, countryController.updateById);
app.delete('/country/:id', countryController.deleteById);

module.exports = app;
