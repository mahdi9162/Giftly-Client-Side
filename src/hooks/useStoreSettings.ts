import { axiosInstance } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

type StoreSettings = {
  _id: string;
  storeName: string;
  supportEmail?: string;
  phone?: string;
  address?: string;
  currency?: string;
  logoUrl?: string;
};

type StoreSettingsResponse = {
  success: boolean;
  message: string;
  data: StoreSettings;
};

export const useStoreSettings = () => {
  const { data, isLoading, error } = useQuery<StoreSettingsResponse>({
    queryKey: ['store-settings'],
    queryFn: async () => {
      const res = await axiosInstance.get<StoreSettingsResponse>('/store');
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  return {
    store: data?.data,
    isLoading,
    error,
  };
};
