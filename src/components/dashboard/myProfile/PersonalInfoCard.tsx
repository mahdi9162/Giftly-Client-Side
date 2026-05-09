import { Mail, Phone, User } from 'lucide-react';
import React from 'react';

const PersonalInfoCard = () => {
  return (
    <>
      <div className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl md:p-6">
        <h2 className="text-lg font-semibold text-slate-900">Personal Information</h2>
        <p className="mt-1 text-sm text-slate-500">Update your basic profile details.</p>

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <User className="h-4 w-4 text-primary" />
              Full Name
            </label>
            <input
              type="text"
              defaultValue="Mahdi Hasan"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
            />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Mail className="h-4 w-4 text-primary" />
              Email Address
            </label>
            <input
              type="email"
              defaultValue="mahdi@example.com"
              readOnly
              className="w-full cursor-not-allowed rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-400 outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Phone className="h-4 w-4 text-primary" />
              Phone Number
            </label>
            <input
              type="text"
              defaultValue="+880 1234 567 890"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfoCard;
