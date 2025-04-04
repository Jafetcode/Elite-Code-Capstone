const express = require('express');
const router = express.Router();
const db = require('../db');
// Define your routes
router.get('/', (req, res) => {
  res.send('Student route');
});

router.get('/questions', (req, res) => {
  const sid = req.query.sid;
  const cid = req.query.cid;
  const sql = 'SELECT DISTINCT q.qid, q.question, q.description, q.pointVal, q.imgfile, q.language, q.topic, q.type, q.dueDate, atc.viewable as classView, ats.viewable as studentView ' +
    'From Questions q ' +
    'LEFT JOIN AssignedToClass atc ON q.qid = atc.qid ' +
    'LEFT JOIN AssignedToStudent ats ON q.qid = ats.qid ' +
    'WHERE (ats.sid = ? OR atc.cid = ?)';
  db.query(sql, [sid, cid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ results });
  });
});

router.post('/joinCourse', async (req, res) => {
  const cid = String(req.query.cid).trim();
  const sid = String(req.query.sid).trim();
  console.log("➡️ joinCourse called with:", { cid, sid });

  if (!sid || !cid) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    console.log(sid);
    const [teacherRows] = await db.promise().query(
      'SELECT tid FROM Classes WHERE cid = ?',
      [cid]
    );
    
    if (teacherRows.length === 0) {
      return res.status(404).json({ error: 'No teacher found for this course' });
    }

    const tid = teacherRows[0].tid;

    const [existing] = await db.promise().query(
      'SELECT * FROM Enrolled WHERE tid = ? AND sid = ? AND cid = ?',
      [tid, sid, cid]
    );

    if (existing.length > 0) {
      return res.status(409).json({ message: 'You are already enrolled in this course.' });
    }

    await db.promise().query(
      'INSERT INTO Enrolled (tid, sid, cid) VALUES (?, ?, ?)',
      [tid, sid, cid]
    );
    res.json({ message: 'Student successfully enrolled.' });

  } catch (err) {
    console.log(cid);
    console.log(sid);
    console.error('JOIN COURSE ERROR:', err.message);
    console.error(err.stack); 
    res.status(500).json({ error: 'Internal server error' });
  }
})

router.get('/courses', async (req, res) => {
  const { sid } = req.query;

  try {
    const [courseIdsResult] = await db.query(
      'SELECT cid FROM Enrolled WHERE sid = ?',
      [sid]
    );

    const courseIds = courseIdsResult.map(row => row.cid);

    if (courseIds.length === 0) {
      return res.json({ results: [] });
    }

    const [courses] = await db.query(
      'SELECT * FROM Classes WHERE cid IN (?)',
      [courseIds]
    );

    res.json({ results: courses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching student courses" });
  }
});


