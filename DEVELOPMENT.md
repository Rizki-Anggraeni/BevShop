# Development Guide

Panduan untuk developer yang ingin berkontribusi atau mengembangkan aplikasi ini.

## 🎯 Coding Standards

### JavaScript/TypeScript

#### Naming Conventions
```javascript
// Variables & functions: camelCase
const userName = 'John';
const getUserData = () => {};

// Classes & Components: PascalCase
class UserModel {}
const ProductCard = () => {};

// Constants: SCREAMING_SNAKE_CASE
const API_BASE_URL = 'http://localhost:5000/api';
const MAX_RETRIES = 3;

// Private methods/variables: _leading underscore
const _privateMethod = () => {};
```

#### Code Organization
```javascript
// Order:
// 1. Imports
// 2. Types/Interfaces
// 3. Constants
// 4. Component/Function declaration
// 5. Helper functions
// 6. Exports

import React from 'react';
import { Button } from '@/components/Common';

interface Props {
  name: string;
}

const BUTTON_SIZE = 'md';

const MyComponent: React.FC<Props> = ({ name }) => {
  return <Button size={BUTTON_SIZE}>{name}</Button>;
};

export default MyComponent;
```

### React Components

#### Functional Components
```typescript
'use client';  // For Next.js App Router

import React from 'react';

interface ComponentProps {
  title: string;
  onClose?: () => void;
}

/**
 * Reusable component description
 * @param title - Component title
 * @param onClose - Callback when closing
 */
const MyComponent: React.FC<ComponentProps> = ({ title, onClose }) => {
  const [state, setState] = React.useState(false);

  const handleClick = () => {
    setState(true);
  };

  return (
    <div className="p-4">
      <h1>{title}</h1>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
};

export default MyComponent;
```

#### Component File Structure
```
ComponentName/
├── ComponentName.tsx    # Main component
├── index.tsx           # Export
├── styles.ts           # (Optional) CSS-in-JS
└── types.ts            # (Optional) Component types
```

### Backend (Express.js)

#### Controller Pattern
```javascript
// controllers/userController.js

/**
 * Get user by ID
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Express next middleware
 */
exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validation
    if (!id) {
      return res.status(400).json({ message: 'ID is required' });
    }

    // Business logic
    const user = await User.findById(id);

    // Error handling
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Response
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error); // Pass to error handler middleware
  }
};
```

#### Model Pattern
```javascript
// models/Product.js

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    maxlength: [100, 'Name cannot exceed 100 characters'],
  },
  price: {
    type: Number,
    required: true,
    validate: {
      validator: function(v) {
        return v >= 0;
      },
      message: 'Price must be positive',
    },
  },
}, { timestamps: true });

// Add indexes for frequently queried fields
productSchema.index({ category: 1 });
productSchema.index({ name: 'text' });

module.exports = mongoose.model('Product', productSchema);
```

## 📝 Git Workflow

### Branch Naming Convention
```
feature/[feature-name]      # New feature
bugfix/[bug-name]           # Bug fix
refactor/[component-name]   # Refactoring
docs/[doc-name]            # Documentation
chore/[task-name]          # Maintenance tasks
```

### Commit Message Format
```
Type: Description

Details (optional)

Fixes #123

---

Types:
feat: New feature
fix: Bug fix
docs: Documentation
style: Code style (formatting)
refactor: Code refactoring
test: Adding tests
chore: Dependencies, config changes
```

### Example Commits
```bash
git commit -m "feat: Add product search functionality"
git commit -m "fix: Cart total price calculation

- Fixed double counting in cart totals
- Added validation for quantity updates

Fixes #45"

git commit -m "refactor: Extract button component to reusable Common folder"
```

## 🔍 Code Review Checklist

### Frontend
- [ ] Component is reusable
- [ ] Props are properly typed
- [ ] Error handling present
- [ ] Loading states shown
- [ ] Responsive design works
- [ ] No console errors
- [ ] Tests written
- [ ] No hardcoded values
- [ ] Accessibility considered (alt text, labels)

### Backend
- [ ] Input validation present
- [ ] Error handling implemented
- [ ] Database operations optimal
- [ ] Security considerations (auth, injection)
- [ ] Response format consistent
- [ ] Status codes correct
- [ ] Tests written
- [ ] Documentation updated

## 🚀 Feature Development Workflow

### 1. Feature Planning
```
- Define requirements
- Create issue/ticket
- Discuss in team
- Set acceptance criteria
```

### 2. Create Branch
```bash
git checkout -b feature/my-new-feature
```

