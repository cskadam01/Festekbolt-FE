import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CartProvider } from './contexts/CartContext.tsx'
import './index.css'
import App from './App.tsx'
import { PaintsProvider } from './contexts/GetPaintContext.tsx'
import { FiltersProvider } from './contexts/FilterContext.tsx'
import { usePaints } from './contexts/GetPaintContext.tsx'

function WithFilters() {
  const { maxPrice, minPrice } = usePaints();         // itt jutunk hozzá a számolt maxhoz
  return (
    <FiltersProvider maxPrice={maxPrice} minPrice={minPrice}>   {/* átadjuk propként */}
      <App />
    </FiltersProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <PaintsProvider>
        <WithFilters/>
      </PaintsProvider>
    </CartProvider>
  </StrictMode>
);
