import React from 'react';
import { useCart } from '../context/CartContext';

const CartOverview = () => {
  const { cart } = useCart();
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const delivery = 30;
  const tax = subtotal * 0.05;
  const grandTotal = subtotal + delivery + tax;

  return (
    <div className="cart-overview">
      <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
      <p>Delivery: ₹{delivery.toFixed(2)}</p>
      <p>Tax: ₹{tax.toFixed(2)}</p>
      <h4>Total: ₹{grandTotal.toFixed(2)}</h4>
    </div>
  );
};

export default CartOverview;