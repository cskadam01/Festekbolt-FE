import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import './App.css'
import { Home } from './pages/home/Home'
import { Product } from "./pages/product/Product";
import { ProductDetail } from "./pages/productDetail/ProductDetail";



function App() {


  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products/:takenId" element={<ProductDetail />} />
      </Routes>
    </Router>
  )
}

export default App
