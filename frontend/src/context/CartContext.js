import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i._id === item._id);
      if (existing) {
        return prev.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
     setCart((prev) =>
      prev
        .map((i) =>
          i._id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        )
      .filter((i) => i.quantity > 0)
    );
  };

 const clearCart = () => {
   setCart([]);
 };

 const removeCart = (itemId) => {
   setCart((prev) => {
      if (prev.length === 1 && prev[0]._id === itemId) {
       alert('⚠️ You need at least one item to place an order!');
       return prev; 
      }
    
     return prev
      .map((i) => (i._id === itemId ? { ...i, quantity: 0 } : i))
      .filter((i) => i.quantity > 0);
    });
  };

  const updateQuantity = (itemId, newQty) => {
    if (newQty > 0) {
      setCart((prev) =>
        prev.map((item) =>
          item._id === itemId ? { ...item, quantity: newQty } : item
        )
      );
    } 
    
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity,removeCart,clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
