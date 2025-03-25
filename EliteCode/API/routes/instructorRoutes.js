import { useAuth } from "../AuthContext";
const express = require('express');
const router = express.Router();
const { user} = useAuth(); ;

// Define your routes
router.get('/', (req, res) => {
  res.send('Instructor route');
});

app.post('/createCourse', (req, res) => {
  const { courseName, tid, description } = req.body;
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

app.get('/getCourses', (req, res) => {
  const tid = user.uid;
  const sql = 'SELECT * FROM Classes WHERE tid = ?';

  db.query(sql, [tid], (err, results) =>{
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Export the router
module.exports = router;
