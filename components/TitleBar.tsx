"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const TitleBar = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 h-8 ${
        theme === "dark" ? "bg-black text-green-400" : "bg-white text-black"
      } flex items-center justify-between px-4 border-b ${
        theme === "dark" ? "border-green-400/20" : "border-gray-200"
      } z-50`}
    >
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${theme === "dark" ? "bg-green-400/50" : "bg-gray-300"}`} />
        <div className={`w-3 h-3 rounded-full ${theme === "dark" ? "bg-green-400/50" : "bg-gray-300"}`} />
        <div className={`w-3 h-3 rounded-full ${theme === "dark" ? "bg-green-400/50" : "bg-gray-300"}`} />
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 font-mono">stjames.dev</div>
      <div className="font-mono">{time}</div>
    </div>
  );
};

export default TitleBar;
