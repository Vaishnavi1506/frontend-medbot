const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt'); // Adding bcrypt for password hashing

const app = express();
const port = 3000; // Port updated to 3000 to match your frontend

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Simulated in-memory storage for users and reset tokens (replace with a real database in production)
let users = {}; // Store users with their emails and hashed passwords
let resetTokens = {}; // Store reset tokens with expiration times

// Utility function to generate a token
const generateToken = () => {
    return crypto.randomBytes(20).toString('hex');
};

// Utility function to send email (using nodemailer)
const sendResetEmail = (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // Replace with your email service
        auth: {
            user: 'your-email@gmail.com', // Replace with your email
            pass: 'your-email-password'   // Replace with your email password
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Password Reset Request',
        text: `You requested a password reset. Please click the link below to reset your password:\n\nhttp://localhost:3001/reset-password/${token}\n\nIf you did not request this, please ignore this email.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

// POST route to request a password reset link
app.post('/reset-password-request', async (req, res) => {
    const { email } = req.body;
    const user = users[email];

    if (!user) {
        return res.status(404).send({ error: 'User not found' });
    }

    // Generate a reset token
    const token = generateToken();
    resetTokens[token] = { email, expires: Date.now() + 3600000 }; // 1-hour expiration

    // Send the reset link via email
    sendResetEmail(email, token);

    res.status(200).send({ message: 'Reset link sent' });
});

// POST route to handle the actual password reset
app.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;
    const resetData = resetTokens[token];

    if (!resetData || resetData.expires < Date.now()) {
        return res.status(400).send({ error: 'Invalid or expired token' });
    }

    const { email } = resetData;

    // Hash the new password before saving
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    users[email] = { ...users[email], password: hashedPassword };

    // Invalidate the token
    delete resetTokens[token];

    res.status(200).send({ message: 'Password updated successfully' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
