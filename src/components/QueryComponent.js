import React, { useState } from 'react';

function QueryComponent() {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');
    const [error, setError] = useState('');

    const handleQuery = async () => {
        try {
            const res = await fetch('https://medbackend-f0apeubhdmfee4fs.canadacentral-01.azurewebsites.net/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query }),
            });
            const data = await res.json();
            setResponse(data.response);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter your query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleQuery}>Submit</button>
            {response && <p>Response: {response}</p>}
            {error && <p>Error: {error}</p>}
        </div>
    );
}

export default QueryComponent;
