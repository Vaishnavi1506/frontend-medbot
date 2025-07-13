import React, { useState } from 'react';
import { resetPasswordWithToken } from './authService';  // Adjust the import path accordingly

const ResetPasswordForm = () => {
    const [userId, setUserId] = useState('');
    const [secret, setSecret] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleResetPassword = async () => {
        try {
            await resetPasswordWithToken(userId, secret, newPassword);
            alert('Password has been reset successfully!');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            <h2>Reset Your Password</h2>
            <input 
                type="text" 
                placeholder="User ID" 
                value={userId} 
                onChange={(e) => setUserId(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Reset Token" 
                value={secret} 
                onChange={(e) => setSecret(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="New Password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
            />
            <button onClick={handleResetPassword}>Reset Password</button>
        </div>
    );
};

export default ResetPasswordForm;
