import {
  LayoutDashboard,
  ShoppingBag,
  User,
  Settings,

  Package,
  Users,
  BarChart3,

} from 'lucide-react';

export const adminRoutes = [
  { label: 'Admin Overview', href: '/dashboard/admin', icon: BarChart3 },
  { label: 'Manage Products', href: '/dashboard/admin/products', icon: Package },
  { label: 'All Orders', href: '/dashboard/admin/orders', icon: ShoppingBag },
  { label: 'Customers', href: '/dashboard/admin/users', icon: Users },
  { label: 'Admin Settings', href: '/dashboard/admin/settings', icon: Settings },
];

export const userRoutes = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'My Orders', href: '/dashboard/orders', icon: ShoppingBag },
  { label: 'Profile', href: '/dashboard/profile', icon: User },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];
