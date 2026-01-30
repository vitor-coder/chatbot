import { useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Olá! Como posso ajudar?" }
  ]);

  const [input, setInput] = useState("");

  function sendMessage() {
    if (!input.trim()) return;

    // mensagem do utilizador
    setMessages(prev => [
      ...prev,
      { role: "user", content: input }
    ]);

    fetch("http://localhost:4000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question: input })
    })
    .then(res => res.json())
    .then(data => {
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: data.answer }
      ]);
    });

    setInput("");
  }

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.role}`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
          if (e.key === "Enter") {
            sendMessage();
          }
          }}
          placeholder="Escreve a tua dúvida..."
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  );
}

export default App;
