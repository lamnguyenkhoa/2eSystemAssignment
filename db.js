const mysql = require('mysql2');

const env = process.env.NODE_ENV || 'dev';
let connectionPool;

// Create a connection to the database
if (env === 'dev') {
  connectionPool = mysql.createPool({
    host: process.env.DEV_HOST,
    user: process.env.DEV_USER,
    password: process.env.DEV_PASSWORD,
    database: process.env.DEV_DB,
  });
} else if (env === 'production') {
  connectionPool = mysql.createPool({
    host: process.env.PROD_HOST,
    user: process.env.PROD_USER,
    password: process.env.PROD_PASSWORD,
    database: process.env.PROD_DB,
  });
}

// open the MySQL connection
connectionPool.getConnection((err) => {
  if (err) throw err;
  console.log('Successfully connected to the database.');
});

module.exports = connectionPool;
