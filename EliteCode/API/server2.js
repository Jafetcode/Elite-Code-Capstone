require('dotenv').config();
const express = require("express");
const cors = require("cors");
const { initializeConnection } = require('./database');

const app = express();
app.use(express.json());

// CORS configuration
app.use(cors({
    origin: ["http://localhost:3300"],
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Connect to database
initializeConnection();

// API endpoint to get user data by email
app.get("/user/:email", async (req, res) => {
    try {
        const connection = await initializeConnection();
        const [results] = await connection.promise().query(
            'SELECT userID, role FROM Users WHERE email = ?', 
            [req.params.email]
        );

        if (results.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(results[0]);  // { userID: 1, role: 'student' }
    } catch (err) {
        res.status(500).json({ error: "Database error", details: err });
    }
});

// Start backend server
const PORT = process.env.PORT || 3306;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
