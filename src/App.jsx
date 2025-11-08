import React from 'react'
import Header from './Components/Header.jsx'
import ChatMessages from './Components/ChatMessages.jsx'
import LoadingIndicator from './Components/LoadingIndicator.jsx'
import Sidebar from './Components/Sidebar.jsx'
import { formatTimestamp } from './Utils/chatUtil.jsx';
import ChatInput from './Components/ChatInput.jsx';
import geminiService from './services/geminiService.js';
import {
  loadChatSessions,
  saveChatSessions,
  createNewChatSession,
  addMessageToChat,
  deleteChatSession,
  renameChatSession,
  getChatSession,
  generateAutoTitle
} from './Utils/chatSessionUtils.js';

function App() {
  const [darkMode, setDarkMode] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [sidebarOpen, setSidebarOpen] = React.useState(window.innerWidth >= 768);
  const [chatSessions, setChatSessions] = React.useState([]);
  const [currentChatId, setCurrentChatId] = React.useState(null);
  const [isInitialized, setIsInitialized] = React.useState(false);
  const messagesEndRef = React.useRef(null);
  const abortControllerRef = React.useRef(null);

  // Load chat sessions on component mount
  React.useEffect(() => {
    const sessions = loadChatSessions();
    setChatSessions(sessions);
    setCurrentChatId(sessions[0]?.id || null);
    setIsInitialized(true);
  }, []);

  // Save chat sessions whenever they change
  React.useEffect(() => {
    if (chatSessions.length > 0) {
      saveChatSessions(chatSessions);
    }
  }, [chatSessions]);

  // Auto scroll to bottom when messages change
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChatId, chatSessions]);

  // Keyboard shortcut for sidebar toggle (Ctrl/Cmd + B)
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
        event.preventDefault();
        setSidebarOpen(prev => !prev);
      }
      // ESC key to close sidebar on mobile
      if (event.key === 'Escape' && sidebarOpen && window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [sidebarOpen]);

  // Handle window resize for responsive sidebar
  React.useEffect(() => {
    const handleResize = () => {
      // On desktop (md+), ensure sidebar is open by default
      if (window.innerWidth >= 768 && !sidebarOpen) {
        setSidebarOpen(true);
      }
      // On mobile, close sidebar when switching from desktop
      if (window.innerWidth < 768 && sidebarOpen) {
        // Keep it open if user explicitly opened it on mobile
        // This maintains user intent
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarOpen]);

  // Get current chat session
  const getCurrentChat = () => {
    return getChatSession(chatSessions, currentChatId);
  };

  // Get messages for current chat
  const getCurrentMessages = () => {
    const currentChat = getCurrentChat();
    return currentChat?.messages || [];
  };

  const handleStopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (input.trim() && !isLoading && currentChatId) {
      const userMessage = {
        id: Date.now(),
        text: input.trim(),
        sender: "user",
        timestamp: new Date(),
      };
      
      // Add user message to current chat session
      let updatedSessions = addMessageToChat(chatSessions, currentChatId, userMessage);
      
      // Auto-generate title for first user message
      const currentChat = getChatSession(updatedSessions, currentChatId);
      if (currentChat.messages.filter(msg => msg.sender === 'user').length === 1) {
        const autoTitle = generateAutoTitle(input.trim());
        updatedSessions = renameChatSession(updatedSessions, currentChatId, autoTitle);
      }
      
      setChatSessions(updatedSessions);
      const currentInput = input.trim();
      setInput("");
      setIsLoading(true);
      
      // Create abort controller for this request
      abortControllerRef.current = new AbortController();
      
      try {
        // Call Gemini API with abort signal
        const aiResponseText = await geminiService.generateResponse(currentInput, abortControllerRef.current.signal);
        
        // Only add response if request wasn't aborted
        if (!abortControllerRef.current.signal.aborted) {
          const aiResponse = {
            id: Date.now() + 1,
            text: aiResponseText,
            sender: "bot",
            timestamp: new Date(),
          };
          
          // Add AI response to current chat session
          setChatSessions(prevSessions => 
            addMessageToChat(prevSessions, currentChatId, aiResponse)
          );
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Request was aborted');
        } else {
          console.error('Error getting AI response:', error);
          
          const errorResponse = {
            id: Date.now() + 1,
            text: "Sorry, I'm having trouble responding right now. Please try again later.",
            sender: "bot",
            timestamp: new Date(),
          };
          
          // Add error response to current chat session
          setChatSessions(prevSessions => 
            addMessageToChat(prevSessions, currentChatId, errorResponse)
          );
        }
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    }
  };

  const handleNewChat = () => {
    const newSession = createNewChatSession();
    setChatSessions(prevSessions => [newSession, ...prevSessions]);
    setCurrentChatId(newSession.id);
    // Only close sidebar on mobile after creating new chat
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const handleSelectChat = (chatId) => {
    setCurrentChatId(chatId);
    // Only close sidebar on mobile after selecting chat
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const handleDeleteChat = (chatId) => {
    const updatedSessions = deleteChatSession(chatSessions, chatId);
    setChatSessions(updatedSessions);
    
    // If current chat was deleted, switch to first available chat or create new one
    if (currentChatId === chatId) {
      if (updatedSessions.length > 0) {
        setCurrentChatId(updatedSessions[0].id);
      } else {
        handleNewChat();
      }
    }
  };

  const handleRenameChat = (chatId, newTitle) => {
    const updatedSessions = renameChatSession(chatSessions, chatId, newTitle);
    setChatSessions(updatedSessions);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Show loading screen while initializing
  if (!isInitialized) {
    return (
      <div className={`flex items-center justify-center h-screen ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <LoadingIndicator darkMode={darkMode} />
      </div>
    );
  }

  return (
    <div className={`h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="flex h-full relative">
        {/* Sidebar */}
        <Sidebar
          darkMode={darkMode}
          isOpen={sidebarOpen}
          onToggle={toggleSidebar}
          chatSessions={chatSessions}
          currentChatId={currentChatId}
          onNewChat={handleNewChat}
          onSelectChat={handleSelectChat}
          onDeleteChat={handleDeleteChat}
          onRenameChat={handleRenameChat}
        />
        
        {/* Main Chat Area */}
        <div className={`flex flex-col transition-all duration-500 ease-out flex-1 ${
          darkMode ? 'bg-gray-900' : 'bg-gray-50'
        } relative overflow-hidden ${sidebarOpen ? 'transform scale-95 sm:scale-100' : 'transform scale-100'}`}>
        <Header 
          toggleDarkMode={toggleDarkMode} 
          darkMode={darkMode} 
          onToggleSidebar={toggleSidebar}
          sidebarOpen={sidebarOpen}
        />
        
        <div className={`flex-1 overflow-y-auto overscroll-contain transition-all duration-500 ease-out ${
          sidebarOpen 
            ? 'p-2 sm:p-3 md:p-4 lg:p-8 pb-2' 
            : 'p-3 sm:p-4 lg:p-8 xl:p-12 pb-2'
        }`}>
          <div className={`w-full transition-all duration-300 mx-auto space-y-3 sm:space-y-4 ${
            sidebarOpen 
              ? 'max-w-4xl' 
              : 'max-w-5xl xl:max-w-6xl'
          }`}>
            {getCurrentMessages().map((message) => (
              <ChatMessages 
                key={message.id} 
                darkMode={darkMode} 
                messages={message} 
                formatTimestamp={formatTimestamp}
              />
            ))}
            {isLoading && (
              <LoadingIndicator darkMode={darkMode} />
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <ChatInput 
          darkMode={darkMode} 
          input={input} 
          setInput={setInput} 
          onSendMessage={handleSendMessage}
          onStopGeneration={handleStopGeneration}
          loading={isLoading}
        />
      </div>
      </div>
    </div>
  )
}

export default App