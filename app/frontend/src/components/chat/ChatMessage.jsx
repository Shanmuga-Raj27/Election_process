import { Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

const ChatMessage = ({ message, isAI, isThinking, isStreaming }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex flex-col ${isAI ? 'items-start' : 'items-end'} mb-6 px-4`}
    >
      <div className="max-w-[95%] md:max-w-[85%] flex flex-col">
        {/* Message Bubble with Tricolor Inspired Border */}
        <div className={`
          space-y-2 overflow-hidden p-5 md:p-6 rounded-[1.5rem] shadow-sm relative
          ${isAI
            ? 'bg-white text-navy rounded-tl-none'
            : 'bg-[#FFF8F1] text-navy rounded-tr-none'}
          ${isThinking ? 'animate-pulse' : ''}
        `}
          style={{
            border: '2px solid transparent',
            background: isAI 
              ? 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #FF671F, #E5E7EB, #046A38) border-box'
              : 'linear-gradient(#FFF8F1, #FFF8F1) padding-box, linear-gradient(135deg, #FF671F, #E5E7EB, #046A38) border-box'
          }}
        >
          <div className="flex items-center justify-between mb-1">
            <span className={`text-[10px] font-black uppercase tracking-widest ${isAI ? 'text-navy' : 'text-saffron'}`}>
              {isAI ? 'NEA - AI Assistant' : 'Your Query'}
              {isStreaming && <span className="ml-2 inline-block w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>}
            </span>
          </div>

          <div className="leading-relaxed break-words text-sm md:text-base prose prose-slate max-w-none">
            {isThinking ? (
              <div className="flex items-center gap-3 py-2 text-gray-400 italic font-medium">
                <Loader2 size={18} className="animate-spin" />
                <span>NEA is thinking...</span>
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-navy/20 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-navy/20 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-navy/20 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            ) : isAI ? (
              <ReactMarkdown
                /* eslint-disable no-unused-vars */
                components={{
                  strong: ({ node, ...props }) => <strong className="font-bold text-navy border-b border-saffron/30" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc ml-5 space-y-2 my-4 marker:text-saffron" {...props} />,
                  li: ({ node, ...props }) => <li className="text-gray-700 font-medium" {...props} />,
                  p: ({ node, ...props }) => <p className="mb-4 last:mb-0" {...props} />,
                  a: ({ node, ...props }) => (
                    <a
                      className="text-navy font-bold underline decoration-saffron decoration-2 underline-offset-4 hover:text-saffron transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      {...props}
                    />
                  ),
                }}
                /* eslint-enable no-unused-vars */
              >
                {message}
              </ReactMarkdown>
            ) : (
              <p className="font-semibold text-navy text-lg leading-snug">{message}</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
