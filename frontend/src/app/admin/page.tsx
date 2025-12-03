'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Common/Button';
import Card from '@/components/Common/Card';
import Input from '@/components/Common/Input';
import Modal from '@/components/Common/Modal';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import useAuthStore from '@/store/authStore';
import axios from 'axios';

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  image: string;
}

interface User {
  _id: string;
  email: string;
  fullName: string;
  role: string;
  createdAt: string;
}

interface Order {
  _id: string;
  userId: string;
  status: string;
  totalAmount: number;
  createdAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const { user, token } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'products' | 'users' | 'orders'>('products');
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Product form state
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'juice',
    price: '',
    stock: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    // Check if user is admin
    if (!user || user.role !== 'admin') {
      router.push('/');
    }
  }, [user, router]);

  useEffect(() => {
    if (activeTab === 'products') {
      fetchProducts();
    } else if (activeTab === 'users') {
      fetchUsers();
    } else if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = {
        ...productForm,
        price: parseFloat(productForm.price),
        stock: parseInt(productForm.stock),
      };

      if (editingProduct) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${editingProduct._id}`,
          data,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setShowModal(false);
      setProductForm({
        name: '',
        category: 'juice',
        price: '',
        stock: '',
        description: '',
        image: '',
      });
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      description: product.description,
      image: product.image,
    });
    setShowModal(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      setLoading(true);
      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setProductForm({
      name: '',
      category: 'juice',
      price: '',
      stock: '',
      description: '',
      image: '',
    });
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage products, users, and orders</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 font-semibold transition-colors ${
              activeTab === 'products'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            📦 Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 font-semibold transition-colors ${
              activeTab === 'users'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            👥 Users ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 font-semibold transition-colors ${
              activeTab === 'orders'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            📋 Orders ({orders.length})
          </button>
        </div>

        {/* Content */}
        {loading && (
          <div className="flex justify-center items-center h-96">
            <LoadingSpinner />
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && !loading && (
          <div>
            <div className="mb-6">
              <Button onClick={() => setShowModal(true)} variant="primary">
                ➕ Add New Product
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product._id} className="p-4">
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded mb-4"
                    />
                  )}
                  <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{product.category}</p>
                  <p className="text-gray-700 text-sm mb-2 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-primary font-bold">Rp {product.price.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEditProduct(product)}
                      variant="secondary"
                      size="sm"
                      className="flex-1"
                    >
                      ✏️ Edit
                    </Button>
                    <Button
                      onClick={() => handleDeleteProduct(product._id)}
                      variant="danger"
                      size="sm"
                      className="flex-1"
                    >
                      🗑️ Delete
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {products.length === 0 && (
              <Card className="p-8 text-center">
                <p className="text-gray-600">No products found</p>
              </Card>
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && !loading && (
          <div>
            <Card className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {users.map((u) => (
                    <tr key={u._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-800">{u.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">{u.fullName}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            u.role === 'admin'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {users.length === 0 && (
                <div className="p-8 text-center text-gray-600">No users found</div>
              )}
            </Card>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && !loading && (
          <div>
            <Card className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-800 font-mono">{order._id.slice(-8)}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-primary">
                        Rp {order.totalAmount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : order.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {orders.length === 0 && (
                <div className="p-8 text-center text-gray-600">No orders found</div>
              )}
            </Card>
          </div>
        )}
      </div>

      {/* Product Modal */}
      <Modal
        isOpen={showModal}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        onClose={handleCloseModal}
      >
        <form onSubmit={handleAddProduct} className="space-y-4">
          <Input
            label="Product Name"
            placeholder="Enter product name"
            value={productForm.name}
            onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
            required
          />

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select
              value={productForm.category}
              onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="juice">Juice</option>
              <option value="soda">Soda</option>
              <option value="coffee">Coffee</option>
              <option value="energy">Energy Drink</option>
              <option value="water">Water</option>
            </select>
          </div>

          <Input
            label="Price (Rp)"
            placeholder="Enter price"
            type="number"
            value={productForm.price}
            onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
            required
          />

          <Input
            label="Stock"
            placeholder="Enter stock quantity"
            type="number"
            value={productForm.stock}
            onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
            required
          />

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              placeholder="Enter product description"
              value={productForm.description}
              onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <Input
            label="Image URL"
            placeholder="Enter image URL"
            value={productForm.image}
            onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
          />

          <div className="flex gap-4 pt-4">
            <Button type="submit" variant="primary" className="flex-1" isLoading={loading}>
              {editingProduct ? 'Update Product' : 'Add Product'}
            </Button>
            <Button type="button" variant="secondary" onClick={handleCloseModal} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
