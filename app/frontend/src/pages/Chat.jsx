import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Plus, Home } from 'lucide-react';
import Sidebar from '../components/chat/Sidebar';
import ChatArea from '../components/chat/ChatArea';
import { chatApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Chat = () => {
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile drawer
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Desktop minimize
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const getOrCreateSessionId = () => {
    if (currentSessionId) return currentSessionId;
    const newId = `session_${Date.now()}`;
    setCurrentSessionId(newId);
    return newId;
  };

  // Load sessions on mount or user change
  useEffect(() => {
    const loadSessions = async () => {
      if (!currentUser) return;
      try {
        const token = await currentUser.getIdToken();
        const data = await chatApi.getSessions(token);
        setSessions(data);
      } catch (error) {
        console.error("Failed to load sessions", error);
      }
    };
    loadSessions();
  }, [currentUser]);

  const handleSelectSession = async (sessionId) => {
    if (!currentUser) return;
    setCurrentSessionId(sessionId);
    setMessages([]);
    setIsTyping(true);
    setIsSidebarOpen(false);

    try {
      const token = await currentUser.getIdToken();
      const history = await chatApi.getHistory(sessionId, token);
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
    setIsSidebarOpen(false);
  };

  const handleSendMessage = async (text) => {
    if (!currentUser) {
      navigate('/login', { state: { message: "Please login to use the AI Assistant" } });
      return;
    }

    const sessionId = getOrCreateSessionId();
    const isFirstMessage = !sessions.some(s => s.session_id === sessionId);

    setMessages(prev => [...prev, { text, isAI: false }]);
    setIsTyping(true);

    try {
      const token = await currentUser.getIdToken();
      const response = await chatApi.sendMessage(sessionId, text, token);
      setMessages(prev => [...prev, { text: response.response, isAI: true }]);

      // Update sidebar sessions list order (Move current to top)
      setSessions(prev => {
        const filtered = prev.filter(s => s.session_id !== sessionId);
        const title = isFirstMessage 
          ? (text.length > 40 ? text.substring(0, 37) + "..." : text)
          : (prev.find(s => s.session_id === sessionId)?.title || "Chat History");
        
        return [{ session_id: sessionId, title }, ...filtered];
      });
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { text: "I encountered a small hiccup! Please try asking again.", isAI: true }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden relative font-sans">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-navy/40 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <div className={`
        fixed inset-y-0 left-0 z-50 transform transition-all duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'}
        ${isSidebarCollapsed ? 'lg:w-20' : 'lg:w-64'}
      `}>
        <Sidebar
          sessions={sessions}
          onSelectSession={handleSelectSession}
          currentSessionId={currentSessionId}
          onNewChat={handleNewChat}
          onClose={() => setIsSidebarOpen(false)}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </div>

      <div className="flex-1 flex flex-col min-w-0 bg-white">
        {/* Mobile Header */}
        <header className="h-16 flex items-center justify-between px-4 border-b border-gray-100 bg-white/90 backdrop-blur-md lg:hidden shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 text-navy hover:bg-gray-100 rounded-lg"
            >
              <Menu size={24} />
            </button>
            <span className="font-extrabold text-xl text-navy tracking-tight">NEA</span>
          </div>
          <button
            onClick={() => navigate('/')}
            className="p-2 bg-saffron/10 text-saffron hover:bg-saffron hover:text-white rounded-lg transition-colors font-bold flex items-center gap-2 px-3 py-1.5"
          >
            <Home size={18} />
            <span className="text-xs">Home</span>
          </button>
        </header>

        <ChatArea
          messages={messages}
          isTyping={isTyping}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
