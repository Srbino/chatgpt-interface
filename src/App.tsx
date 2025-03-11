import React, { useState, useEffect } from 'react';
import './App.css';
import Chat from './components/Chat';

function App() {
  const [apiKey, setApiKey] = useState<string>('');

  // Načtení API klíče z localStorage při spuštění aplikace
  useEffect(() => {
    const savedApiKey = localStorage.getItem('openai-api-key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  // Funkce pro aktualizaci API klíče
  const handleApiKeyChange = (key: string) => {
    setApiKey(key);
    localStorage.setItem('openai-api-key', key);
  };

  return (
    <div className="App">
      <div className="app-header">
        <h1>ChatGPT Rozhraní</h1>
      </div>
      <main className="app-main">
        <Chat apiKey={apiKey} onApiKeyChange={handleApiKeyChange} />
      </main>
      <footer className="app-footer">
        <p>© 2025 ChatGPT Rozhraní</p>
      </footer>
    </div>
  );
}

export default App;
