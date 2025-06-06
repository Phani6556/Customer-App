
const dotenv = require('dotenv');
const MenuItem = require('./models/MenuItem');
const connectDB = require('./config/db');

dotenv.config();
connectDB();


const seedMenu = async () => {
  


  await MenuItem.deleteMany();

  await MenuItem.insertMany([
   { name: 'Coke', price: 50, category: 'Drink',image: 'coke.jpg' },
    { name: 'Pepsi', price: 50, category: 'Drink' ,image: 'pepsi.jpg'},
    { name: 'Sprite', price: 50, category: 'Drink' ,image: 'sprite.jpg'},
    { name: 'Coffee', price: 80, category: 'Drink' ,image: 'coffee.jpg'},
    { name: 'Veg Burger', price: 100, category: 'Burger', image: 'veg.jpg' },
    { name: 'Chicken Burger', price: 150, category: 'Burger', image: 'chicken.jpg' },
    { name: 'Lamb Burger', price: 200, category: 'Burger', image: 'lamb.jpg' },
    { name: 'Double Patty Burger', price: 200, category: 'Burger', image: 'double.jpg' },
    { name: 'Pepperoni', price: 250, category: 'Pizza' ,image: 'pepperoni.jpg' },
    { name: 'Marinara', price: 150, category: 'Pizza' ,image: 'marinara.jpg'},
    { name: 'Capricciosa', price: 200, category: 'Pizza' ,image: 'capricciosa.jpg' },
    { name: 'Sicilian', price: 220, category: 'Pizza' ,image: 'sicilian.jpg' },
    { name: 'French Fries', price: 70, category: 'French Fries' ,image: 'french.jpg'},
     { name: 'Peri Peri French Fries', price: 90, category: 'French Fries' ,image: 'peri.jpg'},
    { name: 'Salad Bowl', price: 80, category: 'Veggies', image: 'salad.jpg' },
    { name: 'Tandoori Salad Bowl', price: 120, category: 'Veggies', image: 'tandoori.jpg' }
  ]);

  console.log('Menu seeded');
  process.exit();
};

seedMenu();
