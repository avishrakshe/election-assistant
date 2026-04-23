import React, { useState, useRef, useEffect } from 'react';
import { generateBotResponse, quickQuestions } from '../utils/mockData';
import './ChatAssistant.css';

const ChatAssistant = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Welcome to the Election Process Assistant! How can I help you understand the election process today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text) => {
    if (!text.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Simulate network delay
    setTimeout(() => {
      const response = generateBotResponse(text);
      const botMsg = { id: Date.now() + 1, sender: 'bot', text: response };
      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  return (
    <div className="chat-container animate-fade-in">
      <div className="chat-header">
        <h2>Election Assistant</h2>
        <span className="status-indicator"></span> Ask me anything!
      </div>
      
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
            <div className={`message-bubble ${msg.sender}`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="quick-questions">
        {quickQuestions.map((q, idx) => (
          <button key={idx} className="quick-btn" onClick={() => handleSend(q)}>
            {q}
          </button>
        ))}
      </div>

      <div className="chat-input-container">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend(inputValue)}
          placeholder="Ask a question..."
          className="chat-input"
        />
        <button className="btn-icon send-btn" onClick={() => handleSend(inputValue)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2 12l20-10-10 20v-10h10" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatAssistant;
