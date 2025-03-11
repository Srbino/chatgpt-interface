import React, { useState } from 'react';
import './MessageInput.css';
import { MessageInputProps } from '../types';

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form className="message-input-container" onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Napište zprávu..."
        disabled={disabled}
        className="message-input"
      />
      <button 
        type="submit" 
        disabled={disabled || !message.trim()} 
        className="send-button"
      >
        Odeslat
      </button>
    </form>
  );
};

export default MessageInput; 