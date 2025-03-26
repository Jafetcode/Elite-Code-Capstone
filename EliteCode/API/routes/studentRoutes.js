const express = require('express');
const router = express.Router();
const db = require('../db');
// Define your routes
router.get('/', (req, res) => {
  res.send('Student route');
});


// Export the router
module.exports = router;
