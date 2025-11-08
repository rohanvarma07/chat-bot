import React from 'react'
import { Send, Loader2 } from 'lucide-react'

function ChatInput({ darkMode, input, setInput, onSendMessage, loading }) {
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
            ? 'bg-gray-800 border-t border-gray-700'
            : 'bg-white border-t border-gray-200'
            } p-3 sm:p-4`}>
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
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-gray-500'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-gray-400'
                        } rounded-full px-4 sm:px-5 py-3 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`} 
                    />
                    <button
                        type='submit'
                        disabled={!input.trim() || loading}
                        className={`flex items-center justify-center p-2.5 sm:p-3 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] min-w-[44px] ${
                            darkMode
                                ? 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white'
                                : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white'
                        } shadow-lg hover:shadow-xl active:scale-95 disabled:hover:scale-100 disabled:hover:shadow-lg`}
                    >
                        {loading ? (
                            <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 animate-spin" />
                        ) : (
                            <Send className="h-5 w-5 sm:h-6 sm:w-6" />
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ChatInput