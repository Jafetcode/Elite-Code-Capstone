const mysql = require("mysql2/promise")

async function initializeConnection() {
    try{
        const connectionConfig = {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        };
        console.log("FLAGGGGG 1")

        const connection = await mysql.createConnection(connectionConfig);
        console.log(`Connected to ${connectionConfig.database} database`);

        return connection
    } 
    catch(err){
        console.error("Error connceting to database: ", err)
        throw err;
    }
}

module.exports = { initializeConnection };