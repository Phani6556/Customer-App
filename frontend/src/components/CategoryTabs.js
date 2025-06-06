import React from 'react';
import '../styles/CategoryTabs.css';

const importAll = (r) => {
  let images = {};
  r.keys().forEach((key) => {
    const fileName = key.replace('./', '');
    images[fileName] = r(key);
  });
  return images;
};

const icons = importAll(require.context('../assets', false, /\.(png|jpe?g|svg)$/));

const categories = [
  { name: 'Drink', icon: 'Drink.jpg' },
  { name: 'Burger', icon: 'Burger.jpg' },
  { name: 'Pizza', icon: 'Pizza.jpg' },
  { name: 'French Fries', icon: 'French1.jpg' },
  { name: 'Veggies', icon: 'Veggies.jpg' },
];

const CategoryTabs = ({ selected, onSelect }) => (
  <div className="category-buttons">
    {categories.map(({ name, icon }) => (
      <button
        key={name}
        onClick={() => onSelect(name)}
        className={`category-button ${selected === name ? 'active' : ''}`}
      >
        <img src={icons[icon]} alt={name} className="category-icon" />
        <span>{name}</span>
      </button>
    ))}
  </div>
);

export default CategoryTabs;
