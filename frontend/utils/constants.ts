// API endpoints
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// API Routes
export const API_ENDPOINTS = {
  // Auth
  AUTH_REGISTER: `${API_BASE_URL}/auth/register`,
  AUTH_LOGIN: `${API_BASE_URL}/auth/login`,
  AUTH_PROFILE: `${API_BASE_URL}/auth/profile`,
  
  // Products
  PRODUCTS_LIST: `${API_BASE_URL}/products`,
  PRODUCTS_DETAIL: (id: string) => `${API_BASE_URL}/products/${id}`,
  
  // Cart
  CART_GET: `${API_BASE_URL}/cart`,
  CART_ADD: `${API_BASE_URL}/cart/add`,
  CART_UPDATE: `${API_BASE_URL}/cart/update`,
  CART_REMOVE: `${API_BASE_URL}/cart/remove`,
  CART_CLEAR: `${API_BASE_URL}/cart/clear`,
  
  // Orders
  ORDERS_CREATE: `${API_BASE_URL}/orders`,
  ORDERS_MY: `${API_BASE_URL}/orders/my-orders`,
  ORDERS_DETAIL: (id: string) => `${API_BASE_URL}/orders/${id}`,
  
  // Reviews
  REVIEWS_CREATE: `${API_BASE_URL}/reviews`,
  REVIEWS_PRODUCT: (productId: string) => `${API_BASE_URL}/reviews/product/${productId}`,
};
