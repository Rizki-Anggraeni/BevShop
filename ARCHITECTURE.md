# Architecture Documentation

Dokumentasi lengkap arsitektur e-commerce beverage application yang menggunakan clean architecture principles.

## 🏗️ Overall Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT LAYER (Next.js)                    │
│  ┌──────────────┐  ┌────────────────┐  ┌──────────────────┐ │
│  │   Pages      │  │  Components    │  │  Hooks & Custom  │ │
│  │  (App Dir)   │  │  (Reusable)    │  │  Logic           │ │
│  └──────────────┘  └────────────────┘  └──────────────────┘ │
│         │                  │                     │           │
│         └──────────────────┴─────────────────────┘           │
│                         │                                    │
│                    ┌────▼────────┐                          │
│                    │ API Service │                          │
│                    │  (Axios)    │                          │
│                    └────┬────────┘                          │
└─────────────────────────┼──────────────────────────────────┘
                          │ HTTP/REST
┌─────────────────────────▼──────────────────────────────────┐
│               API LAYER (Express.js)                        │
│  ┌──────────────┐  ┌────────────┐  ┌──────────────────┐    │
│  │  Routes      │  │ Controllers│  │  Middleware      │    │
│  │  (Express)   │  │  (Business │  │  (Auth, Error)   │    │
│  │              │  │   Logic)   │  │                  │    │
│  └──────────────┘  └────────────┘  └──────────────────┘    │
│         │                  │                     │          │
│         └──────────────────┴─────────────────────┘          │
│                         │                                   │
│                    ┌────▼───────┐                          │
│                    │   Models   │                          │
│                    │ (Mongoose) │                          │
│                    └────┬───────┘                          │
└─────────────────────────┼──────────────────────────────────┘
                          │ MongoDB Protocol
┌─────────────────────────▼──────────────────────────────────┐
│                 DATA LAYER (MongoDB)                        │
│              Users, Products, Carts, Orders                 │
└────────────────────────────────────────────────────────────┘
```

## 📁 Frontend Architecture (Next.js 14)

### App Structure
```
src/
├── app/                           # Next.js App Directory
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Home page
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── products/
│   │   ├── page.tsx               # Products listing
│   │   └── [id]/page.tsx          # Product detail
│   ├── cart/page.tsx              # Shopping cart
│   ├── orders/
│   │   ├── page.tsx               # Order history
│   │   └── [id]/page.tsx          # Order details
│   └── profile/page.tsx           # User profile
│
├── components/                    # Reusable React Components
│   ├── Common/                    # Atomic components
│   │   ├── Button.tsx            # Button variants
│   │   ├── Input.tsx             # Input field
│   │   ├── Card.tsx              # Card container
│   │   ├── Modal.tsx             # Modal dialog
│   │   ├── LoadingSpinner.tsx    # Loading state
│   │   ├── Pagination.tsx        # Pagination control
│   │   └── index.tsx             # Exports
│   ├── Header/                    # Header component
│   │   ├── Header.tsx            # Navigation
│   │   └── index.tsx
│   ├── Product/                   # Product components
│   │   ├── ProductCard.tsx       # Product card
│   │   ├── ProductGrid.tsx       # Product grid
│   │   └── index.tsx
│   ├── Cart/                      # Cart components
│   └── Auth/                      # Auth components
│
├── hooks/                         # Custom React Hooks
│   ├── useAsync.ts               # Async handler
│   ├── useAuth.ts                # Auth hook
│   └── index.ts
│
├── services/                      # API Service Layer
│   ├── apiService.ts             # Axios instance & interceptors
│   └── index.ts                  # Service methods
│
├── store/                         # State Management (Zustand)
│   ├── authStore.ts              # Auth state
│   ├── cartStore.ts              # Cart state
│   └── index.ts
│
├── types/                         # TypeScript Type Definitions
│   └── index.ts
│
├── utils/                         # Utility Functions
│   └── constants.ts              # API endpoints
│
├── globals.css                    # Global styles
└── .env.local                     # Environment variables
```

### Component Hierarchy
```
App (Root Layout)
├── Header
│   ├── Logo/Brand
│   ├── Search Bar
│   ├── Navigation Links
│   └── Cart Icon
│
├── Main Content
│   ├── Hero Section (Home)
│   ├── ProductGrid
│   │   └── ProductCard (repeating)
│   │       ├── Image
│   │       ├── Title
│   │       ├── Price
│   │       ├── Rating
│   │       └── Add to Cart Button
│   │
│   ├── Cart Page
│   │   ├── CartItems
│   │   └── Checkout Form
│   │
│   ├── Auth Pages
│   │   ├── Form Fields
│   │   └── Submit Button
│   │
│   └── Orders Page
│       └── Order Cards
│
└── Footer
```

### State Management Flow

```
User Actions
    │
    ▼
