"use client";
import { useEffect, useRef, useState } from "react";
import {
  differenceInMilliseconds,
  format,
  formatDuration,
  intervalToDuration,
} from "date-fns";

interface CountdownProps {
  endDate: Date;
  initialTime?: number;
}

export default function Countdown({
  endDate,
  initialTime = 0,
}: CountdownProps) {
  const [timeRemaining, setTimeRemaining] = useState<number>(initialTime);

  useEffect(() => {
    const updateTimer = setInterval(() => {
      const now = new Date();
      const millisecondsRemaining = Math.max(
        0,
        differenceInMilliseconds(endDate, now)
      );
      setTimeRemaining(millisecondsRemaining);
    }, 1000);

    return () => clearInterval(updateTimer);
  }, [endDate]);

  const duration = intervalToDuration({ start: 0, end: timeRemaining });
  const formattedTimeRemaining = formatDuration(duration, {
    format: ["days", "hours", "minutes"],
  });
  return (
    <p className="mt-2 text-sm text-gray-600">
      Time Remaining: {formattedTimeRemaining}
    </p>
  );
}
