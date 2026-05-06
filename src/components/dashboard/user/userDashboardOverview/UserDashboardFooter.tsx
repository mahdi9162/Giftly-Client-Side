import { User } from '@/hooks/useAuth';
import { Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  user: User | null;
};

const UserDashboardFooter = ({ user }: Props) => {
  const router = useRouter();
  return (
    <section className="rounded-[30px] border border-white/70 bg-white/85 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl md:p-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-r from-rose-500 to-fuchsia-500 text-lg font-bold text-white shadow-lg shadow-rose-200/50">
            {(user?.name?.charAt(0) || 'U').toUpperCase()}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">{user?.name || 'User'}</h3>
            <p className="text-sm text-slate-500">Keep your profile and preferences up to date</p>
          </div>
        </div>

        <button
          onClick={() => router.push('/dashboard/settings')}
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500 cursor-pointer"
        >
          <Settings className="h-4 w-4" />
          Open Settings
        </button>
      </div>
    </section>
  );
};

export default UserDashboardFooter;
