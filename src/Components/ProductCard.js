import React, { useContext } from 'react';
import { WishlistContext } from '../Context/WishlistContext'; // Adjust the path as necessary

const ProductCard = ({ product, addToCart, removeFromCart, quantity }) => {
  const { addToWishlist, isInWishlist } = useContext(WishlistContext);

  const handleWishlistClick = () => {
    addToWishlist(product);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col relative">
      
      {product.discount && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
          {product.discount} OFF
        </span>
      )}

      
      <div className="w-full h-48 flex items-center justify-center bg-gray-100">
        <img 
          src={product.image || '/path/to/fallback-image.jpg'} 
          alt={product.name} 
          className="h-full object-contain"
        />
      </div>

      
      <div className="p-4 flex-1 flex flex-col">
        
        <div className="flex flex-col mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {product.name}
          </h3>
          <p className="text-gray-800 text-lg font-semibold">
            ${product.price.toFixed(2)}
          </p>
        </div>

       

        
        <p className="text-gray-600 mb-4 text-sm">
          {product.description}
        </p>

        {/* Category */}
        {product.category && (
          <div className="mb-4">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
              {product.category}
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          {/* Quantity Controls */}
          {quantity > 0 ? (
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => removeFromCart(product)} 
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300"
                disabled={quantity <= 0}
              >
                -
              </button>
              <span className="text-lg font-medium">{quantity}</span>
              <button 
                onClick={() => addToCart(product)} 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
              >
                +
              </button>
            </div>
          ) : (
            <button 
              onClick={() => addToCart(product)} 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
            >
              Add to Cart
            </button>
          )}

          
          <button 
            onClick={handleWishlistClick} 
            className={`px-4 py-2 rounded transition-colors duration-300 ${isInWishlist(product.id) ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-800'}`}
          >
            {isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
