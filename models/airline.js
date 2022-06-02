const util = require('util');
const mySQLConnection = require('../db');

// Node native promisify since mysql2 query don't support promise or async/await
const promisifiedQuery = util.promisify(mySQLConnection.query).bind(mySQLConnection);

const Airline = function (airline) {
  this.name = airline.name;
  this.country_id = airline.country_id;
};

Airline.create = async (newAirline, cb) => {
  let err = await checkIfInvalid(newAirline, null);
  if (err) {
    cb(err, null);
    return;
  }

  // Insert to database
  promisifiedQuery('INSERT INTO airline SET ?', newAirline, (err, res) => {
    if (err) {
      console.log('Error when create new airline:', err);
      cb(err, null);
      return;
    }
    console.log('Created airline:', { id: res.insertId, ...newAirline });
    cb(null, { id: res.insertId, ...newAirline });
  });
};

Airline.findAll = (cb) => {
  let query = 'SELECT a.id, a.name, c.name as country, c.id as country_id FROM airline as a';
  query += ' INNER JOIN country as c ON a.country_id = c.id';
  promisifiedQuery(query, (err, res) => {
    if (err) {
      console.log('Error when get all airlines:', err);
      cb(err, null);
      return;
    }
    console.log('Airlines:', res);
    cb(null, res);
  });
};

Airline.findById = (id, cb) => {
  let query = 'SELECT a.id, a.name, c.name as country, c.id as country_id FROM airline as a';
  query += ' INNER JOIN country as c ON a.country_id = c.id';
  query += ' WHERE a.id = ?';

  promisifiedQuery(query, [id], (err, res) => {
    if (err) {
      console.log('Error when get airline with id:' + id, err);
      cb(err, null);
      return;
    }
    console.log('Airline:', res);
    cb(null, res);
  });
};

Airline.updateById = async (id, airline, cb) => {
  let err = await checkIfInvalid(airline, id);
  if (err) {
    cb(err, null);
    return;
  }

  // Update
  let query = 'UPDATE airline SET country_id = ?, name = ? WHERE id = ?';
  promisifiedQuery(query, [airline.country_id, airline.name, id], (err, res) => {
    if (err) {
      console.log('Error when update airline:', err);
      cb(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      let err = { message: 'Cannot found airline with id ' + id };
      cb(err, null);
      return;
    }
    console.log('Updated airline: ', { id: id, ...airline });
    cb(null, { id: id, ...airline });
  });
};

Airline.deleteById = (id, cb) => {
  promisifiedQuery('DELETE FROM airline WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('Error when delete airline by id:', err);
      cb(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      let err = { message: 'Cannot found airline with id ' + id };
      cb(err, null);
      return;
    }
    console.log('Deleted airline with id: ', id);
    cb(null, res);
  });
};

async function checkIfInvalid(airline, id) {
  // Check if duped airline
  let res;
  existQuery = 'SELECT * FROM airline';
  existQuery += ` WHERE name LIKE '%${airline.name}%'`;
  try {
    res = await promisifiedQuery(existQuery);
  } catch (err) {
    console.log('Error when check for existing airline before insert airline.', err);
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
    console.log(`${airline.name} airline already exist!`);
    let err = { message: `${airline.name} airline already exist!` };
    return err;
  }

  // Check if country_id validity
  countryCheckQuery = 'SELECT * FROM country WHERE id=' + airline.country_id;
  try {
    res = await promisifiedQuery(countryCheckQuery);
  } catch (err) {
    console.log('Error when check for exist country_id before add/update airline.', err);
    return err;
  }
  if (res.length <= 0) {
    console.log(`This country_id ${airline.country_id} does not exist!`);
    let err = { message: `This country_id ${airline.country_id} does not exist!` };
    return err;
  }
  return null;
}

module.exports = Airline;
