const express = require('express');
const router = express.Router();

// Define your routes
router.get('/', (req, res) => {
  res.send('Instructor route');
});




app.get('/getCourses', (req, res) => {
  const tid = 'T1';
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