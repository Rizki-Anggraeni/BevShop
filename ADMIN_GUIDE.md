# 🔧 Admin Dashboard Documentation

## Overview

The Admin Dashboard is a powerful management interface for administrators to manage products, users, and orders.

**Access:** http://localhost:3000/admin  
**Requirements:** Admin user role

---

## Features

### 1. Product Management
- ✅ View all products in grid layout
- ✅ Add new products with form validation
- ✅ Edit existing products
- ✅ Delete products
- ✅ See product details (price, stock, category)

**Product Fields:**
- Product Name (required)
- Category (Juice, Soda, Coffee, Energy, Water)
- Price in Rupiah (Rp)
- Stock quantity
- Description
- Image URL

### 2. User Management
- ✅ View all registered users
- ✅ See user information (email, name, role)
- ✅ Track user creation date
- ✅ Identify admin vs regular users

**User Information:**
- Email address
- Full name
- Role badge (Admin/User)
- Account creation date

### 3. Order Management
- ✅ View all system orders
- ✅ See order details (amount, status, date)
- ✅ Track order status (pending, completed, cancelled)
- ✅ Sort and filter orders

**Order Information:**
- Order ID (last 8 characters)
- Total amount (Rp)
- Current status with color coding
- Order creation date

---

## How to Use

### Access Admin Dashboard

1. **Login as Admin**
   - Go to http://localhost:3000/auth/login
   - Login with admin credentials
   - Admin users see ⚙️ Admin link in header

2. **Navigate to Dashboard**
   - Click "⚙️ Admin" in header
   - Or go directly to: http://localhost:3000/admin

### Manage Products

**Add New Product:**
```
1. Click "➕ Add New Product" button
2. Fill in product details
3. Click "Add Product"
4. Product appears in grid
```

**Edit Product:**
```
1. Find product in grid
2. Click "✏️ Edit" button
3. Update information
4. Click "Update Product"
```

**Delete Product:**
```
1. Find product in grid
2. Click "🗑️ Delete" button
3. Confirm deletion
4. Product is removed
```

### View Users

**User List:**
```
1. Click "👥 Users" tab
2. See all registered users in table
3. Check email, name, role, and joined date
4. Red badge = Admin, Green badge = User
```

### Manage Orders

**Order List:**
```
1. Click "📋 Orders" tab
2. See all orders in table
3. View order ID, amount, status, date
4. Green status = Completed
5. Yellow status = Pending
6. Red status = Cancelled
```

---

## API Endpoints

### Admin Routes (Protected)

All admin routes require:
- Valid JWT token
- Admin role

```
GET    /api/admin/users      → Get all users
GET    /api/admin/orders     → Get all orders
PUT    /api/admin/orders/:id → Update order status
GET    /api/admin/stats      → Get dashboard statistics
```

### Product Routes (Admin Only)

```
POST   /api/products/:id    → Create product
PUT    /api/products/:id    → Update product
DELETE /api/products/:id    → Delete product
```

---

## Backend Setup

### 1. Admin Routes File
**Location:** `backend/src/routes/adminRoutes.js`

Routes:
- `GET /users` - Fetch all users
- `GET /orders` - Fetch all orders
- `PUT /orders/:id` - Update order status
- `GET /stats` - Get dashboard statistics

### 2. Auth Middleware
**Location:** `backend/src/middleware/auth.js`

Updates:
- Added `adminOnly` middleware
- Validates admin role on protected routes

### 3. Server Configuration
**Location:** `backend/src/server.js`

Addition:
```javascript
const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);
```

---

## Frontend Components

### Admin Dashboard Page
**Location:** `frontend/src/app/admin/page.tsx`

Features:
- Tabs for Products, Users, Orders
- Product grid with CRUD operations
- User table with details
- Order table with status
- Modal for adding/editing products
- Loading states and error handling

### Header Navigation Update
**Location:** `frontend/src/components/Header/Header.tsx`

Addition:
```tsx
{user?.role === 'admin' && (
  <Link href="/admin">⚙️ Admin</Link>
)}
```

---

## Role-Based Access Control

### Admin User
- ✅ Access admin dashboard
- ✅ Manage all products
- ✅ View all users
- ✅ View all orders
- ✅ Update order status
- ✅ Full system access

### Regular User
- ❌ Cannot access /admin route
- ❌ Cannot manage products
- ✅ Can view their own orders
- ✅ Can manage their profile
- ✅ Can browse and purchase products

