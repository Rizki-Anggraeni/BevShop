# 🚀 Quick Start Guide

## ✅ Installation Complete!

Both backend and frontend dependencies are installed. Here's what's configured:

### Backend Setup
- ✅ Node modules installed (442 packages)
- ✅ `.env` file created with defaults
- ✅ Express server configured on port 5000
- ✅ MongoDB connection configured

### Frontend Setup
- ✅ Node modules installed (401 packages)
- ✅ `.env.local` file exists
- ✅ Next.js configured on port 3000
- ✅ Tailwind CSS v3 ready

## 🎯 Prerequisites Before Running

### 1. MongoDB Setup
You need MongoDB running locally or MongoDB Atlas:

**Option A: Local MongoDB**
```powershell
# If installed locally, MongoDB should be running
# Check: mongosh
# If not installed, get it from https://www.mongodb.com/try/download/community
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string
5. Update `.env` file: `MONGODB_URI=your_atlas_connection_string`

### 2. Node.js & npm
```powershell
node --version  # Should be v14+
npm --version   # Should be v6+
```

## 🚀 Running the Application

### Terminal 1 - Start Backend
```powershell
cd backend
npm run dev
```
You should see:
```
Server running on port 5000
MongoDB Connected: localhost
```

### Terminal 2 - Start Frontend
```powershell
cd frontend
npm run dev
```
You should see:
```
  ▲ Next.js 14.0
  - Local:        http://localhost:3000
```

### Terminal 3 - Open Browser
```
http://localhost:3000
```

## 📋 Application Features to Test

1. **Register** - Create a new account
   - Go to: http://localhost:3000/auth/register
   - Fill in email, password
   - Click "Sign Up"

2. **Login** - Sign in with your account
   - Go to: http://localhost:3000/auth/login
   - Enter credentials
   - Click "Sign In"

3. **Browse Products** - See beverage catalog
   - Go to: http://localhost:3000
   - Filter by category
   - Search products

4. **Shopping Cart** - Add items and checkout
   - Click "Add to Cart" on any product
   - Go to: http://localhost:3000/cart
   - Adjust quantities
   - Proceed to checkout

5. **Orders** - View order history
   - After checkout, go to: http://localhost:3000/orders
   - See all your orders and status

6. **Profile** - Manage your account
   - Go to: http://localhost:3000/profile
   - Edit profile information

## 🔧 Configuration

### Backend .env
Located at: `backend/.env`
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/beverage-ecommerce
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

### Frontend .env.local
Located at: `frontend/.env.local`
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

## 🐛 Troubleshooting

### Backend won't start
```
Error: connect ECONNREFUSED 127.0.0.1:27017
→ MongoDB is not running. Start MongoDB first
```

### Frontend can't connect to backend
```
Error: API call failed
→ Check backend is running on port 5000
→ Check CORS_ORIGIN in .env matches frontend URL
```

### Port already in use
```bash
# Find process on port 5000
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess

# Kill the process
Stop-Process -Id <PID> -Force
```

## 📚 Documentation

- **README.md** - Project overview
- **SETUP_GUIDE.md** - Detailed installation guide
- **ARCHITECTURE.md** - System design & database schemas
- **DEVELOPMENT.md** - Coding standards & best practices
- **COMPLETION_SUMMARY.md** - What's been built

## ✨ API Endpoints

```
GET    /api/health              - Health check
POST   /api/auth/register       - Register user
POST   /api/auth/login          - Login user
GET    /api/auth/profile        - Get user profile
PUT    /api/auth/profile        - Update profile

GET    /api/products            - Get all products
GET    /api/products/:id        - Get single product

GET    /api/cart                - Get cart
POST   /api/cart/add            - Add to cart
PUT    /api/cart/update         - Update cart item
POST   /api/cart/remove         - Remove from cart
DELETE /api/cart/clear          - Clear cart

POST   /api/orders              - Create order
GET    /api/orders/my-orders    - Get user orders
GET    /api/orders/:id          - Get order details

POST   /api/reviews             - Create review
GET    /api/reviews/product/:id - Get product reviews
```

## 🎉 You're Ready!

Your e-commerce application is fully configured and ready to run.

**Happy coding! 🚀**

---
Created: December 3, 2025
Last Updated: After npm install
