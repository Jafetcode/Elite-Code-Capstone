const mysql = require('mysql2');
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME
});

db.connect((err) => {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }
    console.log('Connected to database');
    
    // Log the current database
    db.query('SELECT DATABASE()', (err, results) => {
      if (err) {
        console.error('Error fetching database name:', err);
      } else {
        console.log('Currently connected to database:', results[0]);
      }
    });
});

module.exports = db;
