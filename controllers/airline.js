const Airline = require('../models/airline');

function create(req, res) {
  // Create the object
  const airline = new Airline({
    country_id: req.body.country_id,
    name: req.body.name,
  });
  // Save to the database
  Airline.create(airline, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send(data);
    }
  });
}

function findAll(req, res) {
  Airline.findAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message,
      });
    else res.status(200).send(data);
  });
}

function findById(req, res) {
  Airline.findById(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message,
      });
    else res.status(200).send(data);
  });
}

function updateById(req, res) {
  // Create the object
  const airline = new Airline({
    country_id: req.body.country_id,
    name: req.body.name,
  });
  // Save to the database
  Airline.updateById(req.params.id, airline, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send(data);
    }
  });
}

function deleteById(req, res) {
  Airline.deleteById(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message,
      });
    else res.status(200).send(data);
  });
}

function validateRequest(req, res, next) {
  // Check null
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  } else if (!req.body.name || req.body.name.trim() == '') {
    res.status(400).send({
      message: 'Airline name cannot be empty!',
    });
    return;
  } else if (!req.body.country_id || req.body.country_id.trim() == '') {
    res.status(400).send({
      message: 'Country id cannot be empty!',
    });
    return;
  }

  // Sanitize
  req.body.name = req.body.name.trim();
  req.body.country_id = req.body.country_id.trim();
  //TODO: Check for SQL injection

  // Validate range
  const num = Number(req.body.country_id);
  if (!Number.isInteger(num) || num < 0) {
    res.status(400).send({
      message: 'Country id must be a positive integer!',
    });
    return;
  }
  return next();
}

module.exports = {
  create,
  findAll,
  updateById,
  deleteById,
  findById,
  validateRequest,
};
