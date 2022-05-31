const Country = require('../models/country');

function create(req, res) {
  // Create the object
  const country = new Country({
    iso_code: req.body.iso_code,
    name: req.body.name,
  });
  // Save to the database
  Country.create(country, (err, data) => {
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
  Country.findAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message,
      });
    else res.status(200).send(data);
  });
}

function findById(req, res) {
  Country.findById(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message,
      });
    else res.status(200).send(data);
  });
}

function updateById(req, res) {
  // Create the object
  const country = new Country({
    iso_code: req.body.iso_code,
    name: req.body.name,
  });
  // Save to the database
  Country.updateById(req.params.id, country, (err, data) => {
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
  Country.deleteById(req.params.id, (err, data) => {
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
      message: 'Country name cannot be empty!',
    });
    return;
  } else if (!req.body.iso_code || req.body.iso_code.trim() == '') {
    res.status(400).send({
      message: 'Country ISO code cannot be empty!',
    });
    return;
  }

  // Sanitize
  req.body.name = req.body.name.trim();
  req.body.iso_code = req.body.iso_code.trim();
  //TODO: Check for SQL injection

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
