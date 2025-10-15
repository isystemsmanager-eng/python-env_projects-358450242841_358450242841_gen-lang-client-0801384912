import React, { useState } from 'react';

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY; // Use env variable

const App: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse('');

    try {
      const apiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      if (!apiResponse.ok) {
        throw new Error('API request failed');
      }

      const data = await apiResponse.json();
      setResponse(data.choices[0]?.message?.content ?? 'No response received.');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>OpenAI Chat Integration</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows={4}
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Type your prompt here..."
          style={{ width: '100%', marginBottom: 10 }}
        />
        <button type="submit" disabled={loading || !prompt.trim()}>
          {loading ? 'Loading...' : 'Send to OpenAI'}
        </button>
      </form>
      {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
      {response && (
        <div style={{ marginTop: 20, whiteSpace: 'pre-wrap', background: '#f9f9f9', padding: 10 }}>
          <strong>OpenAI Response:</strong>
          <div>{response}</div>
        </div>
      )}
    </div>
  );
};

export default App;
segment
App.tsx
folder
components
segment
constants.ts

more_vert
image
image (25).png
code
index.html
segment
index.tsx
data_object
metadata.json
folder
services
folder
utils
gif_maker/
├── README.md
├── requirements.txt
├── setup.py
├── .gitignore
├── main.py
├── gif_maker/
│   ├── __init__.py
│   ├── core.py            # Core logic for GIF creation
│   ├── utils.py           # Utility functions
│   ├── image_processing.py# Image/frame manipulation
│   └── config.py          # Configuration settings
├── assets/
│   ├── images/            # Input images for GIFs
│   └── gifs/              # Output GIFs
├── tests/
│   ├── __init__.py
│   ├── test_core.py
│   ├── test_utils.py
│   └── test_image_processing.py
└── examples/
    └── example1.py        # Example usage scripts
