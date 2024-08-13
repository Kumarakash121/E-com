import React, { useContext, useEffect, useState } from 'react';
import ProductCard from '../Components/ProductCard';
import { CartContext } from '../Context/CartContext';
import products from '../products.json';

const ProductList = () => {

  const [productList, setProductList] = useState([]);
  const { cartItems, addToCart,removeFromCart } = useContext(CartContext);

  const getQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };
  useEffect(() => {
    setProductList(products);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {productList.map((product) => (
    <ProductCard key={product.id} product={product} addToCart={addToCart} removeFromCart={removeFromCart} quantity={getQuantity(product.id)}/>
      ))}
    </div>
  );
};

export default ProductList;
