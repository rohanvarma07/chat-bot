# Intelligent Chat Bot

A modern, responsive AI-powered chat bot built with React, Vite, and Google's Gemini AI.

## Features

- 🤖 **AI-Powered Conversations** - Powered by Google Gemini 2.5 Flash
- 🌙 **Dark/Light Mode** - Toggle between themes
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- ⚡ **Fast Performance** - Built with Vite for optimal speed
- 💬 **Real-time Chat** - Instant message responses
- 🎨 **Modern UI** - Clean, professional interface

## Project Structure

```
chat-bot/
├── src/
│   ├── Components/
│   │   ├── Header.jsx          # Header with dark mode toggle
│   │   ├── ChatMessages.jsx    # Message display component
│   │   ├── ChatInput.jsx       # Message input component
│   │   └── LoadingIndicator.jsx # Typing indicator
│   ├── services/
│   │   └── geminiService.js    # Gemini API integration
│   ├── Utils/
│   │   └── chatUtil.jsx        # Utility functions
│   ├── App.jsx                 # Main app component
│   └── main.jsx               # Entry point
├── .env                       # Environment variables (not in git)
├── .env.example              # Environment variables template
└── package.json             # Dependencies
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Google Gemini API key

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   Copy `.env.example` to `.env` and add your Gemini API key:
   ```
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Deployment

The app works on any static hosting service:
1. Build with `npm run build`
2. Upload the `dist/` folder
3. Set the `VITE_GEMINI_API_KEY` environment variable

## Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server  
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Google Gemini AI** - AI responses
