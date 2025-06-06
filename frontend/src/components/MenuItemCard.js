import React from 'react';
import { useCart } from '../context/CartContext';

const MenuItemCard = ({ item, image }) => {
  const { cart, addToCart, removeFromCart } = useCart();
  const quantity = cart.find((i) => i._id === item._id)?.quantity || 0;

  const handleRemove = () => {
    if (quantity > 0) {
      removeFromCart(item._id);
    }
  };

  return (
    <div className="item-card">
      {item.image && (
        <img src={image} alt={item.name} className="item-image" />
      )}
      <div className="item-details">
        <strong>{item.name}</strong><br />
        ₹{item.price}<br />
        <div className="item-controls">
          <button onClick={handleRemove} disabled={quantity === 0}>-</button>
          <span>{quantity}</span>
          <button onClick={() => addToCart(item)}>+</button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
