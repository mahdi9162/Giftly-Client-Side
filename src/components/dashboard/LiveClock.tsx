'use client';

import { Clock3 } from 'lucide-react';
import { useEffect, useState } from 'react';

const LiveClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const formattedDate = `${time.getDate()} ${time.toLocaleString('en-US', {
    month: 'short',
  })}, ${time.getFullYear()}`;

  return (
    <div className="w-full max-w-sm rounded-[28px] border border-rose-100 bg-white/85 p-5 shadow-[0_22px_55px_rgba(244,63,94,0.12)] backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 shadow-sm">
          <Clock3 className="h-7 w-7" />
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-rose-400">Today</p>

          <p className="mt-1 text-xl font-extrabold text-slate-900">{formattedDate}</p>

          <p className="mt-1 text-sm font-semibold text-slate-500">{formattedTime}</p>
        </div>
      </div>
    </div>
  );
};

export default LiveClock;
