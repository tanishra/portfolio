'use client';

import { useState, useEffect } from 'react';

export default function useISTTime() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata',
      }).toUpperCase();
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}
