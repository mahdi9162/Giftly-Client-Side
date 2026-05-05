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

const stats = [
  {
    title: 'Total Revenue',
    value: '$12,480',
    change: '+12.5%',
    icon: DollarSign,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    title: 'Total Orders',
    value: '1,284',
    change: '+8.2%',
    icon: ShoppingBag,
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
  },
  {
    title: 'Products',
    value: '326',
    change: '+5.1%',
    icon: Package,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    title: 'Customers',
    value: '892',
    change: '+10.3%',
    icon: Users,
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-600',
  },
];

const weeklyData = [
  { name: 'Sun', revenue: 1400 },
  { name: 'Mon', revenue: 1900 },
  { name: 'Tue', revenue: 1750 },
  { name: 'Wed', revenue: 2400 },
  { name: 'Thu', revenue: 2850 },
  { name: 'Fri', revenue: 2300 },
  { name: 'Sat', revenue: 2650 },
];

const monthlyData = [
  { name: 'Week 1', revenue: 8200 },
  { name: 'Week 2', revenue: 9400 },
  { name: 'Week 3', revenue: 8800 },
  { name: 'Week 4', revenue: 10200 },
];

const recentOrders = [
  {
    id: '#GF-1024',
    customer: 'Ava Johnson',
    amount: '$84.00',
    status: 'Delivered',
  },
  {
    id: '#GF-1025',
    customer: 'Liam Smith',
    amount: '$42.00',
    status: 'Processing',
  },
  {
    id: '#GF-1026',
    customer: 'Sophia Lee',
    amount: '$129.00',
    status: 'Pending',
  },
  {
    id: '#GF-1027',
    customer: 'Noah Brown',
    amount: '$58.00',
    status: 'Delivered',
  },
];

const topProducts = [
  { name: 'Personalized Gift Box', sold: 124, revenue: '$2,480' },
  { name: 'Romantic Flower Bundle', sold: 98, revenue: '$1,860' },
  { name: 'Birthday Surprise Pack', sold: 86, revenue: '$1,640' },
];

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

  const chartData = range === 'weekly' ? weeklyData : monthlyData;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <OverviewHeader />
      {/* Stats */}
      <Stats stats={stats} />

      {/* Chart Section */}
      <ChartSection range={range} setRange={setRange} chartData={chartData} />

      {/* Middle grid */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.35fr_0.9fr]">
        {/* Recent orders */}
        <RecentOrders recentOrders={recentOrders} />
        
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
