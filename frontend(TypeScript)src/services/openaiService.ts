import React, { useState } from "react";
import { sendPrompt } from "./services/openaiService";

const App: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse("");
    try {
      const reply = await sendPrompt(prompt);
      setResponse(reply);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>OpenAI Chat (Secure Integration)</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Type your prompt here..."
        />
        <button type="submit" disabled={loading || !prompt.trim()}>
          {loading ? "Loading..." : "Send"}
        </button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {response && <div><strong>Response:</strong> {response}</div>}
    </div>
  );
};

export default App;
