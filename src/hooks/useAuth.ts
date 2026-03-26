'use client';

import { axiosInstance } from '@/lib/axios';
import { useEffect, useState } from 'react';

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get('/users/me');

      const result = await res.data;

      if (result.success) {
        setUser(result.data);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const res = await axiosInstance.post('users/logout');
      const result = await res.data;

      if (result.success) {
        setUser(null);
      }
    } catch (error) {
      console.error(error);
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
