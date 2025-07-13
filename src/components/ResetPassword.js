import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { account } from "../appwriteConfig"; // Ensure this import matches your configuration
import logo from '../components/logo.png';
import './ResetPassword.css'; // Ensure you have the correct styling

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Extract the secret and userId from the query string
    const secret = searchParams.get("secret");
    const userId = searchParams.get("userId");

    const handleResetPassword = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            // Call the update recovery function from Appwrite
            await account.updateRecovery(userId, secret, password, confirmPassword);
            alert("Password reset successful. Please login with your new password.");
            navigate("/login");
        } catch (error) {
            setError("Failed to reset password: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reset-password-container">
            <img src={logo} alt="Company Logo" className="logo" />
            <h1 className="header">Reset Password</h1>
            <form onSubmit={handleResetPassword} className="reset-password-form">
                <div className="input-group">
                    <label htmlFor="password" className="form-label">New Password</label>
                    <div className="password-container">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            aria-label="New Password"
                            className="form-input"
                        />
                        <span
                            className="password-toggle-icon"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            <span className="material-icons">
                                {showPassword ? '👁️' : '👁️‍🗨️'}
                            </span>
                        </span>
                    </div>
                </div>
                <div className="input-group">
                    <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                    <div className="password-container">
                        <input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            aria-label="Confirm New Password"
                            className="form-input"
                        />
                        <span
                            className="password-toggle-icon"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        >
                            <span className="material-icons">
                                {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                            </span>
                        </span>
                    </div>
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="submit-button" disabled={loading}>
                    {loading ? "Resetting Password..." : "Reset Password"}
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
