'use client';

import React, { useState } from 'react';
import { Search, Trash2, UserX, UserCheck, Ban } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios';
import { formattedDate } from '@/lib/utils';
import Pagination from '@/components/shared/Pagination';
import { useAuth } from '@/hooks/useAuth';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'blocked';
  createdAt: string;
  data: {
    data: User[];
  };
};

const AdminUser = () => {
  const [search, setSearch] = useState('');
  const [activeStatus, setActiveStatus] = useState('all');
  const [joined, setJoined] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);

  const { user: currentUser } = useAuth();
  const currentAdminId = currentUser?._id;

  const queryString: Record<string, string | number> = {};

  if (search !== '') {
    queryString.search = search;
  }
  if (activeStatus !== 'all') {
    queryString.status = activeStatus;
  }
  if (joined !== 'latest') {
    queryString.joined = joined;
  }
  queryString.page = currentPage;
  queryString.limit = 9;

  const { data } = useQuery({
    queryKey: ['users', queryString],
    queryFn: () => axiosInstance.get('/admin/users', { params: queryString }),
    staleTime: 1000 * 60 * 5,
  });

  const users = data?.data?.data || [];
  const totalPages = data?.data?.meta?.totalPages || 1;

  //----------------actions functions

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, newStatus }: { id: string; newStatus: User['status'] }) =>
      axiosInstance.patch(`/admin/users/${id}/status`, { status: newStatus }),

    onSuccess: (res) => {
      const updatedUser = res?.data?.data;

      queryClient.setQueriesData({ queryKey: ['users'] }, (oldData: User | undefined) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          data: {
            ...oldData.data,
            data: oldData.data.data.map((user: User) => (user._id === updatedUser._id ? updatedUser : user)),
          },
        };
      });

      toast.success('User status updated successfully');
    },

    onError: () => {
      toast.error('Failed to update user status');
    },
  });

  const handleUpdateStatus = (id: User['_id'], status: User['status']) => {
    mutation.mutate({ id, newStatus: status });
  };

  //------------------delete function

  const deleteMutation = useMutation({
    mutationFn: (id: string) => axiosInstance.delete(`/admin/users/${id}`),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });

      Swal.fire({
        title: 'Deleted!',
        text: 'User has been deleted successfully.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
    },

    onError: () => {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to delete user.',
        icon: 'error',
      });
    },
  });

  const handleDeleteButton = (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This user will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, delete',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="rounded-[28px] border border-white/60 bg-white/70 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-2 inline-flex rounded-full border border-rose-100 bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">
              User Management
            </p>
            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Customers</h1>
            <p className="mt-2 text-sm text-slate-500 md:text-base">Manage your users, monitor account status, and control access.</p>
          </div>

          <button className="rounded-2xl bg-linear-to-r from-rose-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-200/50 transition hover:scale-[1.01]">
            Export Users
          </button>
        </div>
      </section>

      {/* Search + Filters */}
      <section className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl md:p-6">
        <div className="flex flex-col gap-4">
          {/* Search */}

          {/* Filters */}
          <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <Search className="absolute left-4 lg:left-3 top-6 lg:top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              type="text"
              placeholder="Search users..."
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 outline-none focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
            />

            <select
              onChange={(e) => setActiveStatus(e.target.value)}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 focus:border-rose-300 focus:ring-4 focus:ring-rose-100 cursor-pointer"
            >
              <option value="all">Status: All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="blocked">Blocked</option>
            </select>

            <select
              onChange={(e) => setJoined(e.target.value)}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 focus:border-rose-300 focus:ring-4 focus:ring-rose-100 cursor-pointer"
            >
              <option value="latest">Joined: Latest</option>
              <option value="oldest">Oldest First</option>
              <option value="last-7-days">Last 7 Days</option>
              <option value="this-month">This Month</option>
            </select>
          </div>
        </div>
      </section>

      {/* Desktop Table */}
      <section className="hidden lg:block rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-245 border-separate border-spacing-y-3">
            <thead>
              <tr className="text-left text-xs uppercase tracking-[0.18em] text-slate-400">
                <th className="pb-2 pl-3">User</th>
                <th className="pb-2 pl-4">Email</th>
                <th className="pb-2 pl-6">Joined</th>
                <th className="pb-2 pl-3">Status</th>
                <th className="pb-2 text-center pr-6">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user: User) => {
                const isCurrentAdmin = user._id === currentAdminId;

                return (
                  <tr key={user._id} className="bg-slate-50/80">
                    <td className="rounded-l-2xl px-4 py-4">
                      <div>
                        <p className="font-semibold text-slate-800">{user.name}</p>
                        <p className="mt-1 text-xs text-slate-400">{user._id}</p>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-slate-500">{user.email}</td>

                    <td className="px-4 py-4 text-slate-600">{formattedDate(user.createdAt)}</td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          user.status === 'active'
                            ? 'bg-emerald-50 text-emerald-600'
                            : user.status === 'inactive'
                              ? 'bg-slate-100 text-slate-600'
                              : 'bg-rose-50 text-rose-500'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>

                    {/* Buttons */}
                    <td className="rounded-r-2xl px-4 py-4">
                      <div className="flex justify-end gap-2">
                        {isCurrentAdmin ? (
                          <span className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-medium text-slate-400">Current Admin</span>
                        ) : (
                          <>
                            {user.status === 'active' && (
                              <>
                                <button
                                  onClick={() => handleUpdateStatus(user._id, 'inactive')}
                                  className="inline-flex items-center gap-1 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-600 transition hover:bg-amber-100 cursor-pointer"
                                >
                                  <UserX className="h-4 w-4" />
                                  Deactivate
                                </button>

                                <button
                                  onClick={() => handleUpdateStatus(user._id, 'blocked')}
                                  className="inline-flex items-center gap-1 rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-100 cursor-pointer"
                                >
                                  <Ban className="h-4 w-4" />
                                  Block
                                </button>
                              </>
                            )}

                            {user.status === 'inactive' && (
                              <>
                                <button
                                  onClick={() => handleUpdateStatus(user._id, 'active')}
                                  className="inline-flex items-center gap-1 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-600 transition hover:bg-emerald-100 cursor-pointer"
                                >
                                  <UserCheck className="h-4 w-4" />
                                  Activate
                                </button>

                                <button
                                  onClick={() => handleUpdateStatus(user._id, 'blocked')}
                                  className="inline-flex items-center gap-1 rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-100 cursor-pointer"
                                >
                                  <Ban className="h-4 w-4" />
                                  Block
                                </button>
                              </>
                            )}

                            {user.status === 'blocked' && (
                              <button
                                onClick={() => handleUpdateStatus(user._id, 'active')}
                                className="inline-flex items-center gap-1 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-600 transition hover:bg-emerald-100 cursor-pointer"
                              >
                                <UserCheck className="h-4 w-4" />
                                Unblock
                              </button>
                            )}

                            <button
                              onClick={() => handleDeleteButton(user._id)}
                              className="inline-flex items-center gap-1 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-500 transition hover:bg-rose-100 cursor-pointer"
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Mobile / Tablet Cards */}
      <section className="grid gap-4 lg:hidden">
        {users.map((user: User) => {
          const isCurrentAdmin = user._id === currentAdminId;
          return (
            <div
              key={user._id}
              className="rounded-3xl border border-white/70 bg-white/85 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-800">{user.name}</p>
                  <p className="mt-1 text-sm text-slate-500">{user.email}</p>
                  <p className="mt-1 text-xs text-slate-400">{user._id}</p>
                </div>

                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    user.status === 'active'
                      ? 'bg-emerald-50 text-emerald-600'
                      : user.status === 'inactive'
                        ? 'bg-slate-100 text-slate-600'
                        : 'bg-rose-50 text-rose-500'
                  }`}
                >
                  {user.status}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 rounded-2xl bg-slate-50/80 p-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Joined</p>
                  <p className="mt-1 text-sm text-slate-600">{formattedDate(user.createdAt)}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {isCurrentAdmin ? (
                  <span className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-medium text-slate-400">Current Admin</span>
                ) : (
                  <>
                    {user.status === 'active' && (
                      <>
                        <button
                          onClick={() => handleUpdateStatus(user._id, 'inactive')}
                          className="inline-flex items-center gap-1 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-600 transition hover:bg-amber-100 cursor-pointer"
                        >
                          <UserX className="h-4 w-4" />
                          Deactivate
                        </button>

                        <button
                          onClick={() => handleUpdateStatus(user._id, 'blocked')}
                          className="inline-flex items-center gap-1 rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-100 cursor-pointer"
                        >
                          <Ban className="h-4 w-4" />
                          Block
                        </button>
                      </>
                    )}

                    {user.status === 'inactive' && (
                      <>
                        <button
                          onClick={() => handleUpdateStatus(user._id, 'active')}
                          className="inline-flex items-center gap-1 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-600 transition hover:bg-emerald-100 cursor-pointer"
                        >
                          <UserCheck className="h-4 w-4" />
                          Activate
                        </button>

                        <button
                          onClick={() => handleUpdateStatus(user._id, 'blocked')}
                          className="inline-flex items-center gap-1 rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-100 cursor-pointer"
                        >
                          <Ban className="h-4 w-4" />
                          Block
                        </button>
                      </>
                    )}

                    {user.status === 'blocked' && (
                      <button
                        onClick={() => handleUpdateStatus(user._id, 'active')}
                        className="inline-flex items-center gap-1 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-600 transition hover:bg-emerald-100 cursor-pointer"
                      >
                        <UserCheck className="h-4 w-4" />
                        Unblock
                      </button>
                    )}

                    <button
                      onClick={() => handleDeleteButton(user._id)}
                      className="inline-flex items-center gap-1 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-500 transition hover:bg-rose-100 cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </section>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default AdminUser;
