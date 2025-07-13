import { account } from './appwriteConfig';
import { ID } from 'appwrite';

// Utility function for validating email format
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Sign up function
export const signUp = async (email, password) => {
    try {
        email = email.trim();
        if (!isValidEmail(email)) throw new Error('Invalid email format.');
        if (password.length < 6) throw new Error('Password must be at least 6 characters long.');

        console.log('Attempting to create user with email:', email);
        const user = await account.create(ID.unique(), email, password);
        console.log('User created:', user);
        return user;
    } catch (error) {
        console.error('Signup failed:', error.message);
        if (error.message.includes('User already exists')) {
            throw new Error('An account with this email already exists.');
        }
        throw new Error(`Signup failed: ${error.message}`);
    }
};

// Login function
export const login = async (email, password) => {
    try {
        email = email.trim();
        if (!isValidEmail(email)) throw new Error('Invalid email format.');
        if (password.length < 6) throw new Error('Password must be at least 6 characters long.');

        // Attempt to log in
        console.log('Attempting to log in with email:', email);

        // Try to delete all active sessions, but ignore errors related to missing sessions or scopes
        try {
            await account.deleteSessions();
            console.log('Deleted all active sessions');
        } catch (err) {
            console.warn('No active sessions found or insufficient scope:', err.message);
        }

        // Create a new session after deleting any existing ones
        const session = await account.createEmailPasswordSession(email, password);
        console.log('Session created:', session);
        return session;
    } catch (error) {
        console.error('Login failed:', error.message);
        if (error.message.includes('Invalid credentials')) {
            throw new Error('Invalid email or password.');
        } else if (error.message.includes('Missing scope')) {
            throw new Error('Authentication error. Please check your API key and permissions.');
        }
        throw new Error(`Login failed: ${error.message}`);
    }
};

// Get user function
export const getUser = async () => {
    try {
        const user = await account.get();
        console.log('User retrieved:', user);
        return user;
    } catch (error) {
        console.error('Get user failed:', error.message);
        return null;
    }
};

// Logout function
export const logout = async () => {
    try {
        await account.deleteSession('current');
        console.log('Logged out successfully');
    } catch (error) {
        console.error('Logout failed:', error.message);
        throw new Error(`Logout failed: ${error.message}`);
    }
};

export const requestPasswordReset = async (email) => {
    try {
        email = email.trim();
        if (!isValidEmail(email)) throw new Error('Invalid email format.');

        // Use the current origin for the redirect URL
        const redirectURL = `${window.location.origin}/reset-password`;

        await account.createRecovery(email, redirectURL);
        console.log('Password reset link sent to email:', email);
    } catch (error) {
        console.error('Error requesting password reset:', error.message);
        throw new Error('Failed to send password reset link.');
    }
};

export const resetPasswordWithToken = async (userId, secret, newPassword) => {
    try {
        await account.updateRecovery(userId, secret, newPassword, newPassword);
        console.log('Password successfully reset.');
    } catch (error) {
        console.error('Error resetting password:', error.message);
        throw new Error('Failed to reset password.');
    }
};
