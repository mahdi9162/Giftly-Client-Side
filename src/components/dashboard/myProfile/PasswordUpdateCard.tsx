import { axiosInstance } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';
import { Eye, EyeOff, LockKeyhole } from 'lucide-react';
import React, { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

type PasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const PasswordUpdateCard = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordFormData>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const newPassword = useWatch({
    control,
    name: 'newPassword',
  });

  const updatePasswordMutation = useMutation({
    mutationFn: (payload: { currentPassword: string; newPassword: string }) => axiosInstance.patch('/users/me/password', payload),

    onSuccess: () => {
      alert('Password updated successfully!');
      reset();
    },

    onError: () => {
      alert('Failed to update password.');
    },
  });

  const handlePasswordUpdate = (data: PasswordFormData) => {
    const payload = {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    };

    updatePasswordMutation.mutate(payload);
  };

  return (
    <div className="mt-4 w-full rounded-2xl border border-rose-100 bg-rose-50/60 p-4 text-left">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
          <LockKeyhole className="h-4 w-4" />
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900">Password & Security</p>
          <p className="mt-0.5 text-xs text-slate-500">Update your password to keep your account secure.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(handlePasswordUpdate)} className="mt-4 space-y-3">
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Current Password</label>

          <div className="relative">
            <input
              type={showCurrentPassword ? 'text' : 'password'}
              {...register('currentPassword', {
                required: 'Current password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              placeholder="Enter current password"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-12 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-4 focus:ring-rose-100"
            />

            <button
              type="button"
              onClick={() => setShowCurrentPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-primary"
            >
              {showCurrentPassword ? <EyeOff className="h-4 w-4 cursor-pointer" /> : <Eye className="h-4 w-4 cursor-pointer" />}
            </button>
          </div>

          {errors.currentPassword?.message && <p className="mt-1 text-xs text-red-500">{String(errors.currentPassword.message)}</p>}
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">New Password</label>

          <div className="relative">
            <input
              type={showNewPassword ? 'text' : 'password'}
              {...register('newPassword', {
                required: 'New password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              placeholder="Enter new password"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-12 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-4 focus:ring-rose-100"
            />

            <button
              type="button"
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-primary"
            >
              {showNewPassword ? <EyeOff className="h-4 w-4 cursor-pointer" /> : <Eye className="h-4 w-4 cursor-pointer" />}
            </button>
          </div>

          {errors.newPassword?.message && <p className="mt-1 text-xs text-red-500">{String(errors.newPassword.message)}</p>}
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Confirm Password</label>

          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              {...register('confirmPassword', {
                required: 'Confirm password is required',
                validate: (value) => value === newPassword || 'Password did not match',
              })}
              placeholder="Confirm new password"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-12 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-4 focus:ring-rose-100"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-primary"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4 cursor-pointer" /> : <Eye className="h-4 w-4 cursor-pointer" />}
            </button>
          </div>

          {errors.confirmPassword?.message && <p className="mt-1 text-xs text-red-500">{String(errors.confirmPassword.message)}</p>}
        </div>

        <button
          type="submit"
          disabled={updatePasswordMutation.isPending}
          className="mt-2 inline-flex w-full items-center justify-center rounded-2xl bg-linear-to-r from-primary to-accent px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-200/50 transition hover:scale-[1.01] cursor-pointer"
        >
          {updatePasswordMutation.isPending ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
};

export default PasswordUpdateCard;
