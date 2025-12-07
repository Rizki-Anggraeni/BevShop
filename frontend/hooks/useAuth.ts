import { useEffect } from 'react';
import useAuthStore from '@/store/authStore';
import { authService } from '@/services';

export const useAuth = () => {
  const { user, token, isLoading, error, logout, setUser } = useAuthStore();

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken && !token) {
      useAuthStore.setState({ token: savedToken });
    }

    // If token exists but user/role is missing, fetch profile
    if (token && !user?.role) {
      fetchProfile();
    }
  }, [token]);

  const fetchProfile = async () => {
    try {
      const response = await authService.getProfile();
      // Response structure: { success: true, user: {...} }
      const userData = (response as any).data?.user || (response as any).user;
      if (userData) {
        const processedUser = {
          ...userData,
          id: userData.id || userData._id,
        };
        setUser(processedUser);
      }
    } catch (err) {
      // Silent fail - user might have invalid/expired token
      console.error('Failed to fetch profile:', err);
    }
  };

  const isAuthenticated = !!token;
  const isAdmin = user?.role === 'admin';

  return { user, token, isAuthenticated, isAdmin, isLoading, error, logout };
};
