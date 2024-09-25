// Function to start ATM Simulation
function startATMSimulation() {
    console.log("ATM Simulation started"); // Log message for debugging

    // Hide the start button after starting the simulation
    document.querySelector("button[onclick='startATMSimulation()']").style.display = "none";

    // Show face recognition section
    document.getElementById("face-recognition").style.display = "block";

    // Play AI sound
    playSound();
}

// Function to play AI sound using Text-to-Speech
function playSound() {
    const message = "Hello, please scan your face to start the transaction.";

    // Check if the browser supports speech synthesis
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.lang = 'en-US'; // Set language
        speechSynthesis.speak(utterance);
        
        console.log('AI sound played successfully');
    } else {
        console.error('Text-to-speech not supported in this browser.');
    }
}

// Simulate face recognition
function startFaceRecognition() {
    const faceStatusDiv = document.getElementById("face-status");
    faceStatusDiv.textContent = "Scanning for face...";

    // Simulate a delay for face recognition
    setTimeout(() => {
        const isRecognized = Math.random() > 0.5; // Randomly simulate success or failure
        if (isRecognized) {
            faceStatusDiv.textContent = "Face recognized successfully!";
            document.getElementById("transaction-section").style.display = "block"; // Show transaction section
        } else {
            faceStatusDiv.textContent = "Face not recognized. Please try again.";
        }
    }, 2000); // Simulate 2 seconds delay
}

// Perform ATM transaction
function performTransaction() {
    const amount = document.getElementById("amount").value;
    const transactionMessageDiv = document.getElementById("transaction-message");
    const transactionErrorMessageDiv = document.getElementById("transaction-error-message");

    transactionMessageDiv.textContent = "";
    transactionErrorMessageDiv.textContent = "";

    if (amount <= 0) {
        transactionErrorMessageDiv.textContent = "Please enter a valid amount.";
        return;
    }

    // Simulate a successful withdrawal
    transactionMessageDiv.textContent = `Successfully withdrew $${amount}. Please take your cash.`;
}