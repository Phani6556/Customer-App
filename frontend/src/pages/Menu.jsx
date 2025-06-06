// Menu.js (React Frontend)
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CategoryTabs from '../components/CategoryTabs';
import MenuItemCard from '../components/MenuItemCard';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { io } from 'socket.io-client';
import '../styles/Menu.css';

const socket = io('http://localhost:5055'); 

const importAll = (r) => {
  let images = {};
  r.keys().forEach((key) => {
    const fileName = key.replace('./', '');
    images[fileName] = r(key);
  });
  return images;
};
const images = importAll(require.context('../assets', false, /\.(png|jpe?g|svg)$/));

function Menu() {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Pizza');
  const { cart } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5055/api/menu')
      .then((res) => setItems(res.data))
      .catch((err) => console.error('Menu fetch error:', err));
  }, []);

  useEffect(() => {
    socket.on('orderUpdate', (order) => {
      console.log('Order update received:', order);
    });
    return () => socket.off('orderUpdate');
  }, []);

  const handleNext = () => {
    if (cart.length === 0) {
      alert('Please add at least one item to your cart before proceeding.');
    } else {
      navigate('/checkout');
    }
  };

  const filteredItems = searchQuery
    ? items.filter((i) =>
        i.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : items.filter((i) => i.category === selectedCategory);

  return (
    <div className="menu-container">
      <h2>Good evening</h2>
      <p>Place your order here</p>
      <input
        type="text"
        placeholder="🔍 Search"
        className="search-bar"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <CategoryTabs selected={selectedCategory} onSelect={setSelectedCategory} />
      <h3>{selectedCategory}</h3>
      <div className="item-grid">
        {filteredItems.map((item) => (
          <MenuItemCard
            key={item._id}
            item={item}
            image={images[item.image] || images['default.jpg']}
          />
        ))}
      </div>
      <button className="next-button" onClick={handleNext} >
        Next
      </button>
    </div>
  );
}

export default Menu;
