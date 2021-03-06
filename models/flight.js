const util = require('util');
const mySQLConnection = require('../db');

// Node native promisify since mysql2 query don't support promise or async/await
const promisifiedQuery = util.promisify(mySQLConnection.query).bind(mySQLConnection);

const Flight = function (flight) {
  this.airline_id = flight.airline_id;
  this.depart_from = flight.depart_from;
  this.landing_to = flight.landing_to;
};

let getQuery = ' SELECT f.id, al.name as airline, ap1.name as depart_airport,';
getQuery += ' ap2.name as landing_airport, al.id as airline_id,';
getQuery += ' ap1.id as depart_from, ap2.id as landing_to  FROM flight as f';
getQuery += ' INNER JOIN airline as al ON f.airline_id = al.id';
getQuery += ' INNER JOIN airport as ap1 ON f.depart_from = ap1.id';
getQuery += ' INNER JOIN airport as ap2 ON f.landing_to = ap2.id';

Flight.create = async (newFlight, cb) => {
  let err = await checkIfInvalid(newFlight);
  if (err) {
    cb(err, null);
    return;
  }

  // Insert to database
  promisifiedQuery('INSERT INTO flight SET ?', newFlight, (err, res) => {
    if (err) {
      console.log('Error when create new flight:', err);
      cb(err, null);
      return;
    }
    console.log('Created airport:', { id: res.insertId, ...newFlight });
    cb(null, { id: res.insertId, ...newFlight });
  });
};

Flight.findAll = (cb) => {
  promisifiedQuery(getQuery, (err, res) => {
    if (err) {
      console.log('Error when get all flights:', err);
      cb(err, null);
      return;
    }
    console.log('Flights:', res);
    cb(null, res);
  });
};

Flight.findById = (id, cb) => {
  let query = getQuery + ' WHERE f.id = ?';
  promisifiedQuery(query, [id], (err, res) => {
    if (err) {
      console.log('Error when get flight with id:' + id, err);
      cb(err, null);
      return;
    }
    console.log('Flight:', res);
    cb(null, res);
  });
};

Flight.findByAirportId = (id, cb) => {
  let query = getQuery + ' WHERE f.depart_from = ? OR f.landing_to = ?';
  promisifiedQuery(query, [id, id], (err, res) => {
    if (err) {
      console.log('Error when get flights by airport id:' + id, err);
      cb(err, null);
      return;
    }
    console.log('Flights:', res);
    cb(null, res);
  });
};

Flight.updateById = async (id, flight, cb) => {
  let err = await checkIfInvalid(flight);
  if (err) {
    cb(err, null);
    return;
  }

  // Update
  let query = 'UPDATE flight SET airline_id = ?, depart_from = ?, ';
  query += 'landing_to = ? WHERE id = ?';
  promisifiedQuery(
    query,
    [flight.airline_id, flight.depart_from, flight.landing_to, id],
    (err, res) => {
      if (err) {
        console.log('Error when update flight:', err);
        cb(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        let err = { message: 'Cannot found flight with id ' + id };
        cb(err, null);
        return;
      }
      console.log('Updated flight: ', { id: id, ...flight });
      cb(null, { id: id, ...flight });
    }
  );
};

Flight.deleteById = (id, cb) => {
  promisifiedQuery('DELETE FROM flight WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('Error when delete flight by id:', err);
      cb(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      let err = { message: 'Cannot found flight with id ' + id };
      cb(err, null);
      return;
    }
    console.log('Deleted flight with id: ', id);
    cb(null, res);
  });
};

async function checkIfInvalid(flight) {
  // We don't check duped flight because there are edge case
  // such as 2 planes from same airline with same travel plan

  // Check if depart_from and landing_to is the same
  if (flight.depart_from == flight.landing_to) {
    console.log(`This flight depart from and landing to the same airport!`);
    let err = { message: `This flight depart from and landing to the same airport!` };
    return err;
  }

  // Check airline_id validity
  airlineIdQuery = 'SELECT * FROM airline WHERE id=' + flight.airline_id;
  try {
    res = await promisifiedQuery(airlineIdQuery);
  } catch (err) {
    console.log('Error when check for exist airline_id before add/update flight.', err);
    return err;
  }
  if (res.length <= 0) {
    console.log(`This airline_id ${flight.airline_id} does not exist!`);
    let err = { message: `This airline_id ${flight.airline_id} does not exist!` };
    return err;
  }

  // Check depart_from validity
  departFromQuery = 'SELECT * FROM airport WHERE id=' + flight.depart_from;
  try {
    res = await promisifiedQuery(departFromQuery);
  } catch (err) {
    console.log('Error when check for exist depart_from before add/update flight.', err);
    return err;
  }
  if (res.length <= 0) {
    console.log(`This depart_from ${flight.depart_from} does not exist!`);
    let err = { message: `This depart_from ${flight.depart_from} does not exist!` };
    return err;
  }

  // Check landing_to validity
  landingToQuery = 'SELECT * FROM airport WHERE id=' + flight.landing_to;
  try {
    res = await promisifiedQuery(landingToQuery);
  } catch (err) {
    console.log('Error when check for exist depart_from before add/update flight.', err);
    return err;
  }
  if (res.length <= 0) {
    console.log(`This landing_to ${flight.landing_to} does not exist!`);
    let err = { message: `This landing_to ${flight.landing_to} does not exist!` };
    return err;
  }

  return null;
}

module.exports = Flight;
