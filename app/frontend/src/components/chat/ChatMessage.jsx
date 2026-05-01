import { User, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ChatMessage = ({ message, isAI }) => {
  return (
    <div className={`flex w-full ${isAI ? 'justify-start' : 'justify-end'}`}>
      <div className={`
        flex gap-3 md:gap-5 max-w-[95%] sm:max-w-[85%] md:max-w-3xl transition-all
        ${isAI ? 'flex-row' : 'flex-row-reverse'}
      `}>
        {/* Avatar */}
        <div className={`
          shrink-0 w-8 h-8 md:w-11 md:h-11 rounded-full flex items-center justify-center shadow-lg transform
          ${isAI ? 'bg-navy text-white shadow-navy/20' : 'bg-saffron text-white shadow-saffron/20'}
        `}>
          {isAI ? (
            <div className="flex flex-col items-center">
              <span className="text-[10px] md:text-[11px] font-black leading-none">NEA</span>
            </div>
          ) : (
            <User size={22} />
          )}
        </div>
        
        {/* Message Bubble with Tricolor Inspired Border */}
        <div className={`
          flex-1 space-y-2 overflow-hidden p-5 md:p-6 rounded-[2rem] shadow-md relative
          ${isAI 
            ? 'bg-white text-navy rounded-tl-none' 
            : 'bg-white text-navy rounded-tr-none'}
        `}
        style={{
          border: '2px solid transparent',
          background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #FF671F, #E5E7EB, #046A38) border-box'
        }}
        >
          <div className="flex items-center justify-between mb-1">
            <span className={`text-[10px] font-black uppercase tracking-widest ${isAI ? 'text-navy' : 'text-saffron'}`}>
              {isAI ? 'NEA - AI' : 'Citizen Query'}
            </span>
          </div>
          
          <div className="leading-relaxed break-words text-sm md:text-base prose prose-slate max-w-none">
            {isAI ? (
              <ReactMarkdown
                components={{
                  strong: ({ node: _, ...props }) => <strong className="font-bold text-navy border-b border-saffron/30" {...props} />,
                  ul: ({ node: _, ...props }) => <ul className="list-disc ml-5 space-y-2 my-4 marker:text-saffron" {...props} />,
                  li: ({ node: _, ...props }) => <li className="text-gray-700 font-medium" {...props} />,
                  p: ({ node: _, ...props }) => <p className="mb-4 last:mb-0" {...props} />,
                  a: ({ node: _, ...props }) => (
                    <a 
                      className="text-navy font-bold underline decoration-saffron decoration-2 underline-offset-4 hover:text-saffron transition-colors" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      {...props} 
                    />
                  ),
                }}
              >
                {message}
              </ReactMarkdown>
            ) : (
              <p className="font-semibold text-navy text-lg leading-snug">{message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
