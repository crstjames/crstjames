"use client";

import { useState, useEffect } from "react";

const TitleBar = () => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false }));
    };

    updateTime(); // Initial call
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-10 bg-nav-background backdrop-blur-lg border-b border-muted/20">
      <div className="max-w-screen-2xl mx-auto px-4 h-full flex items-center justify-between">
        <div className="w-20">{/* Left spacer */}</div>
        <div className="font-mono text-sm">stjames.dev</div>
        <div className="w-20 text-right font-mono text-sm">{time}</div>
      </div>
    </div>
  );
};

export default TitleBar;
