import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import ChatMessage from './ChatMessage';

const ChatArea = ({ messages, isTyping, onSendMessage }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (!isTyping) {
      inputRef.current?.focus();
    }
  }, [isTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isTyping) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <main className="flex-1 flex flex-col h-full bg-white relative">
      <header className="h-14 flex items-center justify-between px-6 border-b border-gray-100 shrink-0 sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <h1 className="text-xl font-semibold text-gray-800">
          NEA - AI <span className="text-sm font-normal text-gray-500 ml-2">(National Election Assistant)</span>
        </h1>
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-600 hover:text-navy transition-colors text-sm font-medium"
          aria-label="Back to Homepage"
        >
          <Home size={18} />
          <span className="hidden sm:inline">Back to Home</span>
        </Link>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.length === 0 && !isTyping ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
            <div className="w-16 h-16 bg-[#EAF5F0] rounded-full flex items-center justify-center text-[#046A38]">
              <span className="text-3xl font-bold">NEA</span>
            </div>
            <p className="text-lg">How can I help you with the elections today?</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <ChatMessage key={idx} message={msg.text} isAI={msg.isAI} />
          ))
        )}

        {isTyping && (
          <div className="flex gap-4 w-full max-w-3xl mx-auto p-4 bg-gray-50 rounded-2xl">
            <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-[#06038D] text-white">
              <Loader2 size={18} className="animate-spin" />
            </div>
            <div className="flex-1 flex items-center">
              <p className="text-sm text-gray-500 italic">NEA - AI is thinking...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 md:p-6 shrink-0 bg-gradient-to-t from-white via-white to-transparent pt-10">
        <div className="max-w-3xl mx-auto relative">
          <form
            onSubmit={handleSubmit}
            className="flex items-end gap-2 bg-gray-100 rounded-3xl p-2 border border-transparent focus-within:border-[#FF671F] focus-within:ring-2 focus-within:ring-[#FF671F]/20 transition-all card-gradient-border"
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about the elections..."
              className="flex-1 max-h-32 min-h-[44px] bg-transparent resize-none border-0 focus:ring-0 p-3 outline-none text-gray-800"
              rows={1}
              disabled={isTyping}
              aria-label="Chat input"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="shrink-0 w-11 h-11 rounded-full bg-[#046A38] text-white flex items-center justify-center hover:bg-[#03552c] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Send message"
            >
              <Send size={18} className="ml-1" />
            </button>
          </form>
          <p className="text-xs text-center text-gray-400 mt-3">
            NEA - AI can make mistakes. Consider verifying important election information.
          </p>
        </div>
      </div>
    </main>
  );
};

export default ChatArea;
