import React, { useState, useEffect } from "react";

function Countdown({ targetTime }) {
  const calculateTimeRemaining = () => {
    const currentTime = Math.floor(Date.now() / 1000);
    return targetTime / 1000 - currentTime;
  };

  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeRemaining();
      setTimeRemaining(remaining);

      if (remaining <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = Math.floor(timeRemaining) % 60;

  return (
    <div>
      {`${formatTime(hours)}h ${formatTime(minutes)}m ${formatTime(seconds)}s`}
    </div>
  );
}

export default Countdown;
