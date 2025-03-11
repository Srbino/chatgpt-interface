import { Message } from '../types';
import axios from 'axios';

export const createChatCompletion = async (messages: Message[], apiKey: string): Promise<string> => {
  if (!apiKey) {
    throw new Error('API klíč je vyžadován');
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 0.7,
        max_tokens: 1000,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Pokud odpověď obsahuje chybovou zprávu od OpenAI API
      const message = error.response.data.error?.message || 'Nastala chyba při komunikaci s OpenAI API';
      throw new Error(message);
    }
    // Obecná chyba
    throw error;
  }
}; 