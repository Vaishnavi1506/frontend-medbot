// src/components/Home.js

import React, { useState } from 'react';

const Home = () => {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');

    // In Home.js or wherever you're making the request

const handleQuery = async () => {
    try {
        const response = await fetch('https://medbackend-f0apeubhdmfee4fs.canadacentral-01.azurewebsites.net/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: 'your-query-here' })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Failed to fetch:', error);
    }
};


    return (
        <div>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Enter your query" />
            <button onClick={handleQuery}>Submit</button>
            <p>{response}</p>
        </div>
    );
};

export default Home;
