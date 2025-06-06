import React, { useState, useRef, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { io } from 'socket.io-client';
import 'react-toastify/dist/ReactToastify.css';

import '../styles/Checkout.css';

const Checkout = () => {
  const { cart, removeCart, updateQuantity ,clearCart} = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [orderType, setOrderType] = useState('Dine In');
  const [cookingNote, setCookingNote] = useState('');
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [searchTerm,  setSearchTerm] = useState('');
  const [tableNumber, setTableNumber] = useState(null);

  const navigate = useNavigate();

  const nameRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
 
  

  useEffect(() => {
    nameRef.current?.focus();
  }, []);
 useEffect(() => {
  const socket = io('http://localhost:5055');

  if (orderType === 'Dine In') {
    socket.emit('requestTable');
  }

  socket.on('tableAssigned', ({ tableNumber }) => {
    console.log(`🚀 Table ${tableNumber} assigned!`);
    setTableNumber(tableNumber);
  });

  return () => socket.disconnect();
  }, [orderType]);



  const itemTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryCharge = orderType === 'Take Away' ? 50 : 0;
  const tax = Math.round(itemTotal * 0.05);
  const grandTotal = itemTotal + deliveryCharge + tax;

  const isValidPhone = /^\d{10}$/.test(phone);

 const handleOrder = async () => {
    const order = {
      type: orderType,
      items: cart,
      total: cart.reduce((total, item) => total + item.price * item.quantity, 0),
      tableNumber: orderType === 'Dine In' ? tableNumber : null,
      customer: { name, phone, address: orderType === 'Take Away' ? address : '' },
      cookingInstructions: cookingNote
    };
      console.log('🛒 Submitting order:', order); 
    try {
      const res = await fetch('http://localhost:5055/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });

      if (res.ok) {
        toast.success('✅ Order Confirmed!');
        clearCart();
        setTimeout(() => navigate('/'), 2000);
      } else {
        const errorData = await res.json();
        toast.error(`❌ ${errorData.message || 'Order failed. Please try again.'}`);
      }
    } catch (err) {
      console.error(err);
      toast.error('⚠️ An error occurred while placing the order.');
    }
  };


  return (
    <div className="checkout-container">
      <button className="back-button" onClick={() => navigate('/')}>
        &larr;
      </button>
      <h2>Good evening</h2>
      <p>Place your order here</p>
      <input
         className="search-bar"
         type="text"
         placeholder=" Search"
         value={searchTerm}
         onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
      />
 
      {cart
          .filter(item => item.name.toLowerCase().includes(searchTerm))
          .map(item => (
       <div className="cart-item" key={item._id}>
          <img src={require(`../assets/${item.image}`)} alt={item.name} />
         <div className="item-info">
           <h4>{item.name}</h4>
           <p>₹ {item.price}</p>
           <div className="qty-controls">
             <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
             <span>{item.quantity}</span>
             <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
           </div>
         </div>
          <button className="remove-btn" onClick={() => removeCart(item._id)}>✖</button>
       </div>
     ))}


      <div className="toggle-options">
        <button
          className={orderType === 'Dine In' ? 'active' : ''}
          onClick={() => setOrderType('Dine In')}
        >
          Dine In
        </button>
        <button
          className={orderType === 'Take Away' ? 'active' : ''}
          onClick={() => setOrderType('Take Away')}
        >
          Take Away
        </button>
     </div>

      <div className="summary">
        <div className="summary-row">
          <span>Item Total</span>
          <span>₹{itemTotal.toFixed(2)}</span>
        </div>
        {orderType === 'Take Away' && (
          <div className="summary-row">
            <span>Delivery Charge</span>
            <span>₹{deliveryCharge.toFixed(2)}</span>
          </div>
        )}
        <div className="summary-row">
          <span>Taxes</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>
        <div className="summary-row total">
          <span>Grand Total</span>
          <span>₹{grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className="customer-details">
        <p><strong>Your details</strong></p>
        <input
              ref={nameRef}
              type="text"
              placeholder="Enter your name"
             value={name}
             onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  phoneRef.current?.focus();
                }
              }}
         className="customer-input"
        />

       <input
         ref={phoneRef}
          type="text"
          placeholder="Enter your phone number"
           value={phone}
          onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '').slice(0, 10);
              setPhone(val);
          }}
          onKeyDown={(e) => {
             if (e.key === 'Enter' && orderType === 'Take Away') {
             addressRef.current?.focus();
             }
          }}
          className="customer-input"
        />

        {orderType === 'Take Away' && (
  <>
    <input
      ref={addressRef}
      type="text"
      placeholder="Enter delivery address"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
      onKeyDown={(e) => {
          if (e.key === 'Enter') {
            document.querySelector('.note-popup-button')?.focus(); 
          }
        }}
         className="customer-input"
      />
       {address && <div className="time">⏱ Delivery in 42 mins</div>}
      </>
         )}

      </div>

           <button className="note-popup-button" onClick={() => setShowNoteModal(true)}>
            Add Cooking Instructions
           </button>

      <div className="swipe-button">
        <button
          disabled={!name || !isValidPhone || (orderType === 'Take Away' && !address) || cart.length === 0}

          onClick={handleOrder}
        >
          &rarr; Swipe to Order
        </button>
      </div>

      {showNoteModal && (
        <div className="note-modal-overlay">
          <div className="note-modal">
            <button className="close-button" onClick={() => setShowNoteModal(false)}>×</button>
            <h3>Add Cooking Instructions</h3>
            <textarea
              value={cookingNote}
              onChange={(e) => setCookingNote(e.target.value)}
              placeholder="e.g., No onions, extra spicy..."
              rows={4}
            />
            <p className="note-disclaimer">
              The restaurant will try its best to follow your request. However, refunds or cancellations in this regard won’t be possible.
            </p>
            <div className="modal-actions">
              <button onClick={() => setShowNoteModal(false)}>Cancel</button>
              <button onClick={() => setShowNoteModal(false)}>Next</button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer
  position="top-center"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  pauseOnHover
  draggable
  theme="colored"
/>

    </div>
  );
};

export default Checkout;