### 3. Development
```bash
# Frontend
cd frontend
npm run dev

# Backend
cd backend
npm run dev
```

### 4. Testing
```bash
# Frontend
npm test

# Backend
npm test
```

### 5. Commit Changes
```bash
git add .
git commit -m "feat: Add new feature description"
```

### 6. Push & Create PR
```bash
git push origin feature/my-new-feature
# Create Pull Request on GitHub
```

### 7. Code Review & Merge
```bash
# After approval
git checkout main
git merge feature/my-new-feature
```

## 🧪 Testing Guidelines

### Frontend Testing Example
```typescript
// components/Common/__tests__/Button.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button Component', () => {
  it('renders button with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('disables button when isLoading is true', () => {
    render(<Button isLoading>Click</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### Backend Testing Example
```javascript
// tests/controllers/authController.test.js

const request = require('supertest');
const app = require('../../src/server');
const User = require('../../src/models/User');

describe('Auth Controller', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('POST /api/auth/register', () => {
    it('should register new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
          confirmPassword: 'password123',
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.token).toBeDefined();
    });

    it('should fail with duplicate email', async () => {
      await User.create({
        name: 'John',
        email: 'john@example.com',
        password: 'hashed',
      });

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'john@example.com',
          password: 'password123',
          confirmPassword: 'password123',
        });

      expect(res.statusCode).toBe(400);
    });
  });
});
```

## 🐛 Debugging Tips

### Frontend Debugging
```typescript
// Use React DevTools browser extension
// Browser DevTools console for errors

// Debug state
console.log('Cart state:', useCartStore());

// Debug API calls
// Open Network tab in DevTools
// Check request/response headers and body

// Next.js specific
npm run build -- --debug
```

### Backend Debugging
```javascript
// Add logging
console.log('User found:', user);

// Use debugger
node --inspect src/server.js
// Then open chrome://inspect

// MongoDB debugging
// Use MongoDB Compass GUI
// or mongosh CLI

// Error logging middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  console.error('Stack:', err.stack);
  res.status(500).json({ error: err.message });
});
```

## 📚 Documentation Standards

### Code Comments
```typescript
// Good comments explain WHY, not WHAT

// ❌ Bad
const total = items.reduce((sum, item) => sum + item.price, 0);

// ✅ Good
// Calculate total price excluding taxes (VAT applied at checkout)
const total = items.reduce((sum, item) => sum + item.price, 0);
```

### JSDoc Format
```typescript
/**
 * Calculate shopping cart total
 * @param {Array<CartItem>} items - Items in cart
 * @param {number} taxRate - Tax rate as decimal (0.1 for 10%)
 * @returns {Object} Total and breakdown
 * @throws {Error} If items array is empty
 * 
 * @example
 * const total = calculateTotal(items, 0.1);
 * // Returns: { subtotal: 1000, tax: 100, total: 1100 }
 */
const calculateTotal = (items, taxRate) => {
  if (!items.length) throw new Error('Cart is empty');
  // ...
};
```

## 🔧 Useful Commands

### Frontend
```bash
# Development
npm run dev              # Start dev server
npm run build           # Production build
npm test               # Run tests
npm run lint           # Run linter

# Utilities
npm run type-check     # TypeScript check
npm run format         # Format code
```

### Backend
```bash
# Development
npm run dev            # Start dev server with nodemon
npm start             # Start production server
npm test              # Run tests

# Database
npm run seed          # Seed database (if available)
npm run migrate       # Run migrations (if available)
```

## 📊 Performance Profiling

### Frontend
```typescript
// Use React Profiler
import { Profiler } from 'react';

<Profiler id="ProductGrid" onRender={onRenderCallback}>
  <ProductGrid />
</Profiler>

// Use Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';
getCLS(console.log);
getLCP(console.log);
```

### Backend
```javascript
// Log response times
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} - ${duration}ms`);
  });
  next();
});

// Monitor database queries
mongoose.set('debug', true);
```

## 🤝 Contributing Guidelines

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Update documentation
6. Submit a pull request
7. Wait for code review
8. Address feedback
9. Merge and celebrate! 🎉

## ❓ FAQ

**Q: How do I add a new API endpoint?**
A: 
1. Create controller method
2. Add route in routes file
3. Test with Postman/Insomnia
4. Update frontend service
5. Create component to use it

**Q: How do I modify a database schema?**
A:
1. Update model in backend
2. Create migration (if using migrations)
3. Update types in frontend
4. Update API responses
5. Test all related features

**Q: How do I deploy the application?**
A: See SETUP_GUIDE.md for production build instructions

---

**Happy Coding! If you have questions, feel free to reach out.** 💪
