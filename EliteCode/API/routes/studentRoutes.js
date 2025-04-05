const express = require('express');
const router = express.Router();
const db = require('../db');
// Define your routes
router.get('/', (req, res) => {
  res.send('Student route');
});

router.get('/questions', (req, res) => {
  const sid = req.query.sid;
  const tid = req.query.tid;
  const sql = 'SELECT DISTINCT q.*, ats.viewable as studentView, atc.viewable as classView FROM Questions q ' +
  'LEFT JOIN AssignedToStudent ats ON q.qid = ats.qid ' + 
  'LEFT JOIN AssignedToClass atc ON q.qid = atc.qid ' +
  'LEFT JOIN Enrolled e ON atc.cid = e.cid ' + 
  'LEFT JOIN Classes c ON e.cid = c.cid ' +
  'LEFT JOIN Instructor i ON c.tid = i.tid WHERE (ats.sid = ? AND i.tid = ?) OR (e.sid = ? AND i.tid = ?);'
  db.query(sql, [sid, tid, sid, tid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ results });
  });
});

router.post('/joinCourse', async (req, res) => {
  const { sid, cid } = req.body;
  const sql = `
    INSERT INTO Enrolled (sid, cid)
    VALUES (?, ?);`;
  db.query(sql, [sid, cid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ results });
  });
});


router.get('/courses', async (req, res) => {
  const sid = req.query.sid;
  const sql = `
    SELECT Classes.courseName, Classes.description, Classes.cid
    FROM Enrolled
    JOIN Classes ON Enrolled.cid = Classes.cid
    WHERE Enrolled.sid = ?;`;
  db.query(sql, [sid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }      
    res.json({ results });
  });
});

router.get('/getUpcoming', (req, res) => {
  const sid = req.query.sid;

  const sql = `
    SELECT DISTINCT q.*
    FROM Questions q
    INNER JOIN AssignedToClass atc ON q.qid = atc.qid
    INNER JOIN Enrolled e ON atc.cid = e.cid
    WHERE e.sid = ?
      AND DATE(q.dueDate) >= CURDATE()
    ORDER BY q.dueDate ASC;
  `;

  db.query(sql, [sid], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ results });
  });
});

router.get('/getPastDue', (req, res) => {
  const sid = req.query.sid;

  const sql = `
    SELECT DISTINCT q.*
    FROM Questions q
    INNER JOIN AssignedToClass atc ON q.qid = atc.qid
    INNER JOIN Enrolled e ON atc.cid = e.cid
    WHERE e.sid = ?
      AND DATE(q.dueDate) < CURDATE()
    ORDER BY q.dueDate ASC;
  `;

  db.query(sql, [sid], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ results });
  });
});






module.exports = router;
