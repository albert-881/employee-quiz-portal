const sqlite3 = require('sqlite3').verbose();

// Connect to database (creates file if it doesn't exist)
const db = new sqlite3.Database('./quiz_portal.db', (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

module.exports = db;
