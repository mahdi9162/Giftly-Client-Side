'use client';

import React, { useState } from 'react';
import { Package, ShoppingBag, Users, DollarSign } from 'lucide-react';
import OverviewHeader from '@/components/dashboard/admin/dashboardOverview/OverviewHeader';
import Stats from '@/components/dashboard/admin/dashboardOverview/Stats';
import ChartSection from '@/components/dashboard/admin/dashboardOverview/ChartSection';
import RecentOrders from '@/components/dashboard/admin/dashboardOverview/RecentOrders';
import TopProducts from '@/components/dashboard/admin/dashboardOverview/TopProducts';
import QuickActions from '@/components/dashboard/admin/dashboardOverview/QuickActions';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios';
import LowStockProducts from '@/components/dashboard/admin/dashboardOverview/LowStockProducts';

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

type LowStockProducts = {
  _id: string;
  name: string;
  category: string;
  stock: number;
};

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

  // low stock products
  const { data: lowStockProducts = [] } = useQuery({
    queryKey: ['low-stock'],
    queryFn: async () => {
      const res = await axiosInstance.get('/admin/products/low-stock');
      return res?.data?.data as LowStockProducts[];
    },
  });

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

        {/* Low stock products */}
        <LowStockProducts lowStockProducts={lowStockProducts} />
      </section>
    </div>
  );
};

export default AdminOverviewPage;
