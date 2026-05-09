'use client';

import React from 'react';

import MyProfilePageHeader from '@/components/dashboard/myProfile/MyProfilePageHeader';
import ProfileImageCard from '@/components/dashboard/myProfile/ProfileImageCard';
import PasswordUpdateCard from '@/components/dashboard/myProfile/PasswordUpdateCard';
import PersonalInfoCard from '@/components/dashboard/myProfile/PersonalInfoCard';
import DefaultShippingAddCard from '@/components/dashboard/myProfile/DefaultShippingAddCard';

const ProfilePage = () => {
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
        <form className="space-y-6">
          {/* Personal Info */}
          <PersonalInfoCard />

          {/* Default Shipping Address */}
          <DefaultShippingAddCard />
        </form>
      </section>
    </div>
  );
};

export default ProfilePage;
