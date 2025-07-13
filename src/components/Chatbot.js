import React, { useState } from 'react';
import './Chatbot.css';
import logo from '../components/logo.png';
import { logout } from '../authService';
import { useNavigate } from 'react-router-dom';

const Chatbot = () => {
    const [query, setQuery] = useState('');
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleQuery = async () => {
        if (!query.trim()) return;

        setLoading(true);
        try {
            const response = await fetch('https://medbackend-f0apeubhdmfee4fs.canadacentral-01.azurewebsites.net/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query })
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            const { causes, medications, disclaimer } = data.response;

            const formattedResponse = {
                causes: causes || 'Information not available.',
                medications: medications || 'Information not available.',
                disclaimer: disclaimer || 'Please consult with a healthcare provider.'
            };

            setConversations([...conversations, { query, response: formattedResponse }]);
            setQuery('');
        } catch (error) {
            console.error('Failed to fetch:', error);
            setConversations([...conversations, { query, response: { causes: 'Error processing your request. Please try again.', medications: '', disclaimer: '' } }]);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleQuery();
        }
    };

    return (
        <div className="chatbot-container">
            <img src={logo} alt="Company Logo" className="logo" />
            <h1 className="header">MEDBOT</h1>
            <div className="chat-box">
                {conversations.map((conv, index) => (
                    <div key={index} className="conversation">
                        <div className="conversation-box me">
                            <p>Me: {conv.query}</p>
                        </div>
                        <div className="conversation-box medbot">
                            <p>MedBot:</p>
                            <div className="response-section">
                                <p><strong>Causes of the Symptoms:</strong></p>
                                <p>{conv.response.causes}</p>
                                <p><strong>Medications:</strong></p>
                                <p>{conv.response.medications}</p>
                                <p><strong>Disclaimer:</strong></p>
                                <p>{conv.response.disclaimer}</p>
                            </div>
                        </div>
                    </div>
                ))}
                {loading && <p>Loading response...</p>}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Enter your query"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="query-input"
                    disabled={loading}
                />
                <button onClick={handleQuery} className="send-button" disabled={loading}>
                    {loading ? 'Sending...' : 'Send'}
                </button>
            </div>
            <button onClick={handleLogout} className="logout-button">Logout</button>

            {/* Footer Section */}
            <footer className="chatbot-footer">
                <p>If you have any issues, contact us at <a href="mailto:apphelp@smarttechks.com">apphelp@smarttechks.com</a></p>
            </footer>
        </div>
    );
};

export default Chatbot;
