// Function to handle admin login
async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (data.success) {
            document.getElementById('admin-section').style.display = 'block'; // Show admin section
            alert("Login successful!");
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
        } else {
            alert("Login failed. Please check your username and password.");
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred while trying to log in. Please try again later.");
    }
}

// Function to add a new user
async function addUser() {
    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;
    const role = document.getElementById('user-role').value;

    try {
        const response = await fetch('http://localhost:5000/api/users/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: newUsername, password: newPassword, role }),
        });

        const data = await response.json();
        alert(data.message);
    } catch (error) {
        console.error("Error adding user:", error);
        alert("An error occurred while adding the user.");
    }
}

// Function to remove a user
async function removeUser() {
   const usernameToRemove = document.getElementById('remove-username').value;

   try {
       const response = await fetch('http://localhost:5000/api/users/remove', {
           method: 'DELETE',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ username: usernameToRemove }),
       });

       const data = await response.json();
       alert(data.message);
   } catch (error) {
       console.error("Error removing user:", error);
       alert("An error occurred while removing the user.");
   }
}

// Function to add a new client
async function addClient() {
   const clientName = document.getElementById('client-name').value;
   const barcode = document.getElementById('client-barcode').value; // Ensure unique ID
   const walletNumber = document.getElementById('client-wallet-number').value; // Ensure unique ID
   const faceId = document.getElementById('face-id').value;

   try {
       const response = await fetch('http://localhost:5000/api/clients/add', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ client_name: clientName, barcode, wallet_number: walletNumber, face_id: faceId }),
       });

       const data = await response.json();
       alert(data.message);
   } catch (error) {
       console.error("Error adding client:", error);
       alert("An error occurred while adding the client.");
   }
}

// Function to remove a client
async function removeClient() {
   const barcodeToRemove = document.getElementById('remove-barcode').value;

   try {
       const response = await fetch('http://localhost:5000/api/clients/remove', {
           method: 'DELETE',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ barcode: barcodeToRemove }),
       });

       const data = await response.json();
       alert(data.message);
   } catch (error) {
       console.error("Error removing client:", error);
       alert("An error occurred while removing the client.");
   }
}

// Function to add an ATM
async function addATM() {
   const atmId = document.getElementById('add-atm-id').value;
   const ipAddress = document.getElementById('add-atm-ip').value;
   const atmType = document.getElementById('add-atm-type').value;

   try {
       const response = await fetch('http://localhost:5000/api/atms/add', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ atmId, ipAddress, atmType }),
       });

       const data = await response.json();
       alert(data.message);
   } catch (error) {
       console.error("Error adding ATM:", error);
       alert("An error occurred while adding the ATM.");
   }
}

// Function to remove an ATM
async function removeATM() {
   const atmId = document.getElementById('remove-atm-id').value;

   try {
       const response = await fetch('http://localhost:5000/api/atms/remove', {
           method: 'DELETE',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ atmId }),
       });

       const data = await response.json();
       alert(data.message);
   } catch (error) {
       console.error("Error removing ATM:", error);
       alert("An error occurred while removing the ATM.");
   }
}

// Function to submit transaction with barcode and wallet number
async function submitTransaction() {
   const barcode = document.getElementById('transaction-barcode').value; 
   const walletNumber = document.getElementById('wallet-number-transaction').value; 

   try {
       const response = await fetch('http://localhost:5000/api/transaction', { 
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ barcode, walletNumber }),
       });

       const data = await response.json();

       if (data.success) { 
           alert("Transaction processed successfully!");
           document.getElementById('transaction-barcode').value = '';
           document.getElementById('wallet-number-transaction').value = '';
       } else { 
           alert("Transaction failed. Please check your inputs.");
       }
   } catch (error) { 
       console.error("Error during transaction submission:", error);
       alert("An error occurred while processing the transaction.");
   }
}

// Access the user's webcam and start video capture for face recognition
const video = document.getElementById('video');

navigator.mediaDevices.getUserMedia({ video:true })
.then(stream => { 
     video.srcObject=stream; 
     video.play(); 
})
.catch(err => { 
     console.error("Error accessing webcam:", err); 
     alert("Unable to access webcam. Please check permissions."); 
});

// Capture button event listener for face recognition logic
document.getElementById('capture-button')?.addEventListener('click', function() { 
     // Implement face recognition logic here using a library like face-api.js or similar.
});