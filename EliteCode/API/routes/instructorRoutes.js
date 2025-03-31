
const express = require('express');
const router = express.Router();
const db = require('../db');

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


router.get('/getCourses', (req, res) => {
  console.log("in get courses")
  const { tid } = req.query;
  const sql = 'SELECT * FROM Classes WHERE tid = ?';

  db.query(sql, [tid], (err, results) =>{
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
  const sid = req.query.sid;
  const qid = req.query.qid;
  const sql = 'Select * from Submission where qid= ? and sid = ?';
  db.query(sql, [qid, sid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({results});
  });
});


router.get('/questions', (req, res) => {
  const cid = req.query.cid;
  const sql = 'SELECT DISTINCT q.qid, q.question, q.description, q.pointVal, q.imgfile, q.language, q.topic, q.type, q.dueDate, atc.viewable as classView ' +
    'From Questions q RIGHT JOIN AssignedToClass atc on q.qid = atc.qid Where cid = ?';
  db.query(sql, [cid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ results });
  });
});

router.get('/classlist', (req, res) => { //working
  const cid = req.query.cid;
  const sql = 'Select Users.userID, Users.fname, Users.lname, Users.email '
  + 'From Users join Enrolled where Enrolled.cid = ? and Enrolled.sid = Users.userID';
  db.query(sql, [cid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({results});
  });
});

router.get('/courses', (req, res) => { //working
  const tid = req.query.tid;
  const sql = 'Select Classes.cid, Classes.courseName, Classes.description, coalesce(count(distinct Enrolled.sid), 0) as NumEnrolled ' +
  'FROM Classes left join Enrolled on Classes.cid = Enrolled.cid ' +
  'where  Classes.tid = ? ' +
  'GROUP BY Classes.cid, Classes.courseName';
  db.query(sql, [tid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({results});
  });
});
// Export the router
module.exports = router;
