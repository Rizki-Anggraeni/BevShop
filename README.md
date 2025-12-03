# E-Commerce Beverage Store - Full Stack Application

A modern, full-featured e-commerce application for selling beverages built with Next.js, Express.js, MongoDB, and Tailwind CSS.

## 🚀 Features

### Backend (Express.js)
- User authentication with JWT
- Product management (CRUD operations)
- Shopping cart system
- Order management
- Product reviews and ratings
- Admin dashboard functionality
- Role-based access control

### Frontend (Next.js)
- Modern, responsive UI with Tailwind CSS v3
- Reusable component architecture
- Product catalog with filtering and pagination
- Shopping cart with local state management
- User authentication pages
- Order history and management
- Product reviews and ratings
- Search functionality

## 📁 Project Structure

```
.
├── backend/                    # Express.js backend
│   ├── src/
│   │   ├── config/            # Database configuration
│   │   ├── models/            # MongoDB models
│   │   ├── controllers/       # Route controllers
│   │   ├── routes/            # API routes
│   │   ├── middleware/        # Authentication & error handling
│   │   ├── services/          # Business logic
│   │   ├── utils/             # Helper functions
│   │   └── server.js          # Entry point
│   ├── package.json
│   └── .env.example
│
└── frontend/                   # Next.js frontend
    ├── src/
    │   ├── app/               # Next.js app directory
    │   ├── components/        # Reusable React components
    │   │   ├── Header/
    │   │   ├── Product/
    │   │   ├── Cart/
    │   │   ├── Auth/
    │   │   └── Common/
    │   ├── hooks/             # Custom React hooks
    │   ├── services/          # API service
    │   ├── store/             # Zustand state management
    │   ├── types/             # TypeScript types
    │   ├── utils/             # Utility functions
    │   └── globals.css        # Global styles
    ├── package.json
    └── .env.example
```

## 🛠 Installation

### Prerequisites
- Node.js >= 16
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Update .env with your configuration
nano .env

# Start development server
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install

# Create .env.local file
cp .env.example .env.local

# Update .env.local if needed
nano .env.local

# Start development server
npm run dev
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Products
- `GET /api/products` - Get all products with filters
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item quantity
- `POST /api/cart/remove` - Remove item from cart
- `DELETE /api/cart/clear` - Clear cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/my-orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id` - Update order status (admin only)
- `GET /api/orders` - Get all orders (admin only)

### Reviews
- `POST /api/reviews` - Create review
- `GET /api/reviews/product/:productId` - Get product reviews
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

## 🎨 Design Features

### Component Architecture
- **Atomic Design Pattern**: Components are organized from basic (atoms) to complex (organisms)
- **Reusable Components**: Button, Input, Card, Modal, LoadingSpinner, Pagination
- **Props-based Customization**: Components accept variant, size, and state props
- **TypeScript Support**: Full type safety across all components

### Tailwind CSS v3
- Custom color palette (primary, secondary, accent)
- Custom utility classes (.btn-primary, .btn-secondary, .input-field, .card)
- Responsive grid layouts
- Smooth animations and transitions
- Dark mode support ready

### State Management
- **Zustand**: Lightweight global state for auth and cart
- **Local State**: Component-level state with React hooks
- **API Integration**: Axios interceptors for automatic token handling

## 🔐 Authentication

- JWT-based authentication
- Token stored in localStorage
- Automatic token refresh on request
- Role-based access control (User/Admin)
- Protected routes on frontend

## 📦 Dependencies

### Backend
- Express.js
- MongoDB/Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- cors
- dotenv

### Frontend
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS v3
- Zustand
- Axios
- React Icons
- React Toastify

## 🚀 Deployment

### Backend (Express)
```bash
npm run build
npm run start
```

### Frontend (Next.js)
```bash
npm run build
npm run start
```

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/beverage-ecommerce
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 🧪 Testing

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

## 📄 License

ISC

## 👨‍💻 Development

Built with clean architecture principles:
- Separation of concerns
- DRY (Don't Repeat Yourself)
- SOLID principles
- Type-safe code
- Responsive design

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
