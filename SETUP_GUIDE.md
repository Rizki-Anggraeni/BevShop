# Beverage E-Commerce Application - Setup Guide

Panduan lengkap untuk setup dan menjalankan aplikasi e-commerce minuman yang dibangun dengan Next.js, Express.js, MongoDB, dan Tailwind CSS v3.

## 📋 Daftar Isi
- [Prerequisites](#prerequisites)
- [Instalasi Backend](#instalasi-backend)
- [Instalasi Frontend](#instalasi-frontend)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [Struktur Folder](#struktur-folder)
- [Fitur Aplikasi](#fitur-aplikasi)
- [API Documentation](#api-documentation)

## 🔧 Prerequisites

Pastikan sudah terinstall:
- **Node.js** >= 16.x ([Download](https://nodejs.org/))
- **npm** >= 7.x atau **yarn**
- **MongoDB** ([Local](https://www.mongodb.com/try/download/community) atau [Atlas Cloud](https://www.mongodb.com/cloud/atlas))
- **Git**
- **Visual Studio Code** (recommended)

### Verifikasi Instalasi

```bash
node --version   # Should be >= v16.0.0
npm --version    # Should be >= 7.0.0
```

## 📦 Instalasi Backend

### 1. Navigasi ke folder backend

```bash
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Salin file `.env.example` ke `.env`:

```bash
cp .env.example .env
```

Buka file `.env` dan update konfigurasi:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/beverage-ecommerce
JWT_SECRET=your_super_secret_key_change_this
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
CLOUDINARY_CLOUD_NAME=optional_cloudinary_name
CLOUDINARY_API_KEY=optional_cloudinary_key
CLOUDINARY_API_SECRET=optional_cloudinary_secret
```

### 4. Mulai development server

```bash
npm run dev
```

Server akan berjalan di `http://localhost:5000`

Verifikasi dengan mengakses: `http://localhost:5000/api/health`

## 📦 Instalasi Frontend

### 1. Navigasi ke folder frontend

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Salin file `.env.example` ke `.env.local`:

```bash
cp .env.example .env.local
```

Default sudah menunjuk ke `http://localhost:5000/api`, jika berbeda update:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Mulai development server

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

## 🚀 Menjalankan Aplikasi

### Terminal 1: Backend

```bash
cd backend
npm run dev
# Output: Server running on port 5000
```

### Terminal 2: Frontend

```bash
cd frontend
npm run dev
# Output: ▲ Next.js 14.0.0
#        - ready started server on 0.0.0.0:3000
```

Akses aplikasi di browser: `http://localhost:3000`

## 📁 Struktur Folder

```
Lopartech/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js           # MongoDB configuration
│   │   ├── models/
│   │   │   ├── User.js              # User schema
│   │   │   ├── Product.js           # Product schema
│   │   │   ├── Cart.js              # Cart schema
│   │   │   ├── Order.js             # Order schema
│   │   │   └── Review.js            # Review schema
│   │   ├── controllers/
│   │   │   ├── authController.js    # Auth logic
│   │   │   ├── productController.js # Product logic
│   │   │   ├── cartController.js    # Cart logic
│   │   │   ├── orderController.js   # Order logic
│   │   │   └── reviewController.js  # Review logic
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── productRoutes.js
│   │   │   ├── cartRoutes.js
│   │   │   ├── orderRoutes.js
│   │   │   └── reviewRoutes.js
│   │   ├── middleware/
│   │   │   ├── auth.js              # JWT authentication
│   │   │   └── errorHandler.js      # Error handling
│   │   ├── utils/
│   │   │   └── helpers.js           # Utility functions
│   │   └── server.js                # Entry point
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── layout.tsx            # Root layout
    │   │   ├── page.tsx              # Home page
    │   │   ├── auth/
    │   │   │   ├── login/page.tsx
    │   │   │   └── register/page.tsx
    │   │   ├── products/
    │   │   ├── cart/page.tsx
    │   │   ├── orders/page.tsx
    │   │   └── profile/page.tsx
    │   ├── components/
    │   │   ├── Header/
    │   │   │   ├── Header.tsx
    │   │   │   └── index.tsx
    │   │   ├── Product/
    │   │   │   ├── ProductCard.tsx
    │   │   │   ├── ProductGrid.tsx
    │   │   │   └── index.tsx
    │   │   ├── Cart/
    │   │   ├── Auth/
    │   │   └── Common/
    │   │       ├── Button.tsx        # Reusable button
    │   │       ├── Input.tsx         # Reusable input
    │   │       ├── Card.tsx          # Reusable card
    │   │       ├── Modal.tsx         # Reusable modal
    │   │       ├── LoadingSpinner.tsx
    │   │       ├── Pagination.tsx
    │   │       └── index.tsx
    │   ├── hooks/
    │   │   ├── useAsync.ts           # Async handler
    │   │   ├── useAuth.ts            # Auth hook
    │   │   └── index.ts
    │   ├── services/
    │   │   ├── apiService.ts         # Axios configuration
    │   │   └── index.ts              # API endpoints
    │   ├── store/
    │   │   ├── authStore.ts          # Auth state (Zustand)
    │   │   └── cartStore.ts          # Cart state (Zustand)
    │   ├── types/
    │   │   └── index.ts              # TypeScript types
    │   ├── utils/
    │   │   └── constants.ts          # API constants
    │   └── globals.css               # Global styles
    ├── public/
    ├── package.json
    ├── next.config.js
    ├── tsconfig.json
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── .env.local
    └── .gitignore
```

## ✨ Fitur Aplikasi

### Authentication & User Management
- ✅ User Registration dengan validasi email
- ✅ User Login dengan JWT
- ✅ Profile Management
- ✅ Role-based access (User/Admin)

### Product Management
- ✅ Browse products dengan filtering by category
- ✅ Search products
- ✅ Price filtering
- ✅ Product details dengan reviews
- ✅ Star rating display
- ✅ Stock availability

### Shopping Cart
- ✅ Add to cart
- ✅ Update quantity
- ✅ Remove items
- ✅ Clear cart
- ✅ Real-time total price calculation

### Orders & Checkout
- ✅ Create orders
- ✅ Order history
- ✅ Order tracking
- ✅ Order status updates (admin)
- ✅ Shipping information

### Reviews & Ratings
- ✅ Create product reviews
- ✅ View product reviews dengan pagination
- ✅ Edit/Delete reviews
- ✅ Average rating calculation

## 🔌 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "Logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "userId",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Product Endpoints

#### Get All Products
```http
GET /products?category=juice&page=1&limit=12
```

#### Get Product Details
```http
GET /products/:id
```

### Cart Endpoints

#### Get Cart
```http
GET /cart
Authorization: Bearer {token}
```

#### Add to Cart
```http
POST /cart/add
Authorization: Bearer {token}
Content-Type: application/json

{
  "productId": "productId",
  "quantity": 2
}
```

#### Update Cart Item
```http
PUT /cart/update
Authorization: Bearer {token}
Content-Type: application/json

{
  "productId": "productId",
  "quantity": 3
}
```

### Order Endpoints

#### Create Order
```http
POST /orders
Authorization: Bearer {token}
Content-Type: application/json

{
  "shippingAddress": {
    "street": "Jl. Example No. 123",
    "city": "Jakarta",
    "province": "DKI Jakarta",
    "zipCode": "12345",
    "country": "Indonesia"
  },
  "paymentMethod": "bank_transfer"
}
```

#### Get My Orders
```http
GET /orders/my-orders
Authorization: Bearer {token}
```

## 🎨 Component Architecture

### Reusable Components

#### Button
```tsx
<Button 
  variant="primary" | "secondary" | "outline" | "danger"
  size="sm" | "md" | "lg"
  isLoading={boolean}
  onClick={handler}
>
  Click Me
</Button>
```

#### Input
```tsx
<Input
  label="Email"
  type="email"
  error={errorMessage}
  helperText="helper text"
  placeholder="Enter email"
/>
```

#### Card
```tsx
<Card className="p-6" onClick={handler}>
  Content here
</Card>
```

#### Modal
```tsx
<Modal
  isOpen={boolean}
  title="Modal Title"
  onClose={handler}
>
  Modal content
</Modal>
```

## 🧪 Testing

### Test Backend
```bash
cd backend
npm test
```

### Test Frontend
```bash
cd frontend
npm test
```

## 🚀 Production Build

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm start
```

## 🐛 Troubleshooting

### MongoDB Connection Error
**Error**: `MongoServerError: connect ECONNREFUSED`

**Solution**:
- Pastikan MongoDB running: `mongod`
- Atau update `MONGODB_URI` di `.env` ke MongoDB Atlas

### CORS Error
**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution**:
- Pastikan `CORS_ORIGIN` di backend `.env` benar
- Frontend URL: `http://localhost:3000`

### Port Already in Use
**Error**: `Error: listen EADDRINUSE: address already in use :::5000`

**Solution**:
```bash
# Find process using port
lsof -i :5000

# Kill process
kill -9 <PID>

# Atau gunakan port berbeda
PORT=5001 npm run dev
```

### Module Not Found
**Error**: `Cannot find module '@/components/Common'`

**Solution**:
- Clear node_modules dan install ulang
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Icons](https://react-icons.github.io/react-icons/)

## 📝 License

ISC

## ✉️ Support

Untuk pertanyaan atau issues, silakan buka issue di repository.

---

**Happy Coding! 🎉**
