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
              className={`flex items-center justify-center p-2 sm:p-2.5 rounded-xl transition-all duration-500 ease-out hover:scale-105 active:scale-95 z-50 min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] group ${
                darkMode
                  ? 'bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-gray-300 shadow-lg hover:shadow-xl'
                  : 'bg-gradient-to-r from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 text-gray-700 shadow-lg hover:shadow-xl'
              }`}
            >
              {sidebarOpen ? (
                <X className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:rotate-90" />
              ) : (
                <Menu className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:rotate-12" />
              )}
            </button>
            
            <div className="flex items-center justify-center p-2 sm:p-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] shadow-lg hover:shadow-xl transition-all duration-300 group">
                <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-white transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"/>
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
              className={`flex items-center justify-center p-2 sm:p-2.5 rounded-full transition-all duration-500 ease-out hover:scale-105 active:scale-95 min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] group shadow-lg hover:shadow-xl ${
                darkMode 
                  ? "bg-gradient-to-r from-gray-700 to-gray-600 hover:from-yellow-600 hover:to-orange-500 text-yellow-400" 
                  : "bg-gradient-to-r from-indigo-100 to-blue-50 hover:from-indigo-200 hover:to-blue-100 text-indigo-700"
              }`}
              onClick={toggleDarkMode}
            >
                 {darkMode ? (
                   <Sun className="h-4 w-4 sm:h-5 sm:w-5 transition-all duration-300 group-hover:rotate-180 group-hover:text-yellow-300" />
                 ) : (
                   <Moon className="h-4 w-4 sm:h-5 sm:w-5 transition-all duration-300 group-hover:-rotate-12 group-hover:text-indigo-600" />
                 )}
            </button>
        </div>
      </div>
    </header>
  )
}

export default Header