// Function to handle admin login
async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        
        if (data.success) {
            document.getElementById('admin-section').style.display = 'block'; // Show admin section
            alert("Login successful!");
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
        } else {
            alert("Login failed. Please try again.");
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred. Please try again later.");
    }
}

// Other existing functions (addATM, removeATM, etc.) remain unchanged.