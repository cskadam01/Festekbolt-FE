import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import './App.css'
import { Home } from './pages/home/Home'
import { Product } from "./pages/product/Product";


function App() {


  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/products" element={<Product />} />
      </Routes>
    </Router>
  )
}

export default App
