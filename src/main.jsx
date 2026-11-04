import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { PreferencesProvider } from './context/Preferences'
import './styles/tokens.css'
import './styles/global.css'
import './styles/animations.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PreferencesProvider>
      {/* Menambahkan properti future di sini */}
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </BrowserRouter>
    </PreferencesProvider>
  </React.StrictMode>
)