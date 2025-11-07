import { Bot } from 'lucide-react';
import React from 'react';

function LoadingIndicator({ darkMode }) {
    return (
        <div className={`flex mb-6 px-2 md:px-3 justify-start`}>
            <div className={`flex rounded-2xl px-4 py-4 md:px-5 md:py-5 transition-all duration-300 w-[40%] mr-auto ${
                darkMode
                    ? 'bg-gray-800 text-gray-100 border border-gray-600 shadow-lg'
                    : 'bg-white text-gray-800 shadow-lg border border-gray-100'
            }`}>
                <div className={`flex-shrink-0 mr-3 mt-0.5 ${darkMode ? "text-indigo-400" : "text-indigo-600"}`}>
                    <Bot className="h-6 w-6 md:h-7 md:w-7 animate-pulse" />
                </div>
                <div className='flex-1 min-w-0'>
                    <div className="mb-2 flex flex-col">
                        <div className="flex justify-between items-center mb-1">
                            <span className={`font-semibold text-sm md:text-base leading-tight ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                                AI Assistant
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-1">
                        <div className={`flex space-x-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            <span className="text-sm md:text-base">AI is typing</span>
                            <div className="flex space-x-1 mt-1">
                                <div className={`w-2 h-2 rounded-full animate-bounce ${darkMode ? 'bg-indigo-400' : 'bg-indigo-600'}`} 
                                     style={{ animationDelay: '0ms' }}></div>
                                <div className={`w-2 h-2 rounded-full animate-bounce ${darkMode ? 'bg-indigo-400' : 'bg-indigo-600'}`} 
                                     style={{ animationDelay: '150ms' }}></div>
                                <div className={`w-2 h-2 rounded-full animate-bounce ${darkMode ? 'bg-indigo-400' : 'bg-indigo-600'}`} 
                                     style={{ animationDelay: '300ms' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoadingIndicator;
