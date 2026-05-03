import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Home, Mic, MicOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ChatMessage from './ChatMessage';

const LANG_MAP = { en: 'en-IN', hi: 'hi-IN', ta: 'ta-IN' };

const ChatArea = ({ messages, isTyping, onSendMessage, onTypingStart }) => {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  // Web Speech API setup
  const toggleListening = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Your browser does not support voice input. Please use Google Chrome.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = LANG_MAP[i18n.language] || 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => (prev ? prev + ' ' + transcript : transcript));
      inputRef.current?.focus();
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, [isListening, i18n.language]);

  // Cleanup on unmount
  useEffect(() => {
    return () => recognitionRef.current?.stop();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

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
    <main className="flex-1 flex flex-col h-full bg-white relative overflow-hidden">
      {/* Header - Desktop */}
      <header className="hidden lg:flex h-20 items-center justify-between px-8 border-b border-gray-100 shrink-0 sticky top-0 bg-white/90 backdrop-blur-md z-10">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-xl font-black text-navy tracking-tight">
              NEA - AI
            </h1>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
              National Election Assistant
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            aria-label="Back to Homepage"
            className="flex items-center gap-2 px-5 py-2.5 bg-saffron text-white rounded-full font-bold shadow-lg shadow-saffron/20 hover:bg-[#e55a15] hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95"
          >
            <Home size={18} />
            <span>Homepage</span>
          </button>
          <div className="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-bold rounded-full border border-green-100">
            NEA v2.1 (OPTIMIZED)
          </div>
          <div className="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full border border-blue-100">
            SECURE SESSION
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-10 space-y-8 custom-scrollbar bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]">
        {messages.length === 0 && !isTyping ? (
          <div className="h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto px-4">
            <div className="w-20 h-20 bg-navy rounded-3xl flex items-center justify-center text-white mb-8 shadow-xl rotate-3">
              <span className="text-3xl font-black">NEA</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-navy mb-4 h2-mobile">
              Hello, I am NEA - AI.
            </h2>
            <p className="text-gray-500 font-medium text-lg mb-10 p-mobile">
              Your National Election Assistant. I'm here to help you understand the election process in India. How can I assist you today?
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {[
                "How do I register to vote?",
                "What documents are required?",
                "How to use an EVM machine?",
                "Check eligibility criteria"
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => onSendMessage(suggestion)}
                  className="p-5 text-left text-sm font-bold text-navy bg-white hover:bg-navy hover:text-white rounded-2xl transition-all border-2 border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto w-full space-y-10 pb-10">
            {messages.map((msg, idx) => (
              <ChatMessage 
                key={idx} 
                message={msg.text} 
                isAI={msg.isAI} 
                isThinking={msg.isThinking}
                isStreaming={msg.isStreaming}
              />
            ))}
            

          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 lg:p-8 shrink-0 bg-white border-t border-gray-50 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
        <div className="max-w-4xl mx-auto relative">
          <form
            onSubmit={handleSubmit}
            className="flex items-end gap-3 bg-gray-50 rounded-[1.5rem] lg:rounded-[2.5rem] p-2 lg:p-3 border-2 border-transparent focus-within:border-saffron focus-within:bg-white focus-within:shadow-2xl focus-within:shadow-saffron/10 transition-all"
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => {
                const val = e.target.value;
                setInput(val);
                if (val.length === 5 && onTypingStart) {
                  onTypingStart();
                }
              }}
              onKeyDown={handleKeyDown}
              placeholder="Ask NEA anything about the elections..."
              className="flex-1 max-h-40 min-h-[48px] lg:min-h-[60px] bg-transparent resize-none border-0 focus:ring-0 px-4 py-3 lg:py-4 outline-none text-gray-800 font-medium text-base"
              rows={1}
              disabled={isTyping}
            />
            <button
              type="button"
              onClick={toggleListening}
              aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
              className={`shrink-0 w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-all shadow-lg active:scale-95 ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse hover:bg-red-600'
                  : 'bg-gray-200 text-navy hover:bg-gray-300'
              }`}
            >
              {isListening ? <MicOff size={22} /> : <Mic size={22} />}
            </button>
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
              className="shrink-0 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-navy text-white flex items-center justify-center hover:bg-saffron disabled:opacity-20 disabled:hover:bg-navy transition-all shadow-lg active:scale-95"
            >
              <Send size={24} />
            </button>
          </form>
          <p className="text-[10px] text-center text-gray-400 mt-4 font-bold uppercase tracking-[0.2em]">
            Official ECI Information Companion
          </p>
        </div>
      </div>
    </main>
  );
};

export default ChatArea;
