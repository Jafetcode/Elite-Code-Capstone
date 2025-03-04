require('dotenv').config();
// load env variables
const express = require("express");
// create server
const cors = require("cors");
// handles cross origin requests
const { initializeConnection } = require('./database');
// connects to mysql database 

//middleware
const app = express();
app.use(express.json());

// cors middleware
app.use(cors({
    origin: [
        "http://localhost:3300",
    ],
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));


initializeConnection()
    .then((connection) => {
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Sever is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("Error initalzing database connection", err);
    });
