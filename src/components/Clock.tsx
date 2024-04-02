import React, { useState, useEffect, useRef, useCallback } from 'react';

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const minuteRef = useRef<HTMLDivElement>(null);
  const hourRef = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);

  const updateClockHands = useCallback(() => {
    if (!minuteRef.current || !hourRef.current || !secondRef.current || !timeRef.current) {
      return;
    }

    const minuteDeg = 180 + (360 / 60) * time.getMinutes() + (360 / 3600) * time.getSeconds();
    const secondDeg = 180 + (360 / 60) * time.getSeconds();
    const hourDeg = 180 + (360 / 12) * time.getHours() + (360 / 720) * time.getMinutes();

    minuteRef.current.style.transform = `rotateZ(${minuteDeg}deg)`;
    hourRef.current.style.transform = `rotateZ(${hourDeg}deg)`;
    secondRef.current.style.transform = `rotateZ(${secondDeg}deg)`;
    const formattedTime = time.toLocaleTimeString('en-US', { hour12: true });
    const [hour, minute, second] = formattedTime.split(':').map((part) => parseInt(part));

    timeRef.current.textContent = `${hour}:${minute.toString().padStart(2, '0')}:${second
      .toString()
      .padStart(2, '0')}`;
  }, [minuteRef, hourRef, secondRef, timeRef, time]);

  useEffect(() => {
    const tick = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    updateClockHands();
  }, [time, updateClockHands]);

  return (
    <div className="wrap">
      <div className="clock-wrap">
        <svg>
          <circle cx="150" cy="150" r="150" />
        </svg>
        <div className="clock-root">
          <div className="point" />
        </div>
        <div className="hand-wrap">
          <div className="hand minute-hand" ref={minuteRef} />
        </div>
        <div className="hand-wrap">
          <div className="hand second-hand" ref={secondRef} />
        </div>
        <div className="hand-wrap">
          <div className="hand hour-hand" ref={hourRef} />
        </div>
        <div className="bottom-time" ref={timeRef} />
      </div>
    </div>
  );
};
export default Clock;
