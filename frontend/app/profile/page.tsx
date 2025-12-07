'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks';
import { authService } from '@/services';
import { User } from '@/types';
import { Button, Input, LoadingSpinner } from '@/components/Common';
import { toast } from 'react-toastify';

export default function ProfilePage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<User>>({});

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    loadProfile();
  }, [isAuthenticated]);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const response = await authService.getProfile();
      setUser(response.data);
      setFormData(response.data);
    } catch (error) {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await authService.updateProfile(formData);
      setUser(formData as User);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="bg-light min-h-screen py-12">
      <div className="container-custom max-w-2xl">
        <h1 className="section-title mb-8">My Profile</h1>

        <div className="card p-8">
          {isEditing ? (
            <div className="space-y-6">
              <Input
                label="Full Name"
                value={formData.name || ''}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />

              <Input
                label="Email"
                type="email"
                value={formData.email || ''}
                disabled
              />

              <Input
                label="Phone"
                value={formData.phone || ''}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />

              <div>
                <h3 className="font-bold text-lg mb-4">Address</h3>
                <div className="space-y-4">
                  <Input
                    label="Street"
                    value={formData.address?.street || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      address: {...formData.address, street: e.target.value}
                    })}
                  />
                  <Input
                    label="City"
                    value={formData.address?.city || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      address: {...formData.address, city: e.target.value}
                    })}
                  />
                  <Input
                    label="Province"
                    value={formData.address?.province || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      address: {...formData.address, province: e.target.value}
                    })}
                  />
                  <Input
                    label="ZIP Code"
                    value={formData.address?.zipCode || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      address: {...formData.address, zipCode: e.target.value}
                    })}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="primary" onClick={handleSave}>Save Changes</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="text-lg font-semibold">{user?.name}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-lg font-semibold">{user?.email}</p>
              </div>

              {user?.phone && (
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="text-lg font-semibold">{user.phone}</p>
                </div>
              )}

              {user?.address && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Address</p>
                  <p className="font-semibold">{user.address.street}</p>
                  <p className="text-gray-700">{user.address.city}, {user.address.province} {user.address.zipCode}</p>
                </div>
              )}

              <Button variant="primary" onClick={() => setIsEditing(true)}>Edit Profile</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
