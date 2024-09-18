import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [accountNumber, setAccountNumber] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        // Call backend API for authentication (mocked here)
        const response = await axios.post('/api/login', { accountNumber, password });
        if (response.data.success) {
            // Redirect to dashboard or show success message
            window.location.href = '/dashboard';
        } else {
            alert('Login failed');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input 
                    type="text" 
                    placeholder="Account Number" 
                    value={accountNumber} 
                    onChange={(e) => setAccountNumber(e.target.value)} 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