---

## Database Models

### User Model
```javascript
{
  _id: ObjectId,
  email: String,
  password: String (hashed),
  fullName: String,
  role: String ('user' or 'admin'),
  createdAt: Date,
  address: Object
}
```

### Product Model
```javascript
{
  _id: ObjectId,
  name: String,
  category: String,
  price: Number,
  stock: Number,
  description: String,
  image: String,
  rating: Number,
  reviewsCount: Number,
  createdAt: Date
}
```

### Order Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  items: Array,
  totalAmount: Number,
  status: String ('pending', 'completed', 'cancelled'),
  shippingAddress: Object,
  createdAt: Date
}
```

---

## Creating Admin Users

### Option 1: Manual Database Entry
```javascript
const bcrypt = require('bcryptjs');

// Hash password
const hashedPassword = await bcrypt.hash('password123', 10);

// Create admin user
await User.create({
  email: 'admin@bevshop.com',
  password: hashedPassword,
  fullName: 'Admin User',
  role: 'admin'
});
```

### Option 2: Via API (For Developers)
Update the register endpoint to accept admin role:
```javascript
// In authController.js
const user = new User({
  email,
  password: hashedPassword,
  fullName,
  role: req.body.role || 'user' // Allow specifying role
});
```

---

## Security Considerations

✅ **JWT Authentication** - All admin routes require valid token  
✅ **Role Validation** - `adminOnly` middleware checks user role  
✅ **Password Hashing** - bcryptjs for secure password storage  
✅ **CORS Protection** - Cross-origin requests validated  
✅ **Input Validation** - Server-side validation on all fields  

### Best Practices

1. **Token Security**
   - Store JWT securely
   - Use HTTPS in production
   - Set appropriate token expiration

2. **Admin Account**
   - Use strong passwords
   - Limit admin user count
   - Monitor admin activities

3. **Data Management**
   - Backup database regularly
   - Validate all inputs
   - Log admin actions

---

## Troubleshooting

### Cannot Access Admin Dashboard

**Problem:** "Access denied" message  
**Solution:** 
- Verify you're logged in as admin user
- Check user role in database
- Verify JWT token in request headers

### Products Not Displaying

**Problem:** Empty product grid  
**Solution:**
- Check MongoDB connection
- Verify products exist in database
- Check API response in browser console

### Order Status Not Updating

**Problem:** Changes not saved  
**Solution:**
- Verify admin authorization
- Check request payload format
- Review server logs for errors

### Users Table Empty

**Problem:** No users showing  
**Solution:**
- Confirm users exist in database
- Check auth token validity
- Verify admin role permission

---

## Example Admin Workflows

### Add New Beverage Product

```
1. Login as admin
2. Click "⚙️ Admin" in header
3. Ensure "Products" tab is active
4. Click "➕ Add New Product"
5. Fill in details:
   - Name: "Orange Juice Premium"
   - Category: "Juice"
   - Price: "50000"
   - Stock: "100"
   - Description: "Fresh squeezed orange juice"
   - Image: "https://..."
6. Click "Add Product"
7. Product now visible to all users
```

### Monitor Daily Orders

```
1. Go to Admin Dashboard
2. Click "📋 Orders" tab
3. Review all orders
4. See status indicators (green=completed, yellow=pending)
5. Track total revenue
6. Monitor order frequency
```

### Manage User Accounts

```
1. Go to Admin Dashboard
2. Click "👥 Users" tab
3. See all registered users
4. Review signup dates
5. Identify admin vs regular users
6. Monitor user growth
```

---

## Performance Tips

- 📊 Pagination coming soon for large datasets
- 🔍 Search functionality coming soon
- 📈 Analytics dashboard coming soon
- 🔔 Real-time notifications coming soon

---

## Next Features

🔜 **Upcoming Admin Features:**
- 📊 Advanced analytics dashboard
- 📈 Sales reports and trends
- 🔔 Order notifications
- 📧 Email notifications
- 🔍 Search and filters
- 📄 Data export (CSV, PDF)
- 📅 Date range filters
- 🎯 Discount management

---

## Support

For issues or questions:
1. Check this documentation
2. Review server logs
3. Verify database connection
4. Check browser console for errors
5. Review API responses in Network tab

---

**Admin Dashboard Version:** 1.0.0  
**Last Updated:** December 4, 2025  
**Status:** Production Ready
