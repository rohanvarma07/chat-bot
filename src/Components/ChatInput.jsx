import React from 'react'
import { Send, Loader2, Square } from 'lucide-react'

function ChatInput({ darkMode, input, setInput, onSendMessage, loading, onStopGeneration }) {
    const handleSubmit = (e) => {
        e.preventDefault()
        if (input.trim() && !loading) {
            onSendMessage()
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            handleSubmit(e)
        }
    }

    return (
        <div className={`${darkMode
            ? 'bg-gradient-to-r from-gray-800/95 via-gray-800/90 to-gray-800/95 border-t border-gray-700/50 backdrop-blur-xl'
            : 'bg-gradient-to-r from-white/95 via-gray-50/90 to-white/95 border-t border-gray-200/50 backdrop-blur-xl'
            } p-3 sm:p-4 shadow-[0_-10px_30px_-5px_rgba(0,0,0,0.1)]`}>
            <div className='w-full max-w-none mx-auto'>
                <form onSubmit={handleSubmit} className='flex items-center space-x-2 sm:space-x-3'>
                    <input 
                        type='text' 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder='Type your message...' 
                        disabled={loading}
                        className={`flex-1 border ${
                            darkMode
                                ? 'bg-gray-700/80 border-gray-600/50 text-white placeholder-gray-400 focus:border-indigo-400 focus:bg-gray-700'
                                : 'bg-white/80 border-gray-300/50 text-gray-900 placeholder-gray-500 focus:border-indigo-400 focus:bg-white'
                        } rounded-full px-4 sm:px-5 py-3 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all duration-500 ease-out backdrop-blur-sm shadow-lg focus:shadow-xl focus:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed`} 
                    />
                    
                    {/* Send/Stop Button */}
                    {loading ? (
                        <button
                            type='button'
                            onClick={onStopGeneration}
                            className={`flex items-center justify-center p-2.5 sm:p-3 rounded-full transition-all duration-500 ease-out min-h-[44px] min-w-[44px] group border-2 stop-button ${
                                darkMode
                                    ? 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400 border-red-400 shadow-lg hover:shadow-xl'
                                    : 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400 border-red-400 shadow-lg hover:shadow-xl'
                            } transform hover:scale-105 active:scale-95`}
                        >
                            <Square className="h-5 w-5 sm:h-6 sm:w-6 text-white transition-transform duration-300 group-hover:rotate-12" />
                        </button>
                    ) : (
                        <button
                            type='submit'
                            disabled={!input.trim()}
                            className={`flex items-center justify-center p-2.5 sm:p-3 rounded-full transition-all duration-500 ease-out disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] min-w-[44px] group border-2 ${
                                !input.trim()
                                    ? 'bg-gray-400 border-gray-300 text-gray-600'
                                    : darkMode
                                    ? 'bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-400 hover:to-blue-400 border-emerald-400 shadow-lg hover:shadow-xl'
                                    : 'bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-400 hover:to-blue-400 border-emerald-400 shadow-lg hover:shadow-xl'
                            } transform hover:scale-105 active:scale-95 disabled:hover:scale-100 disabled:hover:shadow-lg`}
                        >
                            <Send className="h-5 w-5 sm:h-6 sm:w-6 text-white transition-transform duration-300 group-hover:translate-x-0.5" />
                        </button>
                    )}
                </form>
            </div>
        </div>
    )
}

export default ChatInput