
const express = require('express');
const router = express.Router();
const db = require('../db');
// const path = require("path");
// const { getUser } = require(path.join(__dirname, "../../AuthContext.jsx"));
// const { useAuth } = require("../../../EliteCode/AuthContext"); 


// Define your routes
router.get('/', (req, res) => {
  res.send('Instructor route');
});

router.post('/createCourse', (req, res) => {
  const { tid } = req.query;
  const { courseName, description } = req.body;
  if (!courseName || !tid) {
    return res.status(400).json({ error: 'Missing required fields' });

  }

  const sql = 'INSERT INTO Classes (courseName, tid, description) VALUES (?, ?, ?)';
  db.query(sql, [courseName, tid, description], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Course created', courseId: results.insertId });
  });
})
router.get('/test', (req, res) => {
  console.log("Test route hit");
  res.send("Test route works!");
});

router.get('/getCourses', (req, res) => {
  console.log("in get courses")
  const { tid } = req.query;
  const sql = 'SELECT * FROM Classes WHERE tid = ?';

  db.query(sql, tid, (err, results) =>{
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Export the router
module.exports = router;
