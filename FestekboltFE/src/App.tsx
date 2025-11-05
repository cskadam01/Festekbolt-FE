import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import './App.css'
import { Home } from './pages/home/Home'
import { Product } from "./pages/product/Product";
import { ProductDetail } from "./pages/productDetail/ProductDetail";
import { Cart } from "./pages/cart/Cart";
import { Login } from "./pages/login/Login";



function App() {


  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products/:takenId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </Router>
  )
}

export default App
