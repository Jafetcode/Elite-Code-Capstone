
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

router.post('/specificAssignment', (req, res) => {
    const sql = 'INSERT into AssignedToStudent (qid, sid, viewable) VALUES (?, ?, ?)';
    db.query(sql, [qid, sid, viewable], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Student assigned specific question'});
    });
});
router.get('/submission', (req, res) => {
  const sql = 'Select * from Submission where qid= ? and sid = ?';
  db.query(sql, [qid, sid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Student response gathered'});
  });
});

router.get('/submission', (req, res) => {
  const sql = 'Select * from Submission where qid= ? and sid = ?';
  db.query(sql, [qid, sid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Student response gathered'});
  });
});
router.get('/classlist', (req, res) => {
  const sql = 'Select Users.userID, Users.fname, Users.lname, Users.email'
  + 'From elitecode.Users join elitecode.Enrolled where Enrolled.cid = ? and Enrolled.sid = Users.userID';
  db.query(sql, [cid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'classlist gathered'});
  });
});

router.get('/courses', (req, res) => {
  const tid = req.query.tid;
  const sql = 'Select Classes.cid, Classes.courseName, coalesce(count(distinct Enrolled.sid), 0) as NumEnrolled' +
  'FROM Classes left join Enrolled on Classes.cid = Enrolled.cid' +
  'where  Classes.tid = ?' +
  'GROUP BY Classes.cid, Classes.courseName';
  db.query(sql, [tid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'course class count gathered'});
  });
});
// Export the router
module.exports = router;
