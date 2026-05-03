import { Plus, MessageSquare, X, History, PanelLeftClose, PanelLeftOpen } from 'lucide-react';

const Sidebar = ({ sessions, onSelectSession, currentSessionId, onNewChat, onClose, isCollapsed, onToggleCollapse }) => {

  return (
    <aside className={`flex flex-col bg-white border-r border-gray-100 h-full w-full shadow-2xl transition-all duration-300 ${isCollapsed ? 'items-center' : ''}`}>
      {/* Header */}
      <div className={`p-6 flex items-center justify-between border-b border-gray-50 bg-navy text-white transition-all ${isCollapsed ? 'px-4' : ''}`}>
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
              <span className="text-navy font-black text-sm">IN</span>
            </div>
            <span className="font-extrabold text-xl tracking-tight">NEA</span>
          </div>
        )}
        {isCollapsed && (
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
            <span className="text-navy font-black text-xs">IN</span>
          </div>
        )}
        
        <div className="flex items-center gap-1">
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex p-2 hover:bg-white/10 rounded-lg transition-colors text-white/70 hover:text-white"
            title={isCollapsed ? "Maximize Sidebar" : "Minimize Sidebar"}
          >
            {isCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
          </button>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* New Chat Button */}
      <div className="p-4 w-full">
        <button
          onClick={onNewChat}
          className={`flex items-center justify-center gap-3 w-full bg-saffron text-white rounded-2xl hover:bg-[#e55a15] hover:shadow-lg transition-all font-bold shadow-md shadow-saffron/20 active:scale-95 ${isCollapsed ? 'p-3' : 'p-4'}`}
          title="New Conversation"
        >
          <Plus size={isCollapsed ? 24 : 20} className="shrink-0" />
          {!isCollapsed && <span>New Chat</span>}
        </button>
      </div>

      {/* Sessions List */}
      <div className={`flex-1 overflow-y-auto pb-4 space-y-1.5 custom-scrollbar w-full ${isCollapsed ? 'px-2' : 'px-3'}`}>
        {!isCollapsed && (
          <div className="flex items-center gap-2 text-[11px] font-black text-gray-400 mb-4 px-3 uppercase tracking-[0.2em] mt-4">
            <History size={12} />
            <span>Recent</span>
          </div>
        )}
        
        <div className="space-y-1 w-full">
          {sessions.map((session, idx) => (
            <button
              key={idx}
              onClick={() => onSelectSession(session.session_id)}
              className={`
                flex items-center gap-3 w-full rounded-2xl text-left transition-all group
                ${currentSessionId === session.session_id 
                  ? 'bg-navy/5 text-navy font-bold ring-1 ring-navy/10' 
                  : 'hover:bg-gray-50 text-gray-600 hover:text-navy'}
                ${isCollapsed ? 'justify-center p-3' : 'p-4'}
              `}
              title={session.title}
            >
              <MessageSquare 
                size={18} 
                className={`shrink-0 ${currentSessionId === session.session_id ? 'text-saffron' : 'text-gray-400 group-hover:text-saffron'}`} 
              />
              {!isCollapsed && <span className="truncate text-sm font-medium">{session.title}</span>}
            </button>
          ))}
        </div>

        {sessions.length === 0 && !isCollapsed && (
          <div className="py-12 px-4 text-center">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <MessageSquare size={20} className="text-gray-300" />
            </div>
            <p className="text-xs text-gray-400 font-medium">No recent chats</p>
          </div>
        )}
      </div>

      {/* Footer Branding */}
      <div className={`border-t border-gray-50 bg-gray-50/50 transition-all ${isCollapsed ? 'p-4' : 'p-6'}`}>
        {!isCollapsed ? (
          <p className="text-[10px] text-center text-gray-400 font-black uppercase tracking-[0.2em]">
            NEA AI Assistant
          </p>
        ) : (
          <div className="text-center font-black text-gray-300 text-[10px]">NEA</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
