import React from 'react';

const MyProfilePageHeader = () => {
  return (
    <section className="rounded-[28px] border border-white/60 bg-white/70 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl md:p-6">
      <p className="inline-flex w-fit rounded-full border border-rose-100 bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        Account
      </p>
      <h1 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl">My Profile</h1>
      <p className="mt-2 text-sm text-slate-500 md:text-base">Manage your profile, avatar, and default shipping details.</p>
    </section>
  );
};

export default MyProfilePageHeader;
