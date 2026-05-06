'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Settings } from 'lucide-react';
import UserOverviewHeader from '@/components/dashboard/user/userDashboardOverview/UserOverviewHeader';
import UserStats from '@/components/dashboard/user/userDashboardOverview/UserStats';
import UserChart from '@/components/dashboard/user/userDashboardOverview/UserChart';
import UserRecentOrders from '@/components/dashboard/user/userDashboardOverview/UserRecentOrders';
import UserQuickActions from '@/components/dashboard/user/userDashboardOverview/UserQuickActions';
import UserDashboardFooter from '@/components/dashboard/user/userDashboardOverview/UserDashboardFooter';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios';

const orderTrend = [
  { name: 'Mon', orders: 1 },
  { name: 'Tue', orders: 2 },
  { name: 'Wed', orders: 1 },
  { name: 'Thu', orders: 3 },
  { name: 'Fri', orders: 2 },
  { name: 'Sat', orders: 2 },
  { name: 'Sun', orders: 1 },
];

const Page = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.role === 'admin') {
      router.push('/dashboard/admin');
    }
  }, [user, router]);

  const { data: userOrders } = useQuery({
    queryKey: ['user-orders'],
    queryFn: async () => {
      const res = await axiosInstance.get('/orders');
      return res?.data?.data;
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
        <UserRecentOrders />
      </section>

      {/* Quick actions */}
      <UserQuickActions />

      {/* card */}
      <UserDashboardFooter user={user} />
    </div>
  );
};

export default Page;
