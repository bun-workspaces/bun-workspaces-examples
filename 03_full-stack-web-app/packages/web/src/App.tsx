import { useState, type FormEvent } from "react";
import { createClient, type SendMessageResponse } from "shared";

const client = createClient({
  baseUrl: import.meta.env?.API_BASE_URL ?? "http://localhost:3001",
});

export const App = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState<SendMessageResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setError(null);
    try {
      const result = await client.sendMessage({ name, message });
      setResponse(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setPending(false);
    }
  };

  return (
    <main>
      <h1>Example 03: Full Stack Web App</h1>
      <form onSubmit={onSubmit}>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>
        <label>
          Message
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={pending}>
          {pending ? "Sending..." : "Send Message"}
        </button>
      </form>
      {response && (
        <div className="reply">
          <strong>Reply:</strong> {response.reply}
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </main>
  );
};
