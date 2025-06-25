import React from "react";
import Chat from "./Chat";
import './../../ai-chatbox/src/App.css'

function App() {
  return (
    <div className="center">
    <div className="chat-box">
      <h1>Chat with HIWI's AI</h1>
      <Chat />
    </div>
  </div>
  );
}

export default App;
