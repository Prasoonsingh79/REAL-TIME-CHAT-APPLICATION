import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('send_message', { message });
      setMessage('');
    }
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setChat((prev) => [...prev, data.message]);
    });

    return () => socket.off('receive_message');
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Real-Time Chat</h2>
      <div style={{ marginBottom: 10 }}>
        {chat.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
