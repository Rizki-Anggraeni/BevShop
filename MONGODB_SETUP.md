# 🗄️ MongoDB Setup Guide

## Quick Start Options

### Option 1: MongoDB Atlas (Cloud - Recommended for Beginners)
**No installation needed - everything in the cloud**

#### Step 1: Create Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Sign Up"
3. Create account with email/password
4. Verify email

#### Step 2: Create Free Cluster
1. Click "Create a Cluster"
2. Select "M0 (Free)" tier
3. Choose region (closest to you)
4. Click "Create Cluster" (takes 1-3 minutes)

#### Step 3: Set Up Connection
1. Click "Connect" button
2. Choose "Connect with MongoDB Compass" or "Connect your application"
3. Create database user:
   - Username: `admin`
   - Password: (create strong password)
4. Add IP address: `0.0.0.0/0` (allows all)
5. Click "Get Connection String"

#### Step 4: Update Backend .env
Replace in `backend/.env`:
```env
MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/beverage-ecommerce?retryWrites=true&w=majority
```

**That's it! MongoDB Atlas is ready.**

---

### Option 2: Local MongoDB (Windows)
**Install on your computer**

#### Step 1: Download Installer
1. Go to https://www.mongodb.com/try/download/community
2. Select:
   - Version: Latest (7.0+)
   - Platform: Windows
   - Package: MSI
3. Click "Download"

#### Step 2: Run Installer
1. Run the `.msi` file
2. Click "Install"
3. Choose "Complete" setup
4. Keep default paths
5. Check "Install MongoDB as a Service"
6. Click "Install"

#### Step 3: Start MongoDB Service
**Option A: As Windows Service (Auto-starts)**
- Already running from installer
- Starts automatically on Windows startup

**Option B: Manual Start (Command Line)**
```powershell
# Open PowerShell as Administrator
net start MongoDB
```

**Option C: Check Status**
```powershell
# Check if running
Get-Service MongoDB
```

#### Step 4: Connect via MongoDB Shell
```powershell
# Open new PowerShell
mongosh
```

You should see:
```
test>
```

#### Step 5: Create Database
```javascript
// In mongosh shell
use beverage-ecommerce
```

#### Step 6: Verify .env
Your `backend/.env` should have:
```env
MONGODB_URI=mongodb://localhost:27017/beverage-ecommerce
```

---

### Option 3: Docker (Advanced)
**MongoDB in a container**

#### Step 1: Install Docker
Go to https://www.docker.com/products/docker-desktop and install

#### Step 2: Run MongoDB Container
```powershell
docker run -d `
  --name mongodb `
  -p 27017:27017 `
  -e MONGO_INITDB_ROOT_USERNAME=admin `
  -e MONGO_INITDB_ROOT_PASSWORD=password123 `
  mongo:latest
```

#### Step 3: Connect
```powershell
docker exec -it mongodb mongosh
```

#### Step 4: Update .env
```env
MONGODB_URI=mongodb://admin:password123@localhost:27017/beverage-ecommerce?authSource=admin
```

---

## Recommended Setup (MongoDB Atlas)

### Why Choose Atlas?
✅ **No Installation** - Works immediately  
✅ **Free Tier** - 512MB storage is enough for testing  
✅ **Secure** - Built-in encryption and authentication  
✅ **Cloud Backup** - Automatic backups  
✅ **Easy Scaling** - Upgrade anytime  
✅ **No Maintenance** - MongoDB manages everything  

### Complete Atlas Setup (10 minutes)

#### 1. Create Atlas Account
```
https://www.mongodb.com/cloud/atlas
→ Sign Up
→ Create Account
→ Verify Email
```

#### 2. Create Free Cluster
```
Dashboard → Create a Project
→ Project Name: "BevShop"
→ Create Cluster
→ Select M0 (Free)
→ Region: Choose closest
→ Create Cluster (Wait 1-3 min)
```

#### 3. Add User
```
Database Access → Add Database User
→ Username: admin
→ Password: (Generate strong password)
→ Add User
```

#### 4. Add IP Whitelist
```
Network Access → Add IP Address
→ IP Address: 0.0.0.0/0
→ Description: "All"
→ Confirm
```

#### 5: Get Connection String
```
Clusters → Connect
→ Connect your application
→ Copy Connection String
→ Replace <username>, <password>, <dbname>
```

Example string:
```
mongodb+srv://admin:myPassword123@cluster0.abc123.mongodb.net/beverage-ecommerce?retryWrites=true&w=majority
```

#### 6: Update .env
```env
MONGODB_URI=mongodb+srv://admin:myPassword123@cluster0.abc123.mongodb.net/beverage-ecommerce?retryWrites=true&w=majority
```

---

## Verify MongoDB Connection

### Check Connection in Backend

#### Step 1: Start Backend
```powershell
cd backend
npm run dev
```

#### Step 2: Look for Connection Message
You should see:
```
Server running on port 5000
MongoDB Connected: [server-name]
```

**Success!** ✅ MongoDB is connected.

---

## Test MongoDB with Sample Data

### Option 1: Insert Test Data via Backend API

#### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "fullName": "Test User"
  }'
```

