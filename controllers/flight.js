const Flight = require('../models/flight');

function create(req, res) {
  // Create the object
  const flight = new Flight({
    airline_id: req.body.airline_id,
    depart_from: req.body.depart_from,
    landing_to: req.body.landing_to,
  });
  // Save to the database
  Flight.create(flight, (err, data) => {
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
  Flight.findAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message,
      });
    else res.status(200).send(data);
  });
}

function findById(req, res) {
  Flight.findById(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message,
      });
    else res.status(200).send(data);
  });
}

function findByAirportId(req, res) {
  Flight.findByAirportId(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message,
      });
    else res.status(200).send(data);
  });
}

function updateById(req, res) {
  // Create the object
  const flight = new Flight({
    airline_id: req.body.airline_id,
    depart_from: req.body.depart_from,
    landing_to: req.body.landing_to,
  });
  // Save to the database
  Flight.updateById(req.params.id, flight, (err, data) => {
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
  Flight.deleteById(req.params.id, (err, data) => {
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
  } else if (!req.body.airline_id || req.body.airline_id.trim() == '') {
    res.status(400).send({
      message: 'Airline id name cannot be empty!',
    });
    return;
  } else if (!req.body.depart_from || req.body.depart_from.trim() == '') {
    res.status(400).send({
      message: 'Depart from cannot be empty!',
    });
    return;
  } else if (!req.body.landing_to || req.body.landing_to.trim() == '') {
    res.status(400).send({
      message: 'Landing to cannot be empty!',
    });
    return;
  }
  // Sanitize
  req.body.airline_id = Number(req.body.airline_id.trim());
  req.body.depart_from = Number(req.body.depart_from.trim());
  req.body.landing_to = Number(req.body.landing_to.trim());

  // TODO: Check for SQL injection

  // Check correct data type
  if (!Number.isInteger(req.body.airline_id) || req.body.flight_time_sec < 0) {
    res.status(400).send({
      message: 'Airline id must be a positive integer number!',
    });
    return;
  } else if (!Number.isInteger(req.body.depart_from) || req.body.depart_from < 0) {
    res.status(400).send({
      message: 'Depart from must be a positive integer!',
    });
    return;
  } else if (!Number.isInteger(req.body.landing_to) || req.body.landing_to < 0) {
    res.status(400).send({
      message: 'Landing to must be a positive integer!',
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
  findByAirportId,
  validateRequest,
};
