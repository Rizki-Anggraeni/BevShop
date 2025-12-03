import apiService from './apiService';
import { API_ENDPOINTS } from '@/utils/constants';
import { Product } from '@/types';

export const productService = {
  getAll: async (params?: {
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    limit?: number;
  }) => {
    return apiService.get(API_ENDPOINTS.PRODUCTS_LIST, { params });
  },

  getById: async (id: string) => {
    return apiService.get<Product>(API_ENDPOINTS.PRODUCTS_DETAIL(id));
  },

  search: async (query: string, category?: string) => {
    return apiService.get(API_ENDPOINTS.PRODUCTS_LIST, {
      params: { search: query, category },
    });
  },

  getByCategory: async (category: string) => {
    return apiService.get(API_ENDPOINTS.PRODUCTS_LIST, {
      params: { category },
    });
  },

  filterByPrice: async (minPrice: number, maxPrice: number) => {
    return apiService.get(API_ENDPOINTS.PRODUCTS_LIST, {
      params: { minPrice, maxPrice },
    });
  },
};

export const authService = {
  register: async (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    return apiService.post(API_ENDPOINTS.AUTH_REGISTER, data);
  },

  login: async (email: string, password: string) => {
    return apiService.post(API_ENDPOINTS.AUTH_LOGIN, { email, password });
  },

  getProfile: async () => {
    return apiService.get(API_ENDPOINTS.AUTH_PROFILE);
  },

  updateProfile: async (data: any) => {
    return apiService.put(API_ENDPOINTS.AUTH_PROFILE, data);
  },
};

export const cartService = {
  getCart: async () => {
    return apiService.get(API_ENDPOINTS.CART_GET);
  },

  addToCart: async (productId: string, quantity: number) => {
    return apiService.post(API_ENDPOINTS.CART_ADD, { productId, quantity });
  },

  updateCartItem: async (productId: string, quantity: number) => {
    return apiService.put(API_ENDPOINTS.CART_UPDATE, { productId, quantity });
  },

  removeFromCart: async (productId: string) => {
    return apiService.post(API_ENDPOINTS.CART_REMOVE, { productId });
  },

  clearCart: async () => {
    return apiService.delete(API_ENDPOINTS.CART_CLEAR);
  },
};

export const orderService = {
  createOrder: async (data: {
    shippingAddress: any;
    paymentMethod: string;
  }) => {
    return apiService.post(API_ENDPOINTS.ORDERS_CREATE, data);
  },

  getMyOrders: async () => {
    return apiService.get(API_ENDPOINTS.ORDERS_MY);
  },

  getOrderById: async (id: string) => {
    return apiService.get(API_ENDPOINTS.ORDERS_DETAIL(id));
  },
};

export const reviewService = {
  createReview: async (data: {
    productId: string;
    rating: number;
    title: string;
    comment: string;
  }) => {
    return apiService.post(API_ENDPOINTS.REVIEWS_CREATE, data);
  },

  getProductReviews: async (productId: string, page = 1) => {
    return apiService.get(API_ENDPOINTS.REVIEWS_PRODUCT(productId), {
      params: { page },
    });
  },
};
