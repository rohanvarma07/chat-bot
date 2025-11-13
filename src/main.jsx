import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import App from './App.jsx'
import NotFound from './Components/NotFound.jsx'

// Theme-aware 404 component
function ThemedNotFound() {
  // Detect dark mode from localStorage or system preference
  const getDarkMode = () => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      return savedDarkMode === 'true';
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  return <NotFound darkMode={getDarkMode()} />;
}

// Function to hide loading screen
const hideLoadingScreen = () => {
  const loadingScreen = document.getElementById('loading-screen');
  const root = document.getElementById('root');
  
  if (loadingScreen && root) {
    loadingScreen.classList.add('hidden');
    root.classList.add('loaded');
    
    // Remove loading screen after animation
    setTimeout(() => {
      if (loadingScreen) {
        loadingScreen.remove();
      }
    }, 500);
  }
};

// Create root and render app with routing
const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="*" element={<ThemedNotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

// Hide loading screen after React app has rendered
// This ensures the loading screen stays until the app is fully ready
setTimeout(() => {
  hideLoadingScreen();
}, 100);
