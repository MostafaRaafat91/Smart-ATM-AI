const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt'); // For password hashing

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client'))); // Serve static files from 'client' directory

// Connect to SQLite database
const db = new sqlite3.Database('./atm_management.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');

    // Create tables if they don't exist
    db.serialize(() => {
        // Users table creation
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT,
            role TEXT DEFAULT 'user',
            face_id TEXT
        )`);

        // Clients table creation
        db.run(`CREATE TABLE IF NOT EXISTS clients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            client_name TEXT NOT NULL,
            barcode TEXT UNIQUE,
            wallet_number TEXT UNIQUE,
            face_id TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
    });
});

// Route for the root URL (serving index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html')); // Serve index.html file
});

// Route for the ATM management page
app.get('/atm_management', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/atm_management.html'));
});

// Login endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, row) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Database error." });
        }
        
        if (row) {
            const match = await bcrypt.compare(password, row.password); // Compare hashed password
            if (match) {
                return res.json({ success: true });
            } else {
                return res.json({ success: false });
            }
        } else {
            return res.json({ success: false });
        }
    });
});

// Add a new client endpoint
app.post('/api/clients/add', (req, res) => {
    const { client_name, barcode, wallet_number, face_id } = req.body;

    const sql = `INSERT INTO clients (client_name, barcode, wallet_number, face_id) VALUES (?, ?, ?, ?)`;
    
    db.run(sql, [client_name, barcode, wallet_number, face_id], function(err) {
        if (err) {
            return res.status(400).json({ success: false, message: "Client data must be unique." });
        }
        res.json({ success: true, message: `Client ${client_name} added successfully.` });
    });
});

// Remove a client endpoint
app.delete('/api/clients/remove', (req, res) => {
    const { barcode } = req.body;

    const sql = `DELETE FROM clients WHERE barcode = ?`;
    
    db.run(sql, [barcode], function(err) {
        if (err || this.changes === 0) {
            return res.status(400).json({ success: false, message: "Client not found." });
        }
        res.json({ success: true, message: `Client with barcode ${barcode} removed successfully.` });
    });
});

// Add a new user endpoint
app.post('/api/users/add', async (req, res) => {
    const { username, password, role } = req.body;

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `INSERT INTO users (username, password, role) VALUES (?, ?, ?)`;
    
    db.run(sql, [username, hashedPassword, role], function(err) {
        if (err) {
            return res.status(400).json({ success: false, message: "Username must be unique." });
        }
        res.json({ success: true, message: `User ${username} added successfully.` });
    });
});

// Remove a user endpoint
app.delete('/api/users/remove', (req, res) => {
    const { username } = req.body;

    const sql = `DELETE FROM users WHERE username = ?`;
    
    db.run(sql, [username], function(err) {
        if (err || this.changes === 0) {
            return res.status(400).json({ success: false, message: "User not found." });
        }
        res.json({ success: true, message: `User ${username} removed successfully.` });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error("Error closing the database:", err.message);
        }
        console.log("Database connection closed.");
        process.exit(0);
    });
});