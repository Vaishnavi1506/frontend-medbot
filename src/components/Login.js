// src/components/Login.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../authService";
import './Login.css';
import logo from '../components/logo.png';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        try {
            await login(email, password);
            console.log("Login successful.");
            navigate('/chatbot');
        } catch (error) {
            console.error("Login failed:", error);
            if (error.response && error.response.status === 400) {
                setError('Email is required.');
            } else if (error.response && error.response.status === 500) {
                setError('An internal server error occurred.');
            } else {
                setError('An error occurred: ' + error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleLogin(e);
        }
    };

    const handleForgotPasswordClick = () => {
        navigate("/forgot-password");
    };

    return (
        <div className="login-container">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <h1 className="header">Sign in</h1>
            <form onSubmit={handleLogin} className="login-form">
                <div className="input-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        aria-label="Email"
                        className="form-input"
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="password-container">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            aria-label="Password"
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
                <div className="form-options">
                    <label className="remember-me">
                        <input type="checkbox" />
                        Remember me
                    </label>
                    <button
                        type="button"
                        className="forgot-password-link"
                        onClick={handleForgotPasswordClick}
                    >
                        Forgot password?
                    </button>
                </div>
                <button
                    type="submit"
                    className="login-button"
                    disabled={loading}
                >
                    {loading ? "Signing in..." : "Sign in"}
                </button>
                <p className="signup-link">
                    Don’t have an account? <a href="/signup">Sign up</a>
                </p>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default Login;
