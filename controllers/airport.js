const Airport = require('../models/airport');

function create(req, res) {
  // Create the object
  const airport = new Airport({
    name: req.body.name,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    country_id: req.body.country_id,
  });
  // Save to the database
  Airport.create(airport, (err, data) => {
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
  Airport.findAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message,
      });
    else res.status(200).send(data);
  });
}

function findById(req, res) {
  Airport.findById(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message,
      });
    else res.status(200).send(data);
  });
}

function updateById(req, res) {
  // Create the object
  const airport = new Airport({
    name: req.body.name,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    country_id: req.body.country_id,
  });
  // Save to the database
  Airport.updateById(req.params.id, airport, (err, data) => {
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
  Airport.deleteById(req.params.id, (err, data) => {
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
      message: 'Airport name cannot be empty!',
    });
    return;
  } else if (!req.body.country_id || req.body.country_id.trim() == '') {
    res.status(400).send({
      message: 'Country id cannot be empty!',
    });
    return;
  } else if (!req.body.latitude || req.body.latitude.trim() == '') {
    res.status(400).send({
      message: 'Latitude cannot be empty!',
    });
    return;
  } else if (!req.body.longitude || req.body.longitude.trim() == '') {
    res.status(400).send({
      message: 'Longitude cannot be empty!',
    });
    return;
  }

  // Sanitize
  req.body.name = req.body.name.trim();
  req.body.country_id = Number(req.body.country_id.trim());
  req.body.latitude = req.body.latitude.trim();
  req.body.longitude = req.body.longitude.trim();
  let floatLatitude = parseFloat(req.body.latitude).toFixed(6);
  let floatLongitude = parseFloat(req.body.longitude).toFixed(6);
  req.body.latitude = floatLatitude;
  req.body.longitude = floatLongitude;
  // TODO: Check for SQL injection

  // Check correct data type
  if (!Number.isInteger(req.body.country_id) || req.body.country_id < 0) {
    res.status(400).send({
      message: 'Country id must be a positive integer!',
    });
    return;
  } else if (isNaN(req.body.latitude)) {
    res.status(400).send({
      message: 'Latitude must be number!',
    });
    return;
  } else if (isNaN(req.body.latitude)) {
    res.status(400).send({
      message: 'Latitude must be number!',
    });
    return;
  } else if (isNaN(req.body.longitude)) {
    res.status(400).send({
      message: 'Longitude must be number!',
    });
    return;
  }

  // Validate range
  if (req.body.latitude < -90 || req.body.latitude > 90) {
    res.status(400).send({
      message: 'Latitude must between -90 and 90!',
    });
    return;
  } else if (req.body.longitude < -180 || req.body.longitude > 180) {
    res.status(400).send({
      message: 'Longitude must between -180 and 180!',
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
