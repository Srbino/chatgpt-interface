import React, { useState, useEffect, useRef } from 'react';
import './Chat.css';
import { ChatProps, Message as MessageType } from '../types';
import { createChatCompletion } from '../services/openai';
import Message from './Message';
import MessageInput from './MessageInput';
import ApiKeyInput from './ApiKeyInput';

const Chat: React.FC<ChatProps> = ({ apiKey, onApiKeyChange }) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Automatický scroll na konec chatu když přibudou nové zprávy
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!apiKey) {
      setError('Prosím, zadejte svůj OpenAI API klíč.');
      return;
    }

    // Přidání uživatelské zprávy do chatu
    const userMessage: MessageType = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      // Odeslání všech zpráv na server
      const allMessages = [...messages, userMessage];
      const response = await createChatCompletion(allMessages, apiKey);
      
      // Přidání odpovědi do chatu
      if (response) {
        setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nastala chyba při komunikaci s OpenAI.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      {!apiKey && <ApiKeyInput apiKey={apiKey} onApiKeyChange={onApiKeyChange} />}
      
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="empty-chat">
            <h2>ChatGPT rozhraní</h2>
            <p>Zadejte zprávu níže pro zahájení konverzace s ChatGPT.</p>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <Message key={index} message={message} />
            ))}
          </>
        )}
        
        {isLoading && (
          <div className="loading-message">
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        
        {error && <div className="error-message">{error}</div>}
        
        <div ref={messagesEndRef} />
      </div>
      
      <MessageInput 
        onSendMessage={sendMessage} 
        disabled={isLoading || !apiKey} 
      />
    </div>
  );
};

export default Chat; 