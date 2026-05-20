import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-right"
      richColors
      closeButton
      toastOptions={{
        style: {
          background: '#ffffff',
          border: '1px solid rgba(26, 36, 32, 0.12)',
          color: '#1a2420',
          boxShadow: '0 8px 24px rgba(26, 36, 32, 0.08)',
        },
        classNames: {
          error: '!border-red-300 !bg-red-50 !text-red-950',
        },
      }}
    />
  </StrictMode>,
)
