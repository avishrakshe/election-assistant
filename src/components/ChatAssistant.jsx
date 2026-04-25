import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import { generateBotResponse, quickQuestions } from '../utils/mockData';
import MermaidChart from './MermaidChart';
import './ChatAssistant.css';

const ChatAssistant = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Welcome to the Election Process Assistant! I am powered by Google Gemini. How can I help you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = useCallback(async (text) => {
    if (!text.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    // If the developer hasn't configured the API key, fallback to local mock data
    if (!apiKey) {
      setTimeout(() => {
        const fallbackResponse = generateBotResponse(text);
        const botMsg = { id: Date.now() + 1, sender: 'bot', text: fallbackResponse };
        setMessages(prev => [...prev, botMsg]);
        setIsTyping(false);
      }, 600);
      return;
    }

    try {
      // Map conversation history for Gemini (requires 'user' and 'model' roles)
      const formattedHistory = messages.filter(m => m.id !== 1).map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      const systemPrompt = "You are a professional AI assistant. You can answer any questions the user asks, even if they are irrelevant to elections. Keep your answers concise, informative, and highly objective. You can and should use Mermaid.js syntax (```mermaid) to generate visual flowcharts, timelines, or diagrams whenever requested or when explaining a multi-step process or structural concept. User Question: ";
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            ...formattedHistory,
            { role: 'user', parts: [{ text: systemPrompt + text }] }
          ]
        })
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      const botReply = data.candidates[0].content.parts[0].text;
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: botReply }]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      // Fallback to mock data on error (e.g., leaked key, invalid key, rate limit)
      setTimeout(() => {
        const fallbackResponse = generateBotResponse(text);
        const botMsg = { id: Date.now() + 1, sender: 'bot', text: fallbackResponse };
        setMessages(prev => [...prev, botMsg]);
      }, 600);
    } finally {
      setIsTyping(false);
    }
  }, [messages]);

  return (
    <div className="chat-container animate-fade-in">
      <div className="chat-header">
        <h2>Election Assistant</h2>
        <div style={{flex: 1}}></div>
        <span className="status-indicator"></span>
      </div>
      
      <div className="chat-messages" aria-live="polite">
        {messages.map((msg) => (
          <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
            <div className={`message-bubble ${msg.sender} markdown-body`}>
              <ReactMarkdown
                components={{
                  code({node, inline, className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '');
                    if (!inline && match && match[1] === 'mermaid') {
                      return <MermaidChart chart={String(children).replace(/\n$/, '')} />;
                    }
                    return (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  }
                }}
              >
                {msg.text}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="message-wrapper bot">
            <div className="message-bubble bot typing-indicator">
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="quick-questions">
        {quickQuestions.map((q, idx) => (
          <button key={idx} className="quick-btn" onClick={() => handleSend(q)} disabled={isTyping}>
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
          disabled={isTyping}
          aria-label="Ask a question about the election process"
        />
        <button className="btn-icon send-btn" onClick={() => handleSend(inputValue)} disabled={isTyping} aria-label="Send message">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2 12l20-10-10 20v-10h10" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatAssistant;
