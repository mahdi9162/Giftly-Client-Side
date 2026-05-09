'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import UserOverviewHeader from '@/components/dashboard/user/userDashboardOverview/UserOverviewHeader';
import UserStats from '@/components/dashboard/user/userDashboardOverview/UserStats';
import UserChart from '@/components/dashboard/user/userDashboardOverview/UserChart';
import UserRecentOrders from '@/components/dashboard/user/userDashboardOverview/UserRecentOrders';
import UserQuickActions from '@/components/dashboard/user/userDashboardOverview/UserQuickActions';
import UserDashboardFooter from '@/components/dashboard/user/userDashboardOverview/UserDashboardFooter';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios';

type OrderTrendTypes = {
  name: string;
  orders: number;
};

const Page = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.role === 'admin') {
      router.push('/dashboard/admin');
    }
  }, [user, router]);

  // stats and recent orders data
  const { data: userOrders } = useQuery({
    queryKey: ['user-orders'],
    queryFn: async () => {
      const res = await axiosInstance.get('/orders/overview');
      return res?.data?.data;
    },
  });

  // chart data
  const { data: orderTrend = [] } = useQuery<OrderTrendTypes[]>({
    queryKey: ['order-trend'],
    queryFn: async () => {
      const res = await axiosInstance.get('/orders/stats/weekly');
      return res?.data?.data as OrderTrendTypes[];
    },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <UserOverviewHeader user={user} />

      {/* Stats */}
      <UserStats userOrders={userOrders} />

      {/* Chart + Recent orders */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.35fr_1.35fr]">
        {/* Activity chart */}
        <UserChart orderTrend={orderTrend} />

        {/* Recent orders */}
        <UserRecentOrders userOrders={userOrders} />
      </section>

      {/* Quick actions */}
      <UserQuickActions />

      {/* card */}
      <UserDashboardFooter user={user} />
    </div>
  );
};

export default Page;
