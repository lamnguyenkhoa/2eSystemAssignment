const util = require('util');
const mySQLConnection = require('../db');

// Node native promisify since mysql2 query don't support promise or async/await
const promisifiedQuery = util.promisify(mySQLConnection.query).bind(mySQLConnection);

const Country = function (country) {
  this.iso_code = country.iso_code;
  this.name = country.name;
};

Country.create = async (newCountry, cb) => {
  let err = await checkIfInvalid(newCountry, null);
  if (err) {
    cb(err, null);
    return;
  }

  // Insert to database
  promisifiedQuery('INSERT INTO country SET ?', newCountry, (err, res) => {
    if (err) {
      console.log('Error when create new country:', err);
      cb(err, null);
      return;
    }
    console.log('Created country:', { id: res.insertId, ...newCountry });
    cb(null, { id: res.insertId, ...newCountry });
  });
};

Country.findAll = (cb) => {
  let query = 'SELECT * FROM country';
  promisifiedQuery(query, (err, res) => {
    if (err) {
      console.log('Error when get all countries:', err);
      cb(err, null);
      return;
    }
    console.log('Countries:', res);
    cb(null, res);
  });
};

Country.findById = (id, cb) => {
  let query = 'SELECT * FROM country WHERE id = ?';
  promisifiedQuery(query, [id], (err, res) => {
    if (err) {
      console.log('Error when get country with id:' + id, err);
      cb(err, null);
      return;
    }
    console.log('Country:', res);
    cb(null, res);
  });
};

Country.updateById = async (id, country, cb) => {
  let err = await checkIfInvalid(country, id);
  if (err) {
    console.log(err);
    cb(err, null);
    return;
  }

  // Update
  let query = 'UPDATE country SET iso_code = ?, name = ? WHERE id = ?';
  promisifiedQuery(query, [country.iso_code, country.name, id], (err, res) => {
    if (err) {
      console.log('Error when update country:', err);
      cb(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      let err = { message: 'Cannot found country with id ' + id };
      cb(err, null);
      return;
    }
    console.log('Updated country: ', { id: id, ...country });
    cb(null, { id: id, ...country });
  });
};

Country.deleteById = (id, cb) => {
  promisifiedQuery('DELETE FROM country WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('Error when delete country by id:', err);
      cb(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      let err = { message: 'Cannot found country with id ' + id };
      cb(err, null);
      return;
    }
    console.log('Deleted country with id: ', id);
    cb(null, res);
  });
};

async function checkIfInvalid(country, id) {
  // Check if exist for dupes
  let res;
  existQuery = 'SELECT * FROM country';
  existQuery += ` WHERE iso_code LIKE '%${country.iso_code}%'`;
  existQuery += ` AND name LIKE '%${country.name}%'`;

  try {
    res = await promisifiedQuery(existQuery);
  } catch (err) {
    console.log('Error when check for existing country before update country.', err);
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
    console.log(`There is ${res.length} same country already existed in database!`);
    let err = { message: 'There is a same country already existed in database!' };
    return err;
  }

  return null;
}

module.exports = Country;
