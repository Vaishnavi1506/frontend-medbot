import React, { useState } from 'react';
import { requestPasswordReset } from '../authService'; // Adjust the path as necessary
import logo from '../components/logo.png'; // Import logo for consistency
import './ForgotPassword.css'; // Create this CSS file for consistent styling

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await requestPasswordReset(email);
            setMessage('Password reset link has been sent to your email.');
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div className="forgot-password-container">
            <img src={logo} alt="Company Logo" className="logo" />
            <h1 className="header">Forgot Password</h1>
            <form onSubmit={handleSubmit} className="forgot-password-form">
                <div className="input-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <button type="submit" className="forgot-password-button">
                    Send Reset Link
                </button>
                {message && <p className="message">{message}</p>}
            </form>
        </div>
    );
};

export default ForgotPassword;
