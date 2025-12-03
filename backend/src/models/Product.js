const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    trim: true,
    maxlength: [100, 'Product name cannot be more than 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide product description'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide product price'],
    min: [0, 'Price cannot be negative'],
  },
  category: {
    type: String,
    required: [true, 'Please provide product category'],
    enum: ['soft_drink', 'juice', 'water', 'coffee', 'tea', 'energy_drink', 'other'],
  },
  image: {
    type: String,
    default: null,
  },
  stock: {
    type: Number,
    required: [true, 'Please provide product stock'],
    default: 0,
    min: [0, 'Stock cannot be negative'],
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  reviews: {
    type: Number,
    default: 0,
  },
  volume: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', productSchema);
