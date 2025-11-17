import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CartProvider } from './contexts/CartContext.tsx'
import './index.css'
import App from './App.tsx'
import { PaintsProvider } from './contexts/GetPaintContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <PaintsProvider>
        <App />
      </PaintsProvider>
    </CartProvider>
  </StrictMode>
);
