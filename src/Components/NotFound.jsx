import React from 'react';
import { Bot, Home, ArrowLeft, Search, MessageSquare } from 'lucide-react';

function NotFound({ darkMode = false }) {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-md w-full text-center">
        {/* Animated 404 Number */}
        <div className="relative mb-8">
          <div className={`text-9xl font-bold opacity-10 select-none ${
            darkMode ? 'text-gray-700' : 'text-gray-300'
          }`}>
            404
          </div>
          
          {/* Floating Bot Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`relative p-6 rounded-full shadow-2xl animate-float ${
              darkMode 
                ? 'bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600' 
                : 'bg-gradient-to-br from-white to-gray-100 border border-gray-200'
            }`}>
              <Bot className={`h-12 w-12 animate-pulse ${
                darkMode ? 'text-indigo-400' : 'text-indigo-600'
              }`} />
              
              {/* Orbiting dots */}
              <div className="absolute inset-0 animate-spin-slow">
                <div className={`absolute top-2 left-1/2 w-2 h-2 rounded-full ${
                  darkMode ? 'bg-blue-400' : 'bg-blue-500'
                } transform -translate-x-1/2`} />
                <div className={`absolute bottom-2 left-1/2 w-2 h-2 rounded-full ${
                  darkMode ? 'bg-purple-400' : 'bg-purple-500'
                } transform -translate-x-1/2`} />
                <div className={`absolute top-1/2 left-2 w-2 h-2 rounded-full ${
                  darkMode ? 'bg-green-400' : 'bg-green-500'
                } transform -translate-y-1/2`} />
                <div className={`absolute top-1/2 right-2 w-2 h-2 rounded-full ${
                  darkMode ? 'bg-yellow-400' : 'bg-yellow-500'
                } transform -translate-y-1/2`} />
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8 space-y-4">
          <h1 className={`text-3xl font-bold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Oops! Page Not Found
          </h1>
          <p className={`text-lg ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            The AI seems to have lost this page in the digital void.
          </p>
          <p className={`text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Don't worry, even the smartest bots make navigation errors sometimes!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleGoHome}
            className={`w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              darkMode
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg hover:shadow-xl'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            <Home className="h-5 w-5" />
            Back to Chat
          </button>
          
          <button
            onClick={handleGoBack}
            className={`w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 border-2 ${
              darkMode
                ? 'border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white hover:bg-gray-800'
                : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="mt-12 flex justify-center space-x-8 opacity-50">
          <div className={`animate-bounce-delayed-1 ${
            darkMode ? 'text-gray-600' : 'text-gray-400'
          }`}>
            <Search className="h-6 w-6" />
          </div>
          <div className={`animate-bounce-delayed-2 ${
            darkMode ? 'text-gray-600' : 'text-gray-400'
          }`}>
            <MessageSquare className="h-6 w-6" />
          </div>
          <div className={`animate-bounce-delayed-3 ${
            darkMode ? 'text-gray-600' : 'text-gray-400'
          }`}>
            <Bot className="h-6 w-6" />
          </div>
        </div>

        {/* Fun Footer */}
        <div className="mt-8">
          <p className={`text-xs ${
            darkMode ? 'text-gray-500' : 'text-gray-400'
          }`}>
            Error Code: AI_CONFUSION_404 • Try asking the bot for directions! 🤖
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
