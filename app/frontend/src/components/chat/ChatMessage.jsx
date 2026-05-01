/* eslint-disable no-unused-vars */
import { User, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ChatMessage = ({ message, isAI }) => {
  return (
    <div className={`flex w-full ${isAI ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`flex gap-3 md:gap-4 max-w-[95%] sm:max-w-[85%] md:max-w-2xl p-4 rounded-2xl shadow-sm border ${isAI ? 'bg-white border-gray-100 flex-row' : 'bg-[#EAF5F0] border-[#046A38]/10 flex-row-reverse'}`}>
        <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-inner ${isAI ? 'bg-[#06038D] text-white' : 'bg-[#FF671F] text-white'}`}>
          {isAI ? <Bot size={18} /> : <User size={18} />}
        </div>
        <div className={`flex-1 space-y-1 overflow-hidden ${!isAI && 'text-right'}`}>
          <p className="font-bold text-xs uppercase tracking-tight text-gray-400">{isAI ? 'NEA - AI' : 'You'}</p>
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap break-words text-sm md:text-base prose prose-slate max-w-none">
            {isAI ? (
              <ReactMarkdown
                components={{
                  strong: ({ node: _, ...props }) => <strong className="font-bold text-navy" {...props} />,
                  ul: ({ node: _, ...props }) => <ul className="list-disc ml-4 space-y-1 my-2" {...props} />,
                  li: ({ node: _, ...props }) => <li className="text-gray-700" {...props} />,
                  p: ({ node: _, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                }}
              >
                {message}
              </ReactMarkdown>
            ) : (
              message
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
