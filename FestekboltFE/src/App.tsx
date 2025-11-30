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
import { Faq } from "./pages/faq/Faq";
import { About } from "./pages/about/About";
import { Connect } from "./pages/connect/Connect";
import { Register } from "./pages/register/register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products/:takenId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/faq" element={<Faq />} />
        <Route path="/about" element={<About />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </Router>
  )
}

export default App
