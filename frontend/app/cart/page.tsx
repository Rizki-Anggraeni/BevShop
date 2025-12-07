'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, LoadingSpinner } from '@/components/Common';
import { useAuth } from '@/hooks';
import useCartStore from '@/store/cartStore';
import { cartService, orderService } from '@/services';
import { Cart } from '@/types';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

export default function CartPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { cart, setCart, removeItem, updateQuantity } = useCartStore();
  const [loading, setLoading] = useState(true);
  const [shippingInfo, setShippingInfo] = useState({
    street: '',
    city: '',
    province: '',
    zipCode: '',
    country: 'Indonesia',
  });
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    loadCart();
  }, [isAuthenticated]);

  const loadCart = async () => {
    setLoading(true);
    try {
      const response = await cartService.getCart();
      setCart(response.data);
    } catch (error) {
      toast.error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) {
      handleRemoveItem(productId);
      return;
    }
    try {
      await cartService.updateCartItem(productId, quantity);
      updateQuantity(productId, quantity);
    } catch (error) {
      toast.error('Failed to update cart');
    }
  };

  const handleRemoveItem = async (productId: string) => {
    try {
      await cartService.removeFromCart(productId);
      removeItem(productId);
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const handleCheckout = async () => {
    if (!shippingInfo.street || !shippingInfo.city || !shippingInfo.province) {
      toast.error('Please fill in all shipping information');
      return;
    }

    setIsCheckingOut(true);
    try {
      const orderData = {
        shippingAddress: shippingInfo,
        paymentMethod: 'bank_transfer',
      };
      await orderService.createOrder(orderData);
      toast.success('Order created successfully!');
      router.push('/orders');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Checkout failed');
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container-custom py-12">
        <div className="text-center">
          <h1 className="section-title">Your Cart is Empty</h1>
          <p className="section-subtitle mt-4 mb-8">Start shopping to add items to your cart</p>
          <Button onClick={() => router.push('/')}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-h-screen py-12">
      <div className="container-custom">
        <h1 className="section-title mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div key={item.product._id} className="card p-4 flex items-center gap-4">
                  <img
                    src={item.product.image || 'https://via.placeholder.com/100'}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                    <p className="text-sm text-gray-600">{item.product.brand}</p>
                    <p className="text-primary font-bold mt-1">
                      Rp {item.product.price.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)}
                      className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}
                      className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.product._id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                  >
                    <MdDelete size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Checkout Section */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="card p-6">
              <h2 className="font-bold text-lg mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4 pb-4 border-b">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rp {cart.totalPrice.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">Rp {cart.totalPrice.toLocaleString('id-ID')}</span>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="card p-6">
              <h2 className="font-bold text-lg mb-4">Shipping Address</h2>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Street"
                  value={shippingInfo.street}
                  onChange={(e) => setShippingInfo({...shippingInfo, street: e.target.value})}
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="City"
                  value={shippingInfo.city}
                  onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="Province"
                  value={shippingInfo.province}
                  onChange={(e) => setShippingInfo({...shippingInfo, province: e.target.value})}
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="ZIP Code"
                  value={shippingInfo.zipCode}
                  onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                  className="input-field"
                />
              </div>
            </div>

            <Button
              onClick={handleCheckout}
              isLoading={isCheckingOut}
              variant="primary"
              size="lg"
              className="w-full"
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
