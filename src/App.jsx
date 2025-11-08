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
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [chatSessions, setChatSessions] = React.useState([]);
  const [currentChatId, setCurrentChatId] = React.useState(null);
  const [isInitialized, setIsInitialized] = React.useState(false);
  const messagesEndRef = React.useRef(null);

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

  // Get current chat session
  const getCurrentChat = () => {
    return getChatSession(chatSessions, currentChatId);
  };

  // Get messages for current chat
  const getCurrentMessages = () => {
    const currentChat = getCurrentChat();
    return currentChat?.messages || [];
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
      
      try {
        // Call Gemini API
        const aiResponseText = await geminiService.generateResponse(currentInput);
        
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
      } catch (error) {
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
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleNewChat = () => {
    const newSession = createNewChatSession();
    setChatSessions(prevSessions => [newSession, ...prevSessions]);
    setCurrentChatId(newSession.id);
    setSidebarOpen(false); // Close sidebar on mobile after creating new chat
  };

  const handleSelectChat = (chatId) => {
    setCurrentChatId(chatId);
    setSidebarOpen(false); // Close sidebar on mobile after selecting chat
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
    <div className={`flex h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
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
      <div className={`flex flex-col flex-1 transition-all duration-300 ${
        sidebarOpen ? 'md:ml-0' : 'md:ml-0'
      }`}>
        <Header 
          toggleDarkMode={toggleDarkMode} 
          darkMode={darkMode} 
          onToggleSidebar={toggleSidebar}
          sidebarOpen={sidebarOpen}
        />
        
        <div className='flex-1 overflow-y-auto overscroll-contain p-3 sm:p-4 md:p-6 pb-2'>
          <div className='w-full max-w-none mx-auto space-y-3 sm:space-y-4'>
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
          loading={isLoading}
        />
      </div>
    </div>
  )
}

export default App