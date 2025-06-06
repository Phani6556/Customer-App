# 🍽️ Restaurant Ordering System

A full-stack restaurant ordering system with a customer-facing web app for placing orders and a backend API supporting real-time updates and order management.

## 🔧 Tech Stack

### Frontend:
- React (with Context API for cart)
- Axios (for API calls)
- Socket.io-client
- Vanilla CSS
- React Router
- React Toastify (notifications)

### Backend:
- Node.js + Express
- MongoDB (Mongoose)
- Socket.io (real-time table and order updates)

## 📁 Project Structure (Frontend)

/frontend
├── public/
├── src/
│ ├── assets/ # Static images (menu items)
│ ├── components/ # CategoryTabs, MenuItemCard
│ ├── context/ # CartContext.js
│ ├── styles/ # CSS files
│ ├── pages/
│ │ ├── Menu.js
│ │ └── Checkout.js
│ ├── App.js
│ └── index.js

Install dependencies

Backend: 
  #  cd server
  #  npm install

Frontend:
   # cd client
   # npm install

Start the backend (Port: 5055)
 # cd Backend
 # node seedMenu.js
 # node server.js

Start the frontend (Port: 3000)
 # cd frontend
 # npm start

 ⚠️ Make sure MongoDB is running on mongodb://localhost:27017/restaurant.

Real-time Features (Socket.io):

When a Dine In order is selected, the client emits requestTable, and the server assigns a table and emits tableAssigned.
Order confirmation is emitted with newOrder, which can be handled on the dashboard (if connected) 

Features:-
Menu Page:
Category tabs to filter items

Live search bar

Menu item cards with + button

"Next" button to go to Checkout

Checkout Page:
Searchable cart with quantity update and remove option

Toggle for Dine In / Take Away

Auto-table assignment for Dine In

Cooking instruction popup

Phone number validation (10 digits)

Toast notifications on order confirmation

APIs Used
GET /api/menu
Returns all menu items.

POST /api/orders
Places an order with customer, type, items, total, and cooking notes.


