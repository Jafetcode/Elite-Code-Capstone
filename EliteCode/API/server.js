
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const port = 3306;
const app = express();
const studentRoutes = require('./routes/studentRoutes');
const instructorRoutes = require('./routes/instructorRoutes');

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use("/student", studentRoutes);
app.use("/instructor", instructorRoutes);

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


app.get('/api/welcome', (req, res) => {
  res.status(200).send({ message: "Welcome to elitecode API" });
})
// get user role 
app.get('/userRole', (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  db.query('SELECT role, userID, fname FROM Users WHERE email = ?', [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length > 0) {
      return res.json({
        role: results[0].role,
        userID: results[0].userID,
        name: results[0].fname
      });
    }
    return res.status(404).json({ error: `User not found: ${email}` });
  });
});


// get user
app.get('/user', (req, res) => {
  db.query('SELECT * FROM Users', (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else if (results.length > 0) {
      console.log(results)
      res.json({
        role: results[0].role,
        userID: results[0].userID,
        name: results[0].fname
      });

    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });
});

app.post('/newUser', (req, res) => {
  const { email, fname, lname, role } = req.body;
  if (!email || !fname || !lname || !role) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const sql = 'INSERT INTO Users(email, fname, lname, role) VALUES (?, ?, ?, ?)';
  db.query(sql, [email, fname, lname, role], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'User added successfully', userId: results.insertId });
  });
});

app.post('/question', (req, res) => {
  const { teacherID, question, pointVal, topic, type, imgfile, language } = req.body;
  if (!teacherID ||!question || !pointVal || !topic || !type) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const sql = 'INSERT INTO Questions(email, fname, lname, role) VALUES (?, ?, ?, ?)';
  db.query(sql, [email, fname, lname, role], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    
    res.json({ message: 'User added successfully', userId: results.insertId });
  });



  app.listen(port, '0.0.0.0', () => {  // Ensure it listens on all network interfaces
    console.log(`Server running on port ${port}`);
  });
