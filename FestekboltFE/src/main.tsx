import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CartProvider } from './contexts/CartContext.tsx'
import './index.css'
import App from './App.tsx'
import { PaintsProvider } from './contexts/GetPaintContext.tsx'
import { FiltersProvider } from './contexts/FilterContext.tsx'
import { usePaints } from './contexts/GetPaintContext.tsx'
import { NotificationProvider } from './contexts/NotificationContext.tsx'
import { ToastNotification } from './components/toastNotification/ToastNotification.tsx'

function WithFilters() {
  const { maxPrice, minPrice } = usePaints();
  return (
    <FiltersProvider maxPrice={maxPrice} minPrice={minPrice}>
      <App />
    </FiltersProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NotificationProvider>
      <CartProvider>
        <PaintsProvider>
          <WithFilters/>
        </PaintsProvider>
      </CartProvider>
      <ToastNotification />
    </NotificationProvider>
  </StrictMode>
);
