document.getElementById('login-button').addEventListener('click', async () => {
    const accountNumber = document.getElementById('accountNumber').value;
    const pin = document.getElementById('pin').value;

    const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accountNumber, pin }),
    });

    const data = await response.json();
    
    if (data.success) {
        document.getElementById('status-message').innerText = 'Login successful!';
        document.getElementById('logout-button').style.display = 'block';
        
        // Simulate ATM going out of service after login
        document.getElementById('atm-image').src = 'images/atm_out_of_service.png';
        
        // Enable transaction inputs
        document.getElementById('amount').disabled = false;
        document.getElementById('barcode').disabled = false;
        document.getElementById('wallet-number').disabled = false;
        document.getElementById('transaction-id').disabled = false;
    } else {
        document.getElementById('status-message').innerText = 'Login failed. Please try again.';
    }
});

// Function to play voice instruction
document.getElementById('voice-instruction-button').addEventListener('click', () => {
    const message = "Welcome! Please use your barcode or face to make a transaction.";
    const speech = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(speech);
});

// Handle dispensing cash
document.getElementById('dispense-button').addEventListener('click', async () => {
    const amount = document.getElementById('amount').value;

    const response = await fetch('http://localhost:5000/api/dispense', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
    });

    const data = await response.json();
    
    document.getElementById('status-message').innerText = data.message;
});

// Handle payment using barcode
document.getElementById('pay-button').addEventListener('click', async () => {
    const barcode = document.getElementById('barcode').value;

    const response = await fetch('http://localhost:5000/api/pay', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ barcode }),
    });

    const data = await response.json();
    
    document.getElementById('status-message').innerText = data.message;
});

// Handle money transfer
document.getElementById('transfer-button').addEventListener('click', async () => {
    const walletNumber = document.getElementById('wallet-number').value;
    const transactionId = document.getElementById('transaction-id').value;

    const response = await fetch('http://localhost:5000/api/transfer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ walletNumber, transactionId }),
    });

    const data = await response.json();
    
    document.getElementById('status-message').innerText = data.message;
});

// Add more event listeners for transaction processing as needed...
