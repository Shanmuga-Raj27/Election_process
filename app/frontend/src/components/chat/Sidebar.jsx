import { Plus, MessageSquare, PanelLeftClose, PanelRightClose } from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar, sessions, onSelectSession, currentSessionId, onNewChat }) => {
  return (
    <aside
      className={`${isOpen ? 'w-64' : 'w-0 sm:w-16'} transition-all duration-300 flex flex-col bg-gray-50 border-r border-gray-200 overflow-hidden h-full shrink-0`}
      aria-label="Chat History"
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-200">
        {isOpen && <span className="font-semibold text-gray-800">Chat History</span>}
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-200 rounded-lg text-gray-600 transition-colors"
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isOpen ? <PanelLeftClose size={20} /> : <PanelRightClose size={20} />}
        </button>
      </div>

      <div className="p-3">
        <button
          onClick={onNewChat}
          className={`flex items-center gap-3 w-full p-3 rounded-full hover:bg-gray-200 transition-colors text-gray-700 ${!isOpen && 'justify-center'}`}
          aria-label="New chat"
        >
          <Plus size={20} />
          {isOpen && <span className="font-medium">New Chat</span>}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-1 mt-2">
        {isOpen && <div className="text-xs font-semibold text-gray-500 mb-3 px-2 uppercase tracking-wider">Recent</div>}
        {sessions.map((session, idx) => (
          <button
            key={idx}
            onClick={() => onSelectSession(session)}
            className={`flex items-center gap-3 w-full p-3 rounded-lg text-left transition-colors text-sm ${currentSessionId === session ? 'bg-[#EAF5F0] text-[#046A38] font-medium' : 'hover:bg-gray-200 text-gray-700'} ${!isOpen && 'justify-center'}`}
            aria-label={`Load chat session ${session}`}
          >
            <MessageSquare size={18} className="shrink-0" />
            {isOpen && <span className="truncate">{session}</span>}
          </button>
        ))}
        {isOpen && sessions.length === 0 && (
          <div className="text-sm text-gray-500 px-2 italic">No past sessions</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
