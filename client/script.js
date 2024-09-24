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
    } else {
        document.getElementById('status-message').innerText = 'Login failed. Please try again.';
    }
});

document.getElementById('logout-button').addEventListener('click', () => {
    document.getElementById('status-message').innerText = 'Logged out.';
    document.getElementById('logout-button').style.display = 'none';
    // Reset ATM image to in service
    document.getElementById('atm-image').src = 'images/atm_in_service.png';
});
