# MERN E-commerce Dashboard

A full-stack E-commerce Dashboard built using the MERN stack (MongoDB, Express.js, React.js, Node.js).  
This application allows users to register, login, and manage products through a simple admin dashboard.

## Features

- User Registration & Login
- JWT Authentication
- Add Products
- View Product List
- Search Products
- Update Products
- Delete Products
- User-based Product Management
- MongoDB Database Integration
- REST API with Express.js

## Tech Stack

### Frontend
- React.js
- React Router DOM
- CSS / Bootstrap

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

## Project Structure


MERN-Ecommerce-Dashboard
│
├── frontend
│ ├── src
│ └── package.json
│
├── backend
│ ├── db
│ ├── routes
│ ├── models
│ ├── index.js
│ └── package.json
│
└── README.md


## Installation & Setup

### Clone Repository

```bash
git clone https://github.com/yourusername/mern-ecommerce-dashboard.git
Backend Setup
cd backend
npm install

Create a .env file and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run backend:

npm start
Frontend Setup

Open another terminal:

cd frontend
npm install
npm start
Screens
Authentication
Signup Page
Login Page
Dashboard
Product Listing
Add Product
Update Product
Delete Product
Search Product
API Features
Method	Endpoint	Description
POST	/register	Create new user
POST	/login	User login
POST	/add-product	Add product
GET	/products	Get products
PUT	/product/:id	Update product
DELETE	/product/:id	Delete product
Future Improvements
Shopping Cart
Order Management
Payment Integration
Product Images Upload
User Roles (Admin/User)
Author

Hanzala Khan

Frontend Developer | MERN Stack Developer