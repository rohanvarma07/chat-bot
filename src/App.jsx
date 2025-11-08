import React from 'react'
import Header from './Components/Header.jsx'
import ChatMessages from './Components/ChatMessages.jsx'
import LoadingIndicator from './Components/LoadingIndicator.jsx'
import { formatTimestamp } from './Utils/chatUtil.jsx';
import ChatInput from './Components/ChatInput.jsx';
import geminiService from './services/geminiService.js';

function App() {
  const [darkMode, setDarkMode] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [input, setInput] = React.useState("");
  const messagesEndRef = React.useRef(null); 

  const handleSendMessage = async () => {
    if (input.trim() && !isLoading) {
      const userMessage = {
        id: Date.now(),
        text: input.trim(),
        sender: "user",
        timestamp: new Date(),
      };
      
      // Add user message immediately
      setMessages((prevMessages) => [...prevMessages, userMessage]);
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
        
        setMessages((prevMessages) => [...prevMessages, aiResponse]);
      } catch (error) {
        console.error('Error getting AI response:', error);
        
        const errorResponse = {
          id: Date.now() + 1,
          text: "Sorry, I'm having trouble responding right now. Please try again later.",
          sender: "bot",
          timestamp: new Date(),
        };
        
        setMessages((prevMessages) => [...prevMessages, errorResponse]);
      } finally {
        setIsLoading(false);
      }
    }
  };
  const[messages,setMessages]=React.useState([
    {
      id : 1,
      text : "Hello! How can I assist you today?",
      sender : "bot",
      timestamp: new Date(),
    },
  ]);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }
  
  return (
    <div className={`flex flex-col h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <div className='flex-1 overflow-y-auto overscroll-contain p-3 sm:p-4 md:p-6 pb-2'>
        <div className='w-full max-w-none mx-auto space-y-3 sm:space-y-4'>
          {messages.map((message) => (
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
  )
}

export default App