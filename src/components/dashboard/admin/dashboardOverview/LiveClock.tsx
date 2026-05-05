import { useEffect, useState } from 'react';

const LiveClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

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
    <div>
      <p className="text-sm text-slate-500">TODAY</p>
      <h2 className="text-lg font-semibold">{formattedDate}</h2>
      <p className="text-sm text-slate-400">{formattedTime}</p>
    </div>
  );
};

export default LiveClock;
