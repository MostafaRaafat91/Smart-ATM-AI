const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const QRCode = require('qrcode-reader'); // For QR code reading
const Jimp = require('jimp'); // For image processing

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files if needed

// ATM Data Structure
let atms = {}; // Object to hold ATM data

// Route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Smart ATM API!');
});

// Add an ATM
app.post('/api/atms/add', (req, res) => {
    const { atmId } = req.body;
    if (!atmId) {
        return res.status(400).json({ success: false, message: "ATM ID is required." });
    }
    
    atms[atmId] = { status: 'in service', connected: true };
    res.json({ success: true, message: `ATM ${atmId} added successfully.` });
});

// Remove an ATM
app.post('/api/atms/remove', (req, res) => {
    const { atmId } = req.body;
    if (!atms[atmId]) {
        return res.status(404).json({ success: false, message: "ATM not found." });
    }
    
    delete atms[atmId];
    res.json({ success: true, message: `ATM ${atmId} removed successfully.` });
});

// Connect an ATM
app.post('/api/atms/connect', (req, res) => {
    const { atmId } = req.body;
    if (!atms[atmId]) {
        return res.status(404).json({ success: false, message: "ATM not found." });
    }
    
    atms[atmId].connected = true;
    atms[atmId].status = 'in service';
    res.json({ success: true, message: `ATM ${atmId} connected successfully.` });
});

// Disconnect an ATM
app.post('/api/atms/disconnect', (req, res) => {
    const { atmId } = req.body;
    if (!atms[atmId]) {
        return res.status(404).json({ success: false, message: "ATM not found." });
    }
    
    atms[atmId].connected = false;
    atms[atmId].status = 'out of service';
    res.json({ success: true, message: `ATM ${atmId} disconnected successfully.` });
});

// Mock user data for personalization
const users = {
    '123456789': {
        name: 'John Doe',
        transactionHistory: [200, 150, 300, 50, 100],
        pictureUrl: 'path_to_picture.jpg' // Add user pictures here
    },
};

// Mock login endpoint
app.post('/api/login', (req, res) => {
    const { accountNumber, pin } = req.body;
    
    if (users[accountNumber] && pin === '1234') { // Example validation
        res.json({ success: true, user: users[accountNumber] });
    } else {
        res.json({ success: false });
    }
});

// Other existing endpoints...

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
