import React, { useState } from 'react';
import './App.css';

import userIcon from './assets/user-icon01.png'; // Adjust the path as necessary
import botIcon from './assets/bot-icon01.png'; // Adjust the path as necessary

function App() {
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState([]);
  const [error, setError] = useState(null);

  const sendMessage = async () => {
    try {
      const userMessage = { 
        sender: 'user', 
        name: '', // user
        icon: userIcon,
        text: userInput 
      };
      //setConversation([...conversation, userMessage]);

      const response = await fetch('/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botResponse = { 
        sender: 'bot', 
        name: '', //ChatBot
        icon: botIcon,
        text: data.response 
      };
      setConversation(prev => [...prev, userMessage, botResponse]);
      setUserInput('');
    } catch (error) {
      console.error('Error in sendMessage:', error);
      setError(error.message);
    }
  };

  const renderMessage = (msg) => (
    <div className={`message ${msg.sender}`}>
      <img src={msg.icon} alt={`${msg.name}`} className="icon" />
      <div>
        <p className="name">{msg.name}</p>
        <p>{msg.text}</p>
      </div>
    </div>
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="chat-title">ChatScopus</h1> {"Chat to find out insight of the data"}
        <div className="chatbox">
          {conversation.map((msg, index) => (
            <div key={index}>{renderMessage(msg)}</div>
          ))}
          {error && <p className="error">Error: {error}</p>}
        </div>
        <div className="input-area">
          <input 
            type="text" 
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' ? sendMessage() : null}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </header>
    </div>
  );
}

export default App;
