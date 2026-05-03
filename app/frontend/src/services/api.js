/**
 * API Service Layer for the NEIC Platform.
 * Handles all backend communication including RESTful and SSE streaming endpoints.
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://127.0.0.1:8000' : '');

export const chatApi = {
  /**
   * Fetch all chat sessions for the sidebar navigation.
   * @param {string} token - Firebase ID token for authentication.
   * @returns {Promise<Array>} List of session objects.
   */
  getSessions: async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/sessions`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch sessions');
      return await response.json();
    } catch (error) {
      console.error("API Error (getSessions):", error);
      return [];
    }
  },

  /**
   * Fetch chat history for a specific session.
   * @param {string} sessionId - The target session identifier.
   * @param {string} token - Firebase ID token for authentication.
   * @returns {Promise<Array>} List of message objects.
   */
  getHistory: async (sessionId, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/history/${sessionId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch history');
      return await response.json();
    } catch (error) {
      console.error("API Error (getHistory):", error);
      return [];
    }
  },

  /**
   * Send a message and receive a standard JSON response (fallback).
   * @param {string} sessionId - The target session identifier.
   * @param {string} message - The user's message text.
   * @param {string} token - Firebase ID token for authentication.
   * @returns {Promise<Object>} The AI response object.
   */
  sendMessage: async (sessionId, message, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ session_id: sessionId, message }),
      });
      if (!response.ok) throw new Error('Failed to send message');
      return await response.json();
    } catch (error) {
      console.error("API Error (sendMessage):", error);
      throw error;
    }
  },

  /**
   * Send a message via the SSE streaming endpoint (Reactive Stream Consumption).
   * Reads chunks from a ReadableStream and calls onChunk for real-time UI updates.
   * @param {string} sessionId - The target session identifier.
   * @param {string} message - The user's message text.
   * @param {string} token - Firebase ID token for authentication.
   * @param {function} onChunk - Callback invoked with each text chunk as it arrives.
   * @returns {Promise<string>} The full accumulated response text.
   */
  sendMessageStream: async (sessionId, message, token, onChunk) => {
    const response = await fetch(`${API_BASE_URL}/chat/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ session_id: sessionId, message }),
    });

    if (!response.ok) {
      throw new Error(`Stream request failed with status ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullText = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      fullText += chunk;
      onChunk(fullText);
    }

    return fullText;
  },

  /**
   * Signal the backend to 'warm up' the AI engine (Predictive Pre-Connection).
   * @param {string} token - Firebase ID token for authentication.
   */
  warmup: async (token) => {
    try {
      fetch(`${API_BASE_URL}/chat/warmup`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (e) { /* Silent fail for optimization pings */ }
  }
};
