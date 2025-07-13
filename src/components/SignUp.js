import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../authService"; // Your custom signup logic
import logo from '../components/logo.png';
import './SignUp.css';
import  './terms';  // Importing the Terms component

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Email validation function
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Password validation function
    const validatePassword = (password) => {
        const minLength = 8;
        const hasNumber = /\d/;
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

        if (password.length < minLength) {
            return `Password must be at least ${minLength} characters long.`;
        }
        if (!hasNumber.test(password)) {
            return "Password must contain at least one number.";
        }
        if (!hasSpecialChar.test(password)) {
            return "Password must contain at least one special character.";
        }
        return null;
    };

    // Form submission handler
    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        // Email validation
        if (!isValidEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        // Password validation
        const passwordError = validatePassword(password);
        if (passwordError) {
            setError(passwordError);
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        // Check if terms and conditions are accepted
        if (!acceptTerms) {
            setError("You must accept the terms and conditions.");
            return;
        }

        setLoading(true);
        try {
            // Call signup logic
            await signUp(email.trim(), password);
            navigate("/login"); // Navigate to login after successful signup
        } catch (error) {
            console.error("Signup error:", error.message);
            setError(error.message || "An error occurred during signup.");
        } finally {
            setLoading(false);
        }
    };

    // Handle key down for 'Enter' key to submit form
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSignup(e);
        }
    };

    return (
        <div className="signup-container">
            <img src={logo} alt="Company Logo" className="logo" />
            <h1 className="header">Create an Account</h1>
            <form onSubmit={handleSignup} className="signup-form">
                <div className="input-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        aria-label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-input"
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="password-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="Create a strong password"
                            aria-label="Create password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-input"
                            onKeyDown={handleKeyDown}
                        />
                        <span
                            className="password-toggle-icon"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? '👁️' : '👁️‍🗨️'}
                        </span>
                    </div>
                </div>
                <div className="input-group">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <div className="password-container">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            placeholder="Confirm your password"
                            aria-label="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="form-input"
                            onKeyDown={handleKeyDown}
                        />
                        <span
                            className="password-toggle-icon"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                        </span>
                    </div>
                </div>
                <div className="input-group terms-checkbox">
                    <input
                        type="checkbox"
                        id="acceptTerms"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                    />
                    <label htmlFor="acceptTerms">
                        I accept the <Link to="/terms" target="_blank" rel="noopener noreferrer">terms and conditions</Link>.
                    </label>
                </div>
                {error && <p className="error-message">{error}</p>}
                <button 
                    type="submit" 
                    className="signup-button" 
                    disabled={loading}
                >
                    {loading ? "Signing Up..." : "Sign Up"}
                </button>
                <p className="login-link">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
            <footer className="footer">
                <p>© SKAI</p>
            </footer>
        </div>
    );
};

export default SignUp;
