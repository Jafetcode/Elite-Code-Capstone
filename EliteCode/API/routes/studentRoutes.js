const express = require('express');
// const mysql = require('mysql2');
const router = express.Router();
// const cors = require('cors');
const db = require('../db');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// app.use(cors());
// app.use(express.json());


// Define your routes
router.get('/', (req, res) => {
  res.send('Student route');
});



// router.get('/specificAssignedQuestions', (req, res) => {
//   const sid = req.query.sid;
//   const tid = req.query.tid;
//   const sql = 'SELECT DISTINCT q.*, ats.viewable as studentView, atc.viewable as classView FROM Questions q ' +
//   'LEFT JOIN AssignedToStudent ats ON q.qid = ats.qid ' + 
//   'LEFT JOIN Instructor i ON c.tid = i.tid WHERE (ats.sid = ? AND i.tid = ?) OR (e.sid = ? AND i.tid = ?);'
//   db.query(sql, [sid, tid, sid, tid], (err, results) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.json({ results });
//   });
// });

router.get('/questions', (req, res) => {
  const cid = req.query.cid;
  const sql = 'SELECT DISTINCT q.qid, q.question, q.description, q.pointVal, q.imgFile, q.topic, q.type, q.dueDate, atc.viewable as classView ' +
    'From Questions q RIGHT JOIN AssignedToClass atc on q.qid = atc.qid Where cid = ?';
  db.query(sql, [cid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ results });
  });
});

router.post('/submitQuestion', (req, res) => {
  const { qid, sid, answer,progress, submitted_on} = req.body;
  const imgFile = req.file ? req.file.buffer : null;
  const sql = `
    INSERT INTO Submissions (qid, sid, answer,progress, submitted_on, imgFile)
    VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(sql, [qid, sid, answer,progress, submitted_on,imgFile], (err, results) => {
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
