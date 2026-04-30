import { useState, useEffect } from 'react';
import Sidebar from '../components/chat/Sidebar';
import ChatArea from '../components/chat/ChatArea';
import { chatApi } from '../services/api';

const Chat = () => {
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Initialize a session ID if none exists
  const getOrCreateSessionId = () => {
    if (currentSessionId) return currentSessionId;
    const newId = `session_${Date.now()}`;
    setCurrentSessionId(newId);
    return newId;
  };

  // Load sessions on mount
  useEffect(() => {
    const loadSessions = async () => {
      const data = await chatApi.getSessions();
      setSessions(data);
    };
    loadSessions();
  }, []);

  const handleSelectSession = async (sessionId) => {
    setCurrentSessionId(sessionId);
    setMessages([]);
    setIsTyping(true);

    try {
      const history = await chatApi.getHistory(sessionId);
      const formattedHistory = [];
      history.forEach(item => {
        formattedHistory.push({ text: item.user_message, isAI: false });
        formattedHistory.push({ text: item.ai_response, isAI: true });
      });
      setMessages(formattedHistory);
    } catch (error) {
      console.error("Failed to load history", error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleNewChat = () => {
    const newId = `session_${Date.now()}`;
    setCurrentSessionId(newId);
    setMessages([]);
  };

  const handleSendMessage = async (text) => {
    const sessionId = getOrCreateSessionId();

    // Optimistic UI update
    setMessages(prev => [...prev, { text, isAI: false }]);
    setIsTyping(true);

    try {
      const response = await chatApi.sendMessage(sessionId, text);
      setMessages(prev => [...prev, { text: response.response, isAI: true }]);

      // Update sidebar if it's a new session
      if (!sessions.includes(sessionId)) {
        setSessions(prev => [sessionId, ...prev]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { text: "Sorry, I encountered an error. Please try again.", isAI: true }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        sessions={sessions}
        onSelectSession={handleSelectSession}
        currentSessionId={currentSessionId}
        onNewChat={handleNewChat}
      />
      <ChatArea
        messages={messages}
        isTyping={isTyping}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default Chat;
