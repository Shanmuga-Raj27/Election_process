const API_BASE_URL = 'http://127.0.0.1:8000';

export const chatApi = {
  // Get all chat sessions for the sidebar
  getSessions: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/sessions`);
      if (!response.ok) throw new Error('Failed to fetch sessions');
      return await response.json();
    } catch (error) {
      console.error("API Error (getSessions):", error);
      return [];
    }
  },

  // Get chat history for a specific session
  getHistory: async (sessionId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/history/${sessionId}`);
      if (!response.ok) throw new Error('Failed to fetch history');
      return await response.json();
    } catch (error) {
      console.error("API Error (getHistory):", error);
      return [];
    }
  },

  // Send a new message to the chat
  sendMessage: async (sessionId, message) => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ session_id: sessionId, message }),
      });
      if (!response.ok) throw new Error('Failed to send message');
      return await response.json();
    } catch (error) {
      console.error("API Error (sendMessage):", error);
      throw error;
    }
  }
};