#### Create Product (Admin only)
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Orange Juice",
    "category": "juice",
    "price": 50000,
    "stock": 100,
    "description": "Fresh orange juice",
    "image": "https://..."
  }'
```

### Option 2: Use MongoDB Compass (GUI Tool)

#### Download
https://www.mongodb.com/products/compass

#### Connect
1. Open Compass
2. Enter connection string
3. Click "Connect"
4. Browse collections
5. View/edit data visually

---

## Database Structure

Your MongoDB will have:
```
beverage-ecommerce (database)
├── users (collection)
│   └── email, password, fullName, role, address
├── products (collection)
│   └── name, category, price, stock, description, image
├── carts (collection)
│   └── userId, items, totalPrice
├── orders (collection)
│   └── userId, items, totalAmount, status, shippingAddress
└── reviews (collection)
    └── productId, userId, rating, comment, verified
```

---

## Troubleshooting

### "Cannot connect to MongoDB"

**Solution 1: Check MongoDB is Running**
```powershell
# For local MongoDB
Get-Service MongoDB
```

If not running:
```powershell
# Start service
net start MongoDB
```

**Solution 2: Check Connection String**
```env
# Local
MONGODB_URI=mongodb://localhost:27017/beverage-ecommerce

# Atlas (example)
MONGODB_URI=mongodb+srv://admin:password@cluster0.abc.mongodb.net/beverage-ecommerce?retryWrites=true&w=majority
```

**Solution 3: Test Connection**
```powershell
# For local
mongosh

# Output should be:
# > test
```

### "Authentication failed"

**Solution:**
1. Verify username and password in connection string
2. For Atlas: Check user was created in "Database Access"
3. For local: May not need authentication, remove from string

### "IP not whitelisted" (Atlas)

**Solution:**
1. Go to Atlas → Network Access
2. Add IP address: `0.0.0.0/0`
3. Or add your current IP from: https://whatsmyipaddress.com

---

## Start with Test Data

### Create Admin User
```javascript
// In mongosh
use beverage-ecommerce

db.users.insertOne({
  email: "admin@bevshop.com",
  password: "$2a$10$hashValue", // bcrypt hashed
  fullName: "Admin User",
  role: "admin",
  createdAt: new Date()
})
```

### Add Sample Products
```javascript
db.products.insertMany([
  {
    name: "Orange Juice",
    category: "juice",
    price: 50000,
    stock: 100,
    description: "Fresh squeezed orange juice",
    image: "https://...",
    rating: 4.5,
    reviewsCount: 0,
    createdAt: new Date()
  },
  {
    name: "Coca Cola",
    category: "soda",
    price: 25000,
    stock: 200,
    description: "Classic Coca Cola",
    image: "https://...",
    rating: 4.0,
    reviewsCount: 0,
    createdAt: new Date()
  }
])
```

---

## Security Best Practices

### Development
```env
MONGODB_URI=mongodb://localhost:27017/beverage-ecommerce
```

### Production (Atlas)
```env
MONGODB_URI=mongodb+srv://admin:STRONG_PASSWORD@cluster.mongodb.net/beverage-ecommerce?retryWrites=true&w=majority
```

### Password Best Practices
- ✅ Use strong passwords (16+ characters)
- ✅ Mix uppercase, lowercase, numbers, symbols
- ✅ Never commit passwords to git
- ✅ Use environment variables
- ✅ Rotate passwords regularly

---

## Next Steps

### 1. Choose Setup Method
- **Easiest:** MongoDB Atlas (cloud)
- **Local:** MongoDB Community Edition
- **Advanced:** Docker

### 2. Set Up MongoDB
Follow steps for your chosen method

### 3. Update .env
```env
MONGODB_URI=your_connection_string
```

### 4. Restart Backend
```powershell
cd backend
npm run dev
```

### 5. Check Logs
Look for: `MongoDB Connected: [server-name]`

### 6. Test Connection
Register a user or browse database with Compass

---

## Quick Reference

### MongoDB Atlas Connection String
```
mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

### Local MongoDB Connection String
```
mongodb://localhost:27017/beverage-ecommerce
```

### Common Commands
```javascript
// List databases
show databases

// Select database
use beverage-ecommerce

// List collections
show collections

// Count documents
db.users.countDocuments()

// Find all users
db.users.find()

// Find specific user
db.users.findOne({ email: "test@example.com" })
```

---

## Support

Having issues? Check:
1. MongoDB is running (local or Atlas account active)
2. Connection string is correct in .env
3. Credentials are accurate
4. IP is whitelisted (Atlas only)
5. Backend logs show connection message

**Backend Connected Message:**
```
Server running on port 5000
MongoDB Connected: [server-address]
```

---

**MongoDB Version:** 7.0+  
**Driver:** Mongoose 7.5.0  
**Status:** Ready for Production  

🎉 **You're ready to use MongoDB!**
