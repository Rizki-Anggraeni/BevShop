import { useEffect } from 'react';
import useAuthStore from '@/store/authStore';

export const useAuth = () => {
  const { user, token, isLoading, error, logout } = useAuthStore();

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken && !token) {
      useAuthStore.setState({ token: savedToken });
    }
  }, [token]);

  const isAuthenticated = !!token;
  const isAdmin = user?.role === 'admin';

  return { user, token, isAuthenticated, isAdmin, isLoading, error, logout };
};
