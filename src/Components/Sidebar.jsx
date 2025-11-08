import React from 'react';
import { Plus, MessageSquare, Trash2, Edit3, X, Menu, Clock, Search, Settings, ChevronRight } from 'lucide-react';

function Sidebar({ 
    darkMode, 
    isOpen, 
    onToggle, 
    chatSessions, 
    currentChatId, 
    onNewChat, 
    onSelectChat, 
    onDeleteChat, 
    onRenameChat 
}) {
    const [editingId, setEditingId] = React.useState(null);
    const [editTitle, setEditTitle] = React.useState('');
    const [searchQuery, setSearchQuery] = React.useState('');

    const handleRename = (chatId, currentTitle) => {
        setEditingId(chatId);
        setEditTitle(currentTitle);
    };

    const saveRename = (chatId) => {
        if (editTitle.trim()) {
            onRenameChat(chatId, editTitle.trim());
        }
        setEditingId(null);
        setEditTitle('');
    };

    const cancelRename = () => {
        setEditingId(null);
        setEditTitle('');
    };

    // Filter chat sessions based on search query
    const filteredSessions = chatSessions.filter(session => 
        session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div 
                    className="md:hidden fixed inset-0 bg-black/60 z-30 backdrop-blur-sm animate-in fade-in duration-300"
                    onClick={onToggle}
                />
            )}

            {/* Sidebar */}
            <div className={`
                transition-all duration-300 ease-in-out h-full flex flex-col relative
                ${isOpen 
                    ? 'w-72 sm:w-80 opacity-100 translate-x-0' 
                    : 'w-0 opacity-0 overflow-hidden md:opacity-100 md:translate-x-0'
                }
                ${darkMode 
                    ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 border-gray-700/50' 
                    : 'bg-gradient-to-b from-white via-gray-50 to-white border-gray-200/50'
                }
                border-r backdrop-blur-xl shadow-2xl
            `}>
                {/* Header Section */}
                <div className={`p-5 border-b ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
                    {/* Title */}
                    <div className="flex items-center gap-3 mb-5">
                        <div className={`w-2 h-2 rounded-full ${darkMode ? 'bg-green-400' : 'bg-green-500'} animate-pulse`} />
                        <h2 className={`text-xl font-bold ${
                            darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                            Chats
                        </h2>
                    </div>
                    
                    {/* New Chat Button */}
                    <button
                        onClick={onNewChat}
                        className={`w-full flex items-center justify-between gap-3 p-4 rounded-xl transition-all duration-300 group ${
                            darkMode
                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg hover:shadow-xl'
                                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg hover:shadow-xl'
                        } transform hover:scale-105 active:scale-95`}
                    >
                        <div className="flex items-center gap-3">
                            <Plus className="h-5 w-5 transition-transform group-hover:rotate-90" />
                            <span className="font-semibold text-base">New Chat</span>
                        </div>
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>

                    {/* Search Bar */}
                    <div className="mt-4">
                        <div className={`relative rounded-xl ${
                            darkMode ? 'bg-gray-700/50' : 'bg-gray-100/50'
                        } backdrop-blur-sm`}>
                            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                                darkMode ? 'text-gray-400' : 'text-gray-500'
                            }`} />
                            <input
                                type="text"
                                placeholder="Search conversations..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`w-full pl-10 pr-4 py-3 bg-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-200 ${
                                    darkMode 
                                        ? 'text-white placeholder-gray-400' 
                                        : 'text-gray-900 placeholder-gray-500'
                                }`}
                            />
                        </div>
                    </div>
                </div>

                {/* Chat Sessions List */}
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    {filteredSessions.length === 0 ? (
                        <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {searchQuery ? (
                                <>
                                    <Search className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                    <p className="font-medium text-lg mb-1">No chats found</p>
                                    <p className="text-sm">Try a different search term</p>
                                </>
                            ) : (
                                <>
                                    <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                    <p className="font-medium text-lg mb-1">No conversations yet</p>
                                    <p className="text-sm">Start a new chat to begin</p>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {filteredSessions.map((chat) => (
                                <div
                                    key={chat.id}
                                    className={`group relative rounded-xl transition-all duration-300 ${
                                        currentChatId === chat.id
                                            ? darkMode
                                                ? 'bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border-indigo-400/30 shadow-lg ring-1 ring-indigo-500/30'
                                                : 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-300/50 shadow-md ring-1 ring-indigo-200/50'
                                            : darkMode
                                                ? 'bg-gray-800/50 hover:bg-gray-700/70 border-gray-600/30 hover:shadow-lg'
                                                : 'bg-white/70 hover:bg-gray-50 border-gray-200/50 hover:shadow-lg'
                                    } border backdrop-blur-sm cursor-pointer transform hover:scale-[1.02] hover:-translate-y-0.5`}
                                >
                                    <div 
                                        onClick={() => onSelectChat(chat.id)}
                                        className="p-4"
                                    >
                                        <div className="flex items-start gap-3">
                                            {/* Chat Icon */}
                                            <div className={`p-2.5 rounded-xl shrink-0 ${
                                                currentChatId === chat.id
                                                    ? darkMode 
                                                        ? 'bg-indigo-500/20 text-indigo-400' 
                                                        : 'bg-indigo-100 text-indigo-600'
                                                    : darkMode 
                                                        ? 'bg-gray-700 text-gray-400' 
                                                        : 'bg-gray-100 text-gray-500'
                                            } transition-all duration-200`}>
                                                <MessageSquare className="h-4 w-4" />
                                            </div>
                                            
                                            {/* Chat Content */}
                                            <div className="flex-1 min-w-0">
                                                {editingId === chat.id ? (
                                                    <input
                                                        type="text"
                                                        value={editTitle}
                                                        onChange={(e) => setEditTitle(e.target.value)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') saveRename(chat.id);
                                                            if (e.key === 'Escape') cancelRename();
                                                        }}
                                                        onBlur={() => saveRename(chat.id)}
                                                        className={`w-full bg-transparent border-b-2 ${
                                                            darkMode 
                                                                ? 'text-white border-indigo-500 focus:border-indigo-400' 
                                                                : 'text-gray-900 border-indigo-500 focus:border-indigo-600'
                                                        } focus:outline-none font-medium pb-1`}
                                                        autoFocus
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                ) : (
                                                    <>
                                                        {/* Chat Title */}
                                                        <h3 className={`font-semibold text-sm truncate mb-2 ${
                                                            currentChatId === chat.id
                                                                ? darkMode ? 'text-white' : 'text-gray-900'
                                                                : darkMode ? 'text-gray-200' : 'text-gray-700'
                                                        }`}>
                                                            {chat.title}
                                                        </h3>
                                                        
                                                        {/* Last Message */}
                                                        <p className={`text-xs truncate mb-2 ${
                                                            currentChatId === chat.id
                                                                ? darkMode ? 'text-indigo-300' : 'text-indigo-600'
                                                                : darkMode ? 'text-gray-400' : 'text-gray-500'
                                                        }`}>
                                                            {chat.lastMessage || 'No messages yet'}
                                                        </p>
                                                        
                                                        {/* Timestamp */}
                                                        <div className="flex items-center gap-1">
                                                            <Clock className={`h-3 w-3 ${
                                                                currentChatId === chat.id
                                                                    ? darkMode ? 'text-indigo-400' : 'text-indigo-500'
                                                                    : darkMode ? 'text-gray-500' : 'text-gray-400'
                                                            }`} />
                                                            <p className={`text-xs ${
                                                                currentChatId === chat.id
                                                                    ? darkMode ? 'text-indigo-300' : 'text-indigo-600'
                                                                    : darkMode ? 'text-gray-500' : 'text-gray-400'
                                                            }`}>
                                                                {new Date(chat.updatedAt).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    {editingId !== chat.id && (
                                        <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRename(chat.id, chat.title);
                                                }}
                                                className={`flex items-center justify-center p-2 rounded-lg transition-all duration-200 min-w-[32px] min-h-[32px] ${
                                                    darkMode 
                                                        ? 'bg-gray-700/80 text-gray-300 hover:bg-blue-600 hover:text-white' 
                                                        : 'bg-white/80 text-gray-600 hover:bg-blue-500 hover:text-white'
                                                } shadow-lg hover:scale-110 transform backdrop-blur-sm`}
                                                title="Rename chat"
                                            >
                                                <Edit3 className="h-3 w-3" />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (window.confirm('Delete this conversation? This action cannot be undone.')) {
                                                        onDeleteChat(chat.id);
                                                    }
                                                }}
                                                className={`flex items-center justify-center p-2 rounded-lg transition-all duration-200 min-w-[32px] min-h-[32px] ${
                                                    darkMode 
                                                        ? 'bg-gray-700/80 text-gray-300 hover:bg-red-600 hover:text-white' 
                                                        : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
                                                } shadow-lg hover:scale-110 transform backdrop-blur-sm`}
                                                title="Delete chat"
                                            >
                                                <Trash2 className="h-3 w-3" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className={`p-5 border-t ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'} bg-gradient-to-r ${
                    darkMode ? 'from-gray-800/30 to-gray-900/30' : 'from-gray-50/30 to-white/30'
                }`}>
                    <div className="flex items-center justify-between">
                        <div className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {filteredSessions.length} of {chatSessions.length} conversation{chatSessions.length !== 1 ? 's' : ''}
                        </div>
                        <button
                            className={`flex items-center justify-center p-1.5 rounded-lg transition-all duration-200 min-w-[32px] min-h-[32px] ${
                                darkMode 
                                    ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                            }`}
                            title="Settings"
                        >
                            <Settings className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
