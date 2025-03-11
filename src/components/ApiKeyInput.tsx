import React, { useState } from 'react';
import './ApiKeyInput.css';
import { ApiKeyInputProps } from '../types';

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ apiKey, onApiKeyChange }) => {
  const [showKey, setShowKey] = useState(false);
  const [inputKey, setInputKey] = useState(apiKey);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputKey.trim()) {
      onApiKeyChange(inputKey.trim());
    }
  };

  return (
    <div className="api-key-container">
      <h2 className="api-key-title">OpenAI API Klíč</h2>
      <p className="api-key-description">
        Pro použití této aplikace potřebujete API klíč z OpenAI.
        <a href="https://platform.openai.com/account/api-keys" target="_blank" rel="noopener noreferrer" className="api-key-link">
          Získat API klíč
        </a>
      </p>
      <form className="api-key-form" onSubmit={handleSubmit}>
        <div className="api-key-input-container">
          <input
            type={showKey ? "text" : "password"}
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
            placeholder="Zadejte svůj OpenAI API klíč"
            className="api-key-input"
          />
          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            className="api-key-toggle"
          >
            {showKey ? "Skrýt" : "Zobrazit"}
          </button>
        </div>
        <button 
          type="submit" 
          disabled={!inputKey.trim() || inputKey === apiKey} 
          className="api-key-submit"
        >
          Uložit
        </button>
      </form>
    </div>
  );
};

export default ApiKeyInput; 