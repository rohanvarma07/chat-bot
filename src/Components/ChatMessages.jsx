import {Bot, User, Copy, Check} from 'lucide-react';
import React from 'react'

function ChatMessages({ darkMode, messages, formatTimestamp }) {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(messages.text || messages.content || messages.message);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className={`flex mb-4 sm:mb-6 px-2 sm:px-3 ${messages.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`flex rounded-2xl px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5 transition-all duration-300 hover:shadow-lg max-w-[85%] sm:max-w-[75%] md:max-w-[65%] lg:max-w-[50%] ${
                messages.sender === 'user'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg ml-auto'
                    : `mr-auto ${darkMode
                        ? 'bg-gray-800 text-gray-100 border border-gray-600 shadow-lg'
                        : 'bg-white text-gray-800 shadow-lg border border-gray-100'
                    }`
            }`}
            >
                <div className={`flex-shrink-0 mr-2 sm:mr-3 mt-0.5 ${messages.sender === 'user' ? "text-indigo-200" : darkMode ? "text-indigo-400" : "text-indigo-600"}`}>
                    {messages.sender === 'user' ? 
                        <User className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" /> : 
                        <Bot className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                    }
                </div>
                <div className='flex-1 min-w-0'>
                    <div className="mb-1 sm:mb-2 flex flex-col">
                        <div className="flex justify-between items-start mb-1">
                            <span className={`font-semibold text-xs sm:text-sm md:text-base leading-tight ${messages.sender === 'user' ? 'text-indigo-100' : darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                                {messages.sender === 'user' ? 'You' : 'AI Assistant'}
                            </span>
                            {messages.timestamp && formatTimestamp && (
                                <span className={`text-xs font-medium flex-shrink-0 ml-2 ${messages.sender === 'user' ? 'text-indigo-200/80' : darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {formatTimestamp(messages.timestamp)}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className={`text-sm sm:text-base leading-relaxed break-words whitespace-pre-wrap ${
                        messages.sender === 'user' 
                            ? 'text-white' 
                            : darkMode 
                                ? 'text-gray-100' 
                                : 'text-gray-800'
                    }`}>
                        {messages.text || messages.content || messages.message}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatMessages 