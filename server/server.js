const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Mock login endpoint
app.post('/api/login', (req, res) => {
    const { accountNumber, password } = req.body;
    // Mock validation (replace with real authentication logic)
    if (accountNumber === '123456789' && password === '1234') {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
