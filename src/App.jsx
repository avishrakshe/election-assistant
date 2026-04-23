import React from 'react';
import Timeline from './components/Timeline';
import ChatAssistant from './components/ChatAssistant';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header animate-fade-in">
        <h1>Election Process Assistant</h1>
        <p>Your interactive guide to understanding the election timeline. Learn the steps and ask questions to our AI assistant.</p>
      </header>
      
      <main className="layout-grid">
        <section className="timeline-section">
          <Timeline />
        </section>
        
        <section className="chat-section">
          <ChatAssistant />
        </section>
      </main>
    </div>
  );
}

export default App;
