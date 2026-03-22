 Apni Shop — Full Stack E-Commerce Application

A fully functional e-commerce web application built with *React*, *Redux*, and *JSON Server*. It includes a complete user-facing shopping experience and a powerful admin panel for managing the entire store.


##  About the Project

Apni Shop is a complete e-commerce platform where users can browse products, manage their cart, place orders, and track order history — all through a clean and responsive interface. The project also includes a fully functional Admin Panel that allows administrators to manage products, categories, users, and settings from a centralized dashboard.

The backend is powered by *JSON Server*, which acts as a mock REST API for rapid development and prototyping.

---

##  Features

###  User Panel

- *Authentication* — Signup and Login system with form validation
- *Product Browsing* — View all products with search and filter options
- *Shopping Cart* — Add to cart, update quantity, remove items
- *Checkout* — Seamless checkout flow with order placement
- *Order History* — View all past orders with status tracking
- *User Profile* — View and manage personal profile
- *Address Management* — Add, update, and delete delivery addresses

###  Admin Panel

- Dashboard — Overview of store activity and user signups
- Product Management — Add, edit, and delete products
- Category Management — Manage main categories and subcategories
- User Management — View all registered users
- Features & Settings — Control store features and global settings
- Full CRUD — Complete Create, Read, Update, Delete on all entities

---

##  Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | HTML, CSS, JavaScript, React        |
| State Mgmt | Redux / Redux Toolkit               |
| Backend    | JSON Server (Mock REST API)         |
| Routing    | React Router DOM                    |
| Styling    | CSS / CSS Modules                   |

---

##  Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- npm or yarn

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/amitshukla0812/Apni-Shop.git
cd Apni-Shop
```

**2. Install dependencies**
```bash
npm install
```

**3. Start JSON Server (Backend)**
```bash
npx json-server --watch db.json --port 3001
```

**4. Start the React App (Frontend)**
```bash
npm start
```

**5. Open in browser**
```
http://localhost:8000
```

