import React, { useContext } from 'react';
import { CartContext } from '../Context/CartContext';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, removeItemCompletely, getFinalPrice } = useContext(CartContext);

  
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between mb-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
              <div className="flex-1 ml-4">
                <h3 className="text-lg">{item.name}</h3>
                <p>${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center">
                <button 
                  onClick={() => removeFromCart(item)} 
                  className="px-2 py-1 bg-gray-300 rounded"
                >
                  -
                </button>
                <span className="px-4">{item.quantity}</span>
                <button 
                  onClick={() => addToCart(item)} 
                  className="px-2 py-1 bg-gray-300 rounded"
                >
                  +
                </button>
                <button 
                  onClick={() => removeItemCompletely(item)}
                  className="ml-4 px-2 py-1 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-6 text-right">
            <h3 className="text-xl">Subtotal: ${calculateSubtotal().toFixed(2)}</h3>
            <h3 className="text-xl mt-2">Final Price (after 10% discount): ${getFinalPrice()}</h3>
          </div>
          <div className="mt-6 text-right">
            <button 
              className="px-4 py-2 bg-green-500 text-white rounded"
              
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
