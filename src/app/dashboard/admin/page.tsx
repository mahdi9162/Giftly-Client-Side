'use client';

import React, { useState } from 'react';
import { Package, ShoppingBag, Users, DollarSign, BadgeCheck, AlertCircle } from 'lucide-react';
import OverviewHeader from '@/components/dashboard/admin/dashboardOverview/OverviewHeader';
import Stats from '@/components/dashboard/admin/dashboardOverview/Stats';
import ChartSection from '@/components/dashboard/admin/dashboardOverview/ChartSection';
import RecentOrders from '@/components/dashboard/admin/dashboardOverview/RecentOrders';
import TopProducts from '@/components/dashboard/admin/dashboardOverview/TopProducts';
import QuickActions from '@/components/dashboard/admin/dashboardOverview/QuickActions';
import RecentActivity from '@/components/dashboard/admin/dashboardOverview/RecentActivity';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios';

type AdminOverviewData = {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
};

type SalesOverviewData = {
  range: 'weekly' | 'monthly';
  totalRevenue: number;
  totalOrders: number;
  bestLabel: string;
  orderTrend: number;
  chartData: {
    label: string;
    revenue: number;
    orderCount: number;
  }[];
};

type RecentOrder = {
  _id: string;
  customerInfo: {
    fullName: string;
    email: string;
  };
  total: number;
  orderStatus: string;
};

type TopProducts = {
  name: string;
  totalSold: number;
  totalRevenue: number;
};

const activity = [
  {
    title: 'New order placed',
    desc: 'A new order has been placed by Ava Johnson.',
    icon: ShoppingBag,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    title: 'Product stock running low',
    desc: '“Romantic Flower Bundle” stock is getting low.',
    icon: AlertCircle,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    title: 'Order delivered successfully',
    desc: 'Order #GF-1021 has been delivered.',
    icon: BadgeCheck,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
];

const AdminOverviewPage = () => {
  const [range, setRange] = useState<'weekly' | 'monthly'>('weekly');

  // Overview Data
  const { data: overviewRes } = useQuery({
    queryKey: ['admin-overview'],
    queryFn: async () => {
      const res = await axiosInstance.get('/admin/dashboard/stats');
      return res.data.data as AdminOverviewData;
    },
  });

  // sales overview
  const { data: salesOverview } = useQuery({
    queryKey: ['admin-sales-overview', range],
    queryFn: async () => {
      const res = await axiosInstance.get(`/admin/dashboard/sales-overview?range=${range}`);
      return res.data.data as SalesOverviewData;
    },
  });

  // stats
  const dashboardStats = [
    {
      title: 'Total Revenue',
      value: `$${overviewRes?.totalRevenue || 0}`,
      change: '+12.5%',
      icon: DollarSign,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
    },
    {
      title: 'Total Orders',
      value: `${overviewRes?.totalOrders || 0}`,
      change: '+8.2%',
      icon: ShoppingBag,
      iconBg: 'bg-violet-50',
      iconColor: 'text-violet-600',
    },
    {
      title: 'Products',
      value: `${overviewRes?.totalProducts || 0}`,
      change: '+5.1%',
      icon: Package,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
    },
    {
      title: 'Customers',
      value: `${overviewRes?.totalCustomers || 0}`,
      change: '+10.3%',
      icon: Users,
      iconBg: 'bg-sky-50',
      iconColor: 'text-sky-600',
    },
  ];

  // chart data
  const chartData =
    salesOverview?.chartData.map((item) => ({
      name: item.label,
      revenue: item.revenue,
    })) || [];

  // recent orders
  const { data: recentOrders = [] } = useQuery({
    queryKey: ['admin-recent-orders'],
    queryFn: async () => {
      const res = await axiosInstance.get('/admin/orders?limit=4');
      return res.data.data as RecentOrder[];
    },
  });

  const formattedRecentOrders = recentOrders.map((order) => ({
    id: `#${order._id.slice(-6).toUpperCase()}`,
    customer: order.customerInfo.fullName,
    amount: `$${order.total}`,
    status: order.orderStatus,
  }));

  // top products
  const { data: topProducts = [] } = useQuery({
    queryKey: ['top-products'],
    queryFn: async () => {
      const res = await axiosInstance.get('/admin/dashboard/top-products');
      return res?.data?.data as TopProducts[];
    },
  });

  console.log(topProducts);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <OverviewHeader />
      {/* Stats */}
      <Stats stats={dashboardStats} />

      {/* Chart Section */}
      <ChartSection range={range} setRange={setRange} chartData={chartData} salesOverview={salesOverview} />

      {/* Middle grid */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.35fr_0.9fr]">
        {/* Recent orders */}
        <RecentOrders recentOrders={formattedRecentOrders} />

        {/* Top products */}
        <TopProducts topProducts={topProducts} />
      </section>

      {/* Bottom grid */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[0.95fr_1.3fr]">
        {/* Quick actions */}
        <QuickActions />

        {/* Recent activity */}
        <RecentActivity activity={activity} />
      </section>
    </div>
  );
};

export default AdminOverviewPage;
