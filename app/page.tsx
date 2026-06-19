'use client';

import React, { useState } from 'react';

interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
}

export default function Page() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setInput('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ content: userMsg }] }),
      });

      const cleanData = await response.text();
      setMessages((prev) => [...prev, { role: 'bot', content: cleanData.trim() }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'bot', content: 'Error connecting to support system.' }]);
    }
  };

  return (
    <div style={{ background: '#0a0a0a', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif' }}>
      <header style={{ padding: '20px', borderBottom: '1px solid #222', textAlign: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '20px', color: '#0070f3' }}>AlphaCloud Solutions Support</h1>
        <p style={{ margin: '5px 0 0', fontSize: '12px', color: '#666' }}>Commercial AI Support Desk</p>
      </header>

      <div style={{ flex: 1, padding: '20px', overflowY: 'auto', maxWidth: '800px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {messages.length === 0 && (
          <p style={{ color: '#444', textAlign: 'center', marginTop: '40px' }}>Ask about our cloud services, pricing, technical support, or order status.</p>
        )}
        {messages.map((msg, index) => (
          <div key={index} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', background: msg.role === 'user' ? '#0070f3' : '#222', padding: '12px 16px', borderRadius: '8px', maxWidth: '70%', whiteSpace: 'pre-wrap' }}>
            {msg.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} style={{ padding: '20px', borderTop: '1px solid #222', display: 'flex', gap: '10px', maxWidth: '800px', width: '100%', margin: '0 auto' }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message (e.g., pricing, support)..." style={{ flex: 1, background: '#111', border: '1px solid #333', borderRadius: '6px', padding: '12px', color: '#fff', fontSize: '14px' }} />
        <button type="submit" style={{ background: '#fff', color: '#000', border: 'none', borderRadius: '6px', padding: '0 24px', fontWeight: 'bold', cursor: 'pointer' }}>Send</button>
      </form>
    </div>
  );
}
