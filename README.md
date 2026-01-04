# Cosmatic Site

![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue?style=for-the-badge&logo=react)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

A full-stack e-commerce application built with the MERN stack (MongoDB, Express, React, Node.js).

**[Live Demo](https://glowify-hazel.vercel.app/)**

## 🚀 Features

- 🔐 **User Authentication**: Secure signup and login functionality using JWT.
- 🛍️ **Product Browsing**: specific categories and detailed product views.
- 🛒 **Shopping Cart**: Real-time cart management (add, remove, adjust quantities).
- 👨‍💼 **Admin Dashboard**: Comprehensive product management (CRUD operations).
- 📱 **Responsive Design**: Fully optimized for mobile, tablet, and desktop screens.
- 💳 **Payment Integration**: Secure payment processing placeholders.

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

### Backend
![NodeJS](https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)

## 💻 Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/sonukumarsaw12/Shopping_Full_Stack_website.git
    cd "Cosmatic Shop"
    ```

2.  **Install Frontend Dependencies:**
    ```bash
    cd frontend
    npm install
    ```

3.  **Install Backend Dependencies:**
    ```bash
    cd ../backend
    npm install
    ```

## ⚙️ Configuration

Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
# Add other necessary variables here (e.g., CLOUDINARY_URL, STRIPE_KEY)
```

(Optional) If required, create a `.env` file in the `frontend` directory for frontend-specific variables.

## 🏃‍♂️ Running the Application

1.  **Start the Backend Server:**
    ```bash
    cd backend
    npm run dev
    ```
    The server will start on `http://localhost:5000` (or your defined PORT).

2.  **Start the Frontend Development Server:**
    ```bash
    cd frontend
    npm run dev
    ```
    The application will run on the local URL provided by Vite (usually `http://localhost:5173`).

## 🗄️ Seeding Data (Optional)

To import sample data into the database:
```bash
cd backend
npm run data:import
```
To destroy data:
```bash
cd backend
npm run data:destroy
```
