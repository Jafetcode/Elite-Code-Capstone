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

// Export the router
module.exports = router;
