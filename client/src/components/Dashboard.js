import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
    const [suggestedAmount, setSuggestedAmount] = useState(null);
    const [fraudCheckResult, setFraudCheckResult] = useState(null);
    
    const accountNumber = '123456789'; // Hardcoded for demo purposes

    useEffect(() => {
        // Fetch predictive cash management suggestion on mount
        const fetchSuggestedAmount = async () => {
            const response = await axios.get(`/api/predict-cash/${accountNumber}`);
            setSuggestedAmount(response.data.suggestedAmount);
        };
        
        fetchSuggestedAmount();
    }, [accountNumber]);

    const handleFaceRecognition = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        
        const response = await axios.post('/api/face-recognition', formData);
        if (response.data.success) {
            alert('Face recognized successfully!');
            // Proceed with transaction or login
        } else {
            alert('Face not recognized.');
        }
    };

    const handleQRScan = async (e) => {
        const formData = new FormData();
        formData.append('qrImage', e.target.files[0]);
        
        const response = await axios.post('/api/scan-qr', formData);
        if (response.data.success) {
            alert(`QR Code Data: ${response.data.data}`);
            // Process the scanned data as needed
        } else {
            alert('Failed to scan QR Code.');
        }
    };

    return (
        <div>
            <h2>Welcome to Smart ATM</h2>
            <p>Suggested Cash Withdrawal Amount: ${suggestedAmount}</p>
            
            <input type="file" accept="image/*" onChange={handleFaceRecognition} />
            <input type="file" accept="image/*" onChange={handleQRScan} />
            
            <button>Withdraw Cash</button>
            <button>Deposit Cash</button>
            <button>Check Balance</button>
        </div>
    );
}

export default Dashboard;
