'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks';
import { orderService } from '@/services';
import { Order } from '@/types';
import { LoadingSpinner, Card } from '@/components/Common';
import { toast } from 'react-toastify';

export default function OrdersPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    loadOrders();
  }, [isAuthenticated]);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const response = await orderService.getMyOrders();
      setOrders(response.data || []);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container-custom py-12">
        <div className="text-center">
          <h1 className="section-title">No Orders Yet</h1>
          <p className="section-subtitle mt-4 mb-8">Start shopping to create your first order</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-h-screen py-12">
      <div className="container-custom">
        <h1 className="section-title mb-8">My Orders</h1>

        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order._id} className="p-6 hover:shadow-lg cursor-pointer transition-shadow" 
                  onClick={() => router.push(`/orders/${order._id}`)}>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
                <div>
                  <p className="text-sm text-gray-600">Order Number</p>
                  <p className="font-bold text-gray-900">{order.orderNumber}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-semibold">{new Date(order.createdAt).toLocaleDateString('id-ID')}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="font-bold text-primary">Rp {order.totalPrice.toLocaleString('id-ID')}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Items</p>
                  <p className="font-semibold">{order.items.length} items</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.orderStatus)}`}>
                    {order.orderStatus}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
