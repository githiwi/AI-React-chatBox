import React, { useState } from "react";

const Chat = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: input, 
            },
          ],
        }),
      });

      const data = await res.json();

      const message = data.choices?.[0]?.message?.content;
      setResponse(message || "No response received.");
    } catch (err: any) {
      console.error(err);
      setResponse("Something went wrong: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Ask AI with Hiwi</h2>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        cols={50}
        placeholder="Type your question here..."

      />
      <br />
      <button onClick={handleSend} disabled={loading || !input.trim()}>
        {loading ? "Loading...🤔" : "Send"}
      </button>
      <div style={{ marginTop: 20 }}>
        <strong>AI Response 😊</strong>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default Chat;
