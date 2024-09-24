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

// Add this line to serve static files from a public directory (optional)
app.use(express.static('public')); // Uncomment if you have a public folder for static files

// Route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Smart ATM API!'); // Simple response for the root URL
});

const upload = multer({ dest: 'uploads/' }); // Folder to store uploaded images

// Mock user data for personalization
const users = {
    '123456789': {
        name: 'John Doe',
        transactionHistory: [200, 150, 300, 50, 100],
    },
};

// Mock login endpoint
app.post('/api/login', (req, res) => {
    const { accountNumber, pin } = req.body;
    // Mock validation (replace with real authentication logic)
    if (accountNumber === '123456789' && pin === '1234') {
        res.json({ success: true, user: users[accountNumber] });
    } else {
        res.json({ success: false });
    }
});

// Facial Recognition Endpoint
app.post('/api/face-recognition', upload.single('image'), async (req, res) => {
    const imagePath = req.file.path;
    // Here you would implement your facial recognition logic
    const recognized = true; // Replace with actual recognition result
    if (recognized) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// QR Code Scanning Endpoint
app.post('/api/scan-qr', upload.single('qrImage'), async (req, res) => {
    const imagePath = req.file.path;
    Jimp.read(imagePath).then((image) => {
        const qr = new QRCode();
        qr.callback = (err, value) => {
            if (err) {
                return res.json({ success: false });
            }
            res.json({ success: true, data: value.result });
        };
        qr.decode(image.bitmap);
    }).catch(err => {
        res.json({ success: false });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
