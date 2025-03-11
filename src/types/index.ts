export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  apiKey: string;
}

export interface ChatProps {
  apiKey: string;
  onApiKeyChange: (key: string) => void;
}

export interface MessageProps {
  message: Message;
}

export interface MessageInputProps {
  onSendMessage: (content: string) => void;
  disabled: boolean;
}

export interface ApiKeyInputProps {
  apiKey: string;
  onApiKeyChange: (key: string) => void;
} 