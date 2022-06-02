const util = require('util');
const mySQLConnection = require('../db');

// Node native promisify since mysql2 query don't support promise or async/await
const promisifiedQuery = util.promisify(mySQLConnection.query).bind(mySQLConnection);

const Airport = function (airport) {
  this.name = airport.name;
  this.country_id = airport.country_id;
  this.latitude = airport.latitude;
  this.longitude = airport.longitude;
};

Airport.create = async (newAirport, cb) => {
  let err = await checkIfInvalid(newAirport, null);
  if (err) {
    cb(err, null);
    return;
  }

  // Insert to database
  promisifiedQuery('INSERT INTO airport SET ?', newAirport, (err, res) => {
    if (err) {
      console.log('Error when create new airport:', err);
      cb(err, null);
      return;
    }
    console.log('Created airport:', { id: res.insertId, ...newAirport });
    cb(null, { id: res.insertId, ...newAirport });
  });
};

Airport.findAll = (cb) => {
  let query = 'SELECT a.id, a.name, a.latitude, a.longitude, c.name as country FROM airport as a';
  query += ' INNER JOIN country as c ON a.country_id = c.id';
  promisifiedQuery(query, (err, res) => {
    if (err) {
      console.log('Error when get all airports:', err);
      cb(err, null);
      return;
    }
    console.log('Airports:', res);
    cb(null, res);
  });
};

Airport.findById = (id, cb) => {
  let query = 'SELECT a.id, a.name, a.latitude, a.longitude, c.name as country FROM airport as a';
  query += ' INNER JOIN country as c ON a.country_id = c.id';
  query += ' WHERE a.id = ?';
  promisifiedQuery(query, [id], (err, res) => {
    if (err) {
      console.log('Error when get airport with id:' + id, err);
      cb(err, null);
      return;
    }
    console.log('Airport:', res);
    cb(null, res);
  });
};

Airport.updateById = async (id, airport, cb) => {
  let err = await checkIfInvalid(airport, id);
  if (err) {
    cb(err, null);
    return;
  }

  // Update
  let query =
    'UPDATE airport SET country_id = ?, name = ?, latitude = ?, longitude = ? WHERE id = ?';
  promisifiedQuery(
    query,
    [airport.country_id, airport.name, airport.latitude, airport.longitude, id],
    (err, res) => {
      if (err) {
        console.log('Error when update airport:', err);
        cb(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        let err = { message: 'Cannot found airport with id ' + id };
        cb(err, null);
        return;
      }
      console.log('Updated airport: ', { id: id, ...airport });
      cb(null, { id: id, ...airport });
    }
  );
};

Airport.deleteById = (id, cb) => {
  promisifiedQuery('DELETE FROM airport WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('Error when delete airport by id:', err);
      cb(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      let err = { message: 'Cannot found airport with id ' + id };
      cb(err, null);
      return;
    }
    console.log('Deleted airport with id: ', id);
    cb(null, res);
  });
};

async function checkIfInvalid(airport, id) {
  // Check if duped airport
  let res;
  existQuery = 'SELECT * FROM airport';
  existQuery += ` WHERE name LIKE '%${airport.name}%'`;
  try {
    res = await promisifiedQuery(existQuery);
  } catch (err) {
    console.log('Error when check for existing airport before insert airport.', err);
    return err;
  }
  // Remove itself from result array (when update)
  if (id) {
    for (var i = res.length - 1; i >= 0; --i) {
      if (res[i].id == id) {
        res.splice(i, 1);
      }
    }
  }
  if (res.length > 0) {
    console.log(`${airport.name} airport already exist!`);
    let err = { message: `${airport.name} airport already exist!` };
    return err;
  }

  // Check if country_id validity
  countryCheckQuery = 'SELECT * FROM country WHERE id=' + airport.country_id;
  try {
    res = await promisifiedQuery(countryCheckQuery);
  } catch (err) {
    console.log('Error when check for exist country_id before add/update airport.', err);
    return err;
  }
  if (res.length <= 0) {
    console.log(`This country_id ${airport.country_id} does not exist!`);
    let err = { message: `This country_id ${airport.country_id} does not exist!` };
    return err;
  }
  return null;
}

module.exports = Airport;
