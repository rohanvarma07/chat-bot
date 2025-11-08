// Chat session management utilities

const STORAGE_KEY = 'chatbot_sessions';

// Generate a unique ID for chat sessions
export const generateChatId = () => {
    return `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Create a new chat session
export const createNewChatSession = (title = null) => {
    const now = new Date().toISOString();
    return {
        id: generateChatId(),
        title: title || `Chat ${new Date().toLocaleDateString()}`,
        messages: [
            {
                id: 1,
                text: "Hello! How can I assist you today?",
                sender: "bot",
                timestamp: new Date(),
            }
        ],
        createdAt: now,
        updatedAt: now,
        lastMessage: "Hello! How can I assist you today?"
    };
};

// Load chat sessions from localStorage
export const loadChatSessions = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const sessions = JSON.parse(stored);
            // Convert timestamp strings back to Date objects
            return sessions.map(session => ({
                ...session,
                messages: session.messages.map(msg => ({
                    ...msg,
                    timestamp: new Date(msg.timestamp)
                }))
            }));
        }
    } catch (error) {
        console.error('Error loading chat sessions:', error);
    }
    
    // Return default session if none exists
    const defaultSession = createNewChatSession('Welcome Chat');
    return [defaultSession];
};

// Save chat sessions to localStorage
export const saveChatSessions = (sessions) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch (error) {
        console.error('Error saving chat sessions:', error);
    }
};

// Update a specific chat session
export const updateChatSession = (sessions, chatId, updates) => {
    return sessions.map(session => 
        session.id === chatId 
            ? { 
                ...session, 
                ...updates, 
                updatedAt: new Date().toISOString() 
              }
            : session
    );
};

// Add a message to a chat session
export const addMessageToChat = (sessions, chatId, message) => {
    return sessions.map(session => {
        if (session.id === chatId) {
            const updatedMessages = [...session.messages, message];
            return {
                ...session,
                messages: updatedMessages,
                updatedAt: new Date().toISOString(),
                lastMessage: message.text?.substring(0, 50) + (message.text?.length > 50 ? '...' : '')
            };
        }
        return session;
    });
};

// Delete a chat session
export const deleteChatSession = (sessions, chatId) => {
    return sessions.filter(session => session.id !== chatId);
};

// Rename a chat session
export const renameChatSession = (sessions, chatId, newTitle) => {
    return sessions.map(session => 
        session.id === chatId 
            ? { 
                ...session, 
                title: newTitle,
                updatedAt: new Date().toISOString() 
              }
            : session
    );
};

// Get a specific chat session
export const getChatSession = (sessions, chatId) => {
    return sessions.find(session => session.id === chatId);
};

// Generate automatic title based on first user message
export const generateAutoTitle = (firstUserMessage) => {
    if (!firstUserMessage) return 'New Chat';
    
    // Take first few words and capitalize
    const words = firstUserMessage.trim().split(' ').slice(0, 4);
    return words.join(' ').substring(0, 30) + (firstUserMessage.length > 30 ? '...' : '');
};
