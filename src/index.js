import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Toaster } from 'react-hot-toast';
import { WishlistProvider } from './Context/WishlistContext';
import { CartProvider } from './Context/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <WishlistProvider>
  <CartProvider>
    <Toaster />
    <App />
  </CartProvider>
  </WishlistProvider>
);

