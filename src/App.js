import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductList from './Pages/ProductList';
import Cart from './Pages/Cart';
import { CartContext } from './Context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const { cartItems } = useContext(CartContext);

  
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Router>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-lg font-semibold">
            E-Commerce
          </Link>
          <Link to="/cart" className="flex items-center text-white text-lg">
            <div className="relative flex items-center">
           
              <FontAwesomeIcon 
                icon={faShoppingCart} 
                className="text-2xl cursor-pointer" 
                style={{ color: 'green' }} 
              />
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </div>
            
          </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
};

export default App;