Component State (React Hooks)
    │
    ├─→ Local Component State (useState)
    │       └─ Used for: Form inputs, UI toggles
    │
    └─→ Global State (Zustand Store)
            ├─ Auth Store
            │   ├─ user
            │   ├─ token
            │   ├─ setUser()
            │   └─ logout()
            │
            └─ Cart Store
                ├─ cart
                ├─ addItem()
                ├─ removeItem()
                └─ updateQuantity()
    
    ▼
API Service (Axios)
    │
    └─→ Express Backend API
```

## 🔌 Backend Architecture (Express.js)

### Request Flow
```
Incoming Request
    │
    ▼
CORS & Express Middleware
    │
    ▼
Routing (Express Router)
    │
    ├─→ /api/auth/*
    ├─→ /api/products/*
    ├─→ /api/cart/*
    ├─→ /api/orders/*
    └─→ /api/reviews/*
    
    ▼
Authentication Middleware (if protected route)
    │
    ├─→ Extract & Verify JWT Token
    └─→ Add userId & userRole to request
    
    ▼
Controller (Business Logic)
    │
    ├─→ Validate Request Data
    ├─→ Query/Manipulate Database
    └─→ Format Response
    
    ▼
Model (MongoDB/Mongoose)
    │
    ├─→ Schema Definition
    ├─→ Data Validation
    └─→ Database Operations
    
    ▼
Response Object
```

### Backend Folder Structure
```
backend/
├── src/
│   ├── config/
│   │   └── database.js            # MongoDB connection
│   │
│   ├── models/                    # Mongoose Schemas
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   ├── Order.js
│   │   └── Review.js
│   │
│   ├── controllers/               # Business Logic
│   │   ├── authController.js     # Auth operations
│   │   ├── productController.js  # Product CRUD
│   │   ├── cartController.js     # Cart operations
│   │   ├── orderController.js    # Order operations
│   │   └── reviewController.js   # Review operations
│   │
│   ├── routes/                    # Express Routes
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   └── reviewRoutes.js
│   │
│   ├── middleware/                # Express Middleware
│   │   ├── auth.js               # JWT verification
│   │   └── errorHandler.js       # Error handling
│   │
│   ├── services/                  # Shared Business Logic (optional)
│   │   └── (utility functions)
│   │
│   ├── utils/                     # Utility Functions
│   │   └── helpers.js            # Hash, JWT, etc.
│   │
│   └── server.js                  # Express App & Server
│
├── package.json
├── .env
└── .gitignore
```

## 🔐 Authentication & Authorization

### JWT Flow
```
1. User Login
   ├─→ authController.login()
   ├─→ Compare password (bcrypt)
   └─→ Generate JWT Token

2. Token Storage
   └─→ Stored in browser localStorage

3. Protected Requests
   ├─→ Token sent in Authorization header
   ├─→ Middleware verifies token
   └─→ userId & role added to request

4. Token Expiration
   ├─→ JWT expires in 7 days
   └─→ User needs to login again
```

### Role-Based Access Control
```
Routes
├─ Public Routes
│  ├─ GET /api/products
│  ├─ GET /api/products/:id
│  └─ POST /api/auth/register
│
├─ Protected Routes (Any User)
│  ├─ GET /api/auth/profile
│  ├─ PUT /api/auth/profile
│  ├─ GET /api/cart
│  ├─ POST /api/cart/add
│  ├─ POST /api/orders
│  ├─ GET /api/orders/my-orders
│  └─ POST /api/reviews
│
└─ Admin Only Routes
   ├─ POST /api/products (create)
   ├─ PUT /api/products/:id (update)
   ├─ DELETE /api/products/:id
   ├─ GET /api/orders (all)
   └─ PUT /api/orders/:id (status update)
```

## 📊 Database Schema

### User Schema
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (hashed),
  phone: String,
  address: {
    street: String,
    city: String,
    province: String,
    zipCode: String,
    country: String
  },
  role: String (enum: ['user', 'admin']),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Product Schema
```javascript
{
  _id: ObjectId,
  name: String (required),
  description: String (required),
  price: Number (required),
  category: String (enum: [soft_drink, juice, water, coffee, tea, energy_drink, other]),
  image: String,
  stock: Number,
  rating: Number (0-5),
  reviews: Number,
  volume: String (e.g., "1L", "500ml"),
  brand: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Cart Schema
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  items: [
    {
      product: ObjectId (ref: Product),
      quantity: Number
    }
  ],
  totalPrice: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Order Schema
```javascript
{
  _id: ObjectId,
  orderNumber: String (unique),
  user: ObjectId (ref: User),
  items: [
    {
      product: ObjectId (ref: Product),
      quantity: Number,
      price: Number
    }
  ],
  totalPrice: Number,
  shippingAddress: {
    street: String,
    city: String,
    province: String,
    zipCode: String,
    country: String
  },
  paymentMethod: String,
  paymentStatus: String (enum: [pending, completed, failed]),
  orderStatus: String (enum: [pending, processing, shipped, delivered, cancelled]),
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 UI/UX Design Pattern

### Color Palette
```css
Primary:   #FF6B35 (Orange - CTA buttons, active states)
Secondary: #004E89 (Blue - Alternative buttons)
Accent:    #F77F00 (Gold - Highlights)
Light:     #F8F9FA (Background)
Dark:      #2C3E50 (Text, footer)
```

### Component Variants
```
Buttons:
├─ primary (filled, orange)
├─ secondary (filled, blue)
├─ outline (bordered)
└─ danger (red for destructive actions)

Sizes: sm, md, lg

Inputs:
├─ text, email, password
├─ validation with error messages
└─ helper text for guidance

Cards:
├─ hover effect (shadow)
├─ clickable support
└─ flexible padding

States:
├─ loading (spinner)
├─ disabled (opacity)
├─ error (red border)
└─ success (green)
```

## 🔄 Data Flow Example: Add to Cart

```
User clicks "Add to Cart"
    │
    ▼
ProductCard.onAddToCart() triggered
    │
    ▼
cartService.addToCart(productId, quantity)
    │
    ├─→ Axios POST /api/cart/add
    │   ├─→ Include token in header
    │   └─→ Send payload: {productId, quantity}
    │
    ▼
Backend - Express Server
    │
    ├─→ auth middleware
    │   └─→ Verify JWT, extract userId
    │
    ├─→ cartController.addToCart()
    │   ├─→ Find cart by userId
    │   ├─→ Check if product exists
    │   ├─→ Add/update item in cart
    │   ├─→ Calculate total price
    │   └─→ Save to MongoDB
    │
    ▼
Send response back to frontend
    │
    ├─→ Success: {success: true, data: updatedCart}
    │
    ▼
Frontend handles response
    │
    ├─→ cartStore.addItem() updates global state
    ├─→ useCartStore cart updated
    ├─→ Header cart count updates
    └─→ Toast notification shown
```

## 🧪 Testing Strategy

### Frontend Testing
```javascript
// Components
- Button rendering & click handlers
- Input validation
- Modal open/close
- Product card display

// Hooks
- useAuth persistence
- useAsync error handling

// Services
- API calls with mocked axios
- Error handling
- Token inclusion in requests
```

### Backend Testing
```javascript
// Models
- Schema validation
- Unique constraints
- Relationships

// Controllers
- Request validation
- Response format
- Error handling

// Routes
- HTTP methods
- Status codes
- Protected routes

// Integration
- Full request-response flow
- Database operations
- Auth flow
```

## 📈 Performance Optimization

### Frontend
```
✅ Code splitting (Next.js automatic)
✅ Image optimization (next/image)
✅ Component lazy loading
✅ Debounced search
✅ Zustand store (no re-renders on other updates)
✅ CSS-in-JS with Tailwind (optimized bundle)
```

### Backend
```
✅ Database indexing on frequently queried fields
✅ Pagination for large datasets
✅ Lean queries (exclude unnecessary fields)
✅ JWT caching
✅ Error handling to prevent crashes
```

## 🔒 Security Best Practices

```
✅ Password hashing with bcrypt
✅ JWT for stateless auth
✅ CORS configuration
✅ Environment variable protection
✅ Input validation on both sides
✅ SQL injection prevention (Mongoose)
✅ XSS protection (Next.js)
✅ CSRF tokens (optional for forms)
```

---

**Last Updated**: December 2024
