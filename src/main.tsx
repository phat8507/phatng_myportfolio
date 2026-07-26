import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ViewModeProvider } from './lib/view-mode.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ViewModeProvider>
      <App />
    </ViewModeProvider>
  </StrictMode>,
)
