import { Bot,Sparkle,Sun,Moon, Menu, X} from 'lucide-react';
import React from 'react'

function Header({darkMode, toggleDarkMode, onToggleSidebar, sidebarOpen}) {
  return (
    <header className={`w-full shadow-sm border-b px-3 sm:px-4 py-3 transition-all duration-300 backdrop-blur-md ${
      darkMode 
        ? 'bg-gray-800/95 text-white border-gray-700/50' 
        : 'bg-white/95 text-gray-900 border-gray-200/50'
    }`}>
      <div className={`flex items-center justify-between mx-auto transition-all duration-300 ${
        sidebarOpen ? 'max-w-6xl' : 'max-w-7xl'
      }`}>
        {/* Left Section */}
        <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Mobile & Desktop Sidebar Toggle */}
            <button
              onClick={onToggleSidebar}
              className={`flex items-center justify-center p-2 sm:p-2.5 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 z-50 min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] ${
                darkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {sidebarOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
            </button>
            
            <div className="flex items-center justify-center p-2 sm:p-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px]">
                <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-white"/>
            </div>
            <h1 className="text-lg sm:text-xl font-bold">
              <span className="hidden sm:inline">Intelligent Chat Bot</span>
              <span className="sm:hidden">AI Chat</span>
            </h1>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="hidden md:flex items-center space-x-1 px-3 py-1 rounded text-sm font-medium">
                <Sparkle className={`${darkMode ? 'text-indigo-400' : 'text-indigo-600'} h-4 w-4`} />
                <span className={`${darkMode ? 'text-indigo-300' : 'text-indigo-500'} text-sm font-medium`}>Powered By AI</span>
            </div>
            <button 
              className={`flex items-center justify-center p-2 sm:p-2.5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] ${
                darkMode 
                  ? "bg-gray-700 hover:bg-gray-600 text-yellow-400" 
                  : "bg-indigo-100 hover:bg-indigo-200 text-indigo-700"
              }`}
              onClick={toggleDarkMode}
            >
                 {darkMode ? <Sun className="h-4 w-4 sm:h-5 sm:w-5" /> : <Moon className="h-4 w-4 sm:h-5 sm:w-5" />}
            </button>
        </div>
      </div>
    </header>
  )
}

export default Header