'use client';

import React, { useEffect } from 'react';
import MyProfilePageHeader from '@/components/dashboard/myProfile/MyProfilePageHeader';
import ProfileImageCard from '@/components/dashboard/myProfile/ProfileImageCard';
import PasswordUpdateCard from '@/components/dashboard/myProfile/PasswordUpdateCard';
import PersonalInfoCard from '@/components/dashboard/myProfile/PersonalInfoCard';
import DefaultShippingAddCard from '@/components/dashboard/myProfile/DefaultShippingAddCard';
import { useAuth } from '@/hooks/useAuth';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios';

export type ProfileFormData = {
  name: string;
  phone?: string;
  address: {
    street?: string;
    city?: string;
    postalCode?: string;
    country?: string;
  };
};

const ProfilePage = () => {
  const { user } = useAuth();

  const form = useForm<ProfileFormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: {
        street: '',
        city: '',
        postalCode: '',
        country: '',
      },
    },
  });

  const {
    reset,
    formState: { dirtyFields },
  } = form;

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || '',
        phone: user.phone || '',
        address: {
          street: user.address?.street || '',
          city: user.address?.city || '',
          postalCode: user.address?.postalCode || '',
          country: user.address?.country || '',
        },
      });
    }
  }, [user, reset]);

  // payload and call api for profile info + shipping address

  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation({
    mutationFn: (payload: Partial<ProfileFormData>) => axiosInstance.patch('/users/me/profile', payload),

    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['me'] });

      if (res?.data?.data) {
        reset({
          name: res.data.data.name || '',
          phone: res.data.data.phone || '',
          address: {
            street: res.data.data.address?.street || '',
            city: res.data.data.address?.city || '',
            postalCode: res.data.data.address?.postalCode || '',
            country: res.data.data.address?.country || '',
          },
        });
      }

      alert('Profile updated successfully!');
    },

    onError: () => {
      alert('Failed to update profile.');
    },
  });

  const handleProfileInfoUpdate = (data: ProfileFormData) => {
    const payload: Partial<ProfileFormData> = {};

    if (dirtyFields.name) {
      payload.name = data.name;
    }

    if (dirtyFields.phone) {
      payload.phone = data.phone;
    }

    if (dirtyFields.address) {
      payload.address = {};

      if (dirtyFields.address.street) {
        payload.address.street = data.address.street;
      }

      if (dirtyFields.address.city) {
        payload.address.city = data.address.city;
      }

      if (dirtyFields.address.postalCode) {
        payload.address.postalCode = data.address.postalCode;
      }

      if (dirtyFields.address.country) {
        payload.address.country = data.address.country;
      }
    }

    if (Object.keys(payload).length === 0) {
      alert('No changes to update.');
      return;
    }

    updateProfileMutation.mutate(payload);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <MyProfilePageHeader />

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        {/* Left Profile Card */}
        <div className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl md:p-6">
          <div className="flex flex-col items-center text-center">
            {/* Profile Imgae update card */}
            <ProfileImageCard user={user} />

            {/* password security */}
            <PasswordUpdateCard />
          </div>
        </div>

        {/* Right Form */}
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleProfileInfoUpdate)} className="space-y-6">
            {/* Personal Info */}
            <PersonalInfoCard user={user} />

            {/* Default Shipping Address */}
            <DefaultShippingAddCard />
          </form>
        </FormProvider>
      </section>
    </div>
  );
};

export default ProfilePage;
