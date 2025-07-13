import React, { useState } from 'react';

const Protected = () => {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');
    const handleSubmit = async () => {
        const res = await fetch('https://medbackend-f0apeubhdmfee4fs.canadacentral-01.azurewebsites.net/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });
        const data = await res.json();
        setResponse(data.response);
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
            <p>{response}</p>
        </div>
    );
};

export default Protected;
