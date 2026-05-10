'use client';

import { useEffect, useState } from 'react';

export type User = {
  _id: string;
  profileImage: string;
  name: string;
  email: string;
  role: 'admin' | 'moderator' | 'user';

  phone?: string;
  address?: {
    street?: string;
    city?: string;
    postalCode?: string;
    country?: string;
  };
};

type UseAuthReturn = {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  refetchUser: () => Promise<void>;
};

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch('/api/auth/me', {
        method: 'GET',
        cache: 'no-store',
        credentials: 'include',
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setUser(result.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      const result = await res.json();

      if (result.success) {
        setUser(null);
        window.location.href = '/login';
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return {
    user,
    loading,
    logout,
    refetchUser: fetchUser,
  };
};
