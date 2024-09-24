const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files if needed

// Load users from a JSON file (for simplicity)
let users = {};
fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
    if (!err) {
        users = JSON.parse(data);
    }
});

// ATM Data Structure
let atms = {}; // Object to hold ATM data

// Route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Smart ATM API!');
});

// Authentication middleware
const authenticateUser = (req, res, next) => {
    const { username, password } = req.body;
    if (users[username] && users[username].password === password) {
        next(); // User authenticated
    } else {
        res.status(401).json({ success: false, message: "Unauthorized" });
    }
};


// Add an ATM
app.post('/api/atms/add', authenticateUser, (req, res) => {
    const { atmId } = req.body;
    if (!atmId) {
        return res.status(400).json({ success: false, message: "ATM ID is required." });
    }
    
    atms[atmId] = { status: 'in service', connected: true };
    res.json({ success: true, message: `ATM ${atmId} added successfully.` });
});

// Other existing endpoints...

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
