import React, { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  useEffect(() => {
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        
        if (existingItem.quantity < 5) {
          return prevItems.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          toast(`You can't add more than 5 items of ${product.name}`, {
            icon: '🚫',
            style: {
              border: '1px solid #f44336',
              padding: '16px',
              color: '#f44336',
            },
          });
          return prevItems;
        }
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prevItems.filter(item => item.id !== product.id);
      }
    });
  };

  const removeItemCompletely = (product) => {
    setCartItems((prevItems) => {
      return prevItems.filter(item => item.id !== product.id);
    });
    toast.success(`${product.name} has been completely removed from cart!`, {
      style: {
        border: '1px solid #4caf50',
        padding: '16px',
        color: '#4caf50',
      },
    });
  };

  const getFinalPrice = () => {
    const subtotal = calculateSubtotal();
    const discount = 0.10; 
    return (subtotal * (1 - discount)).toFixed(2);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, removeItemCompletely, getFinalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
