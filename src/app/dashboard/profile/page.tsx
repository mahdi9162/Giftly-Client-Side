'use client';

import React, { useEffect } from 'react';
import MyProfilePageHeader from '@/components/dashboard/myProfile/MyProfilePageHeader';
import ProfileImageCard from '@/components/dashboard/myProfile/ProfileImageCard';
import PasswordUpdateCard from '@/components/dashboard/myProfile/PasswordUpdateCard';
import PersonalInfoCard from '@/components/dashboard/myProfile/PersonalInfoCard';
import DefaultShippingAddCard from '@/components/dashboard/myProfile/DefaultShippingAddCard';
import { useAuth } from '@/hooks/useAuth';
import { FormProvider, useForm } from 'react-hook-form';

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

  const { reset } = form;

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

  // payload and api call for profile info + shipping address
  const handleProfileInfoUpdate = (data: ProfileFormData) => {
    console.log(data);
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
            <ProfileImageCard />

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
