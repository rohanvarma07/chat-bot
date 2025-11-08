import React from 'react';
import { Plus, MessageSquare, Trash2, Edit3, X, Menu } from 'lucide-react';

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

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={onToggle}
                className={`md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg transition-all duration-300 ${
                    darkMode
                        ? 'bg-gray-800 text-white border border-gray-600'
                        : 'bg-white text-gray-900 border border-gray-300'
                } shadow-lg hover:scale-105 active:scale-95`}
            >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {/* Mobile Overlay */}
            {isOpen && (
                <div 
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={onToggle}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed md:relative top-0 left-0 h-full z-40 transition-all duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
                border-r w-80 flex flex-col
            `}>
                {/* Header */}
                <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            Chat Sessions
                        </h2>
                        <button
                            onClick={onToggle}
                            className={`md:hidden p-1 rounded ${
                                darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                    
                    {/* New Chat Button */}
                    <button
                        onClick={onNewChat}
                        className={`w-full flex items-center gap-2 p-3 rounded-lg transition-all duration-200 ${
                            darkMode
                                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        } shadow-md hover:shadow-lg`}
                    >
                        <Plus className="h-4 w-4" />
                        <span className="font-medium">New Chat</span>
                    </button>
                </div>

                {/* Chat Sessions List */}
                <div className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-2">
                        {chatSessions.length === 0 ? (
                            <div className={`text-center py-8 ${
                                darkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                                <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                <p>No chat sessions yet</p>
                                <p className="text-sm">Start a new chat to begin</p>
                            </div>
                        ) : (
                            chatSessions.map((chat) => (
                                <div
                                    key={chat.id}
                                    className={`group relative rounded-lg transition-all duration-200 ${
                                        currentChatId === chat.id
                                            ? darkMode
                                                ? 'bg-indigo-900/50 border-indigo-500'
                                                : 'bg-indigo-50 border-indigo-300'
                                            : darkMode
                                                ? 'bg-gray-700 hover:bg-gray-600 border-gray-600'
                                                : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                                    } border cursor-pointer`}
                                >
                                    <div 
                                        onClick={() => onSelectChat(chat.id)}
                                        className="p-3"
                                    >
                                        <div className="flex items-start gap-2">
                                            <MessageSquare className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                                                currentChatId === chat.id
                                                    ? darkMode ? 'text-indigo-400' : 'text-indigo-600'
                                                    : darkMode ? 'text-gray-400' : 'text-gray-500'
                                            }`} />
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
                                                        className={`w-full bg-transparent border-b ${
                                                            darkMode 
                                                                ? 'text-white border-gray-500 focus:border-indigo-400' 
                                                                : 'text-gray-900 border-gray-400 focus:border-indigo-600'
                                                        } focus:outline-none text-sm font-medium`}
                                                        autoFocus
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                ) : (
                                                    <>
                                                        <h3 className={`font-medium text-sm truncate ${
                                                            currentChatId === chat.id
                                                                ? darkMode ? 'text-white' : 'text-gray-900'
                                                                : darkMode ? 'text-gray-200' : 'text-gray-700'
                                                        }`}>
                                                            {chat.title}
                                                        </h3>
                                                        <p className={`text-xs mt-1 truncate ${
                                                            currentChatId === chat.id
                                                                ? darkMode ? 'text-indigo-300' : 'text-indigo-600'
                                                                : darkMode ? 'text-gray-400' : 'text-gray-500'
                                                        }`}>
                                                            {chat.lastMessage || 'No messages yet'}
                                                        </p>
                                                        <p className={`text-xs mt-1 ${
                                                            currentChatId === chat.id
                                                                ? darkMode ? 'text-indigo-300' : 'text-indigo-600'
                                                                : darkMode ? 'text-gray-500' : 'text-gray-400'
                                                        }`}>
                                                            {new Date(chat.updatedAt).toLocaleDateString()}
                                                        </p>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    {editingId !== chat.id && (
                                        <div className={`absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRename(chat.id, chat.title);
                                                }}
                                                className={`p-1 rounded hover:scale-110 transition-transform duration-150 ${
                                                    darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-600'
                                                }`}
                                                title="Rename chat"
                                            >
                                                <Edit3 className="h-3 w-3" />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (window.confirm('Delete this chat session?')) {
                                                        onDeleteChat(chat.id);
                                                    }
                                                }}
                                                className={`p-1 rounded hover:scale-110 transition-transform duration-150 ${
                                                    darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-600'
                                                }`}
                                                title="Delete chat"
                                            >
                                                <Trash2 className="h-3 w-3" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {chatSessions.length} chat session{chatSessions.length !== 1 ? 's' : ''}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
