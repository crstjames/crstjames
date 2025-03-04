"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

// Define types for non-standard browser APIs
interface MemoryInfo {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

interface ExtendedPerformance extends Performance {
  memory?: MemoryInfo;
}

interface ExtendedNavigator extends Navigator {
  deviceMemory?: number;
}

export default function Footer() {
  const [dateTime, setDateTime] = useState(new Date());
  const [fps, setFps] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState("N/A");
  const [renders, setRenders] = useState(0);

  const frameRef = useRef(0);
  const lastCalcTimeRef = useRef(performance.now());

  // Increment render count
  useEffect(() => {
    setRenders((prev) => prev + 1);
  }, []);

  // Update the time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate FPS and memory usage
  useEffect(() => {
    let animationFrameId: number;

    const updateStats = () => {
      // Update FPS calculation
      frameRef.current++;
      const now = performance.now();
      const elapsed = now - lastCalcTimeRef.current;

      if (elapsed >= 1000) {
        setFps(Math.round((frameRef.current * 1000) / elapsed));
        frameRef.current = 0;
        lastCalcTimeRef.current = now;

        // Try to get memory info if available in the browser
        const extendedPerformance = performance as ExtendedPerformance;
        if (extendedPerformance.memory) {
          const memoryInfo = extendedPerformance.memory;
          const usedHeapSizeMB = Math.round(memoryInfo.usedJSHeapSize / (1024 * 1024));
          setMemoryUsage(`${usedHeapSizeMB}MB`);
        } else {
          // Fallback to navigator.deviceMemory if available
          const extendedNavigator = navigator as ExtendedNavigator;
          if (extendedNavigator.deviceMemory) {
            setMemoryUsage(`${extendedNavigator.deviceMemory}GB`);
          }
        }
      }

      animationFrameId = requestAnimationFrame(updateStats);
    };

    animationFrameId = requestAnimationFrame(updateStats);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Format the date and time
  const formattedDateTime = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(dateTime);

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-10 bg-background/80 backdrop-blur-sm border-t border-gray-800/30 text-xs font-mono z-40">
      <div className="max-w-screen-xl mx-auto h-full px-4 flex items-center justify-between">
        {/* Left side - Stats (hidden on mobile) */}
        <div className="hidden md:flex space-x-4 text-emerald-400">
          <span>MEM: {memoryUsage}</span>
          <span>FPS: {fps}</span>
          <span>RENDER: {renders}</span>
        </div>

        {/* Middle - Powered by (always visible, repositioned on mobile) */}
        <div className="text-gray-300 absolute left-1/2 transform -translate-x-1/2 md:relative md:left-0 md:transform-none md:flex-1 md:text-center">
          Powered by{" "}
          <Link
            href="https://github.com/crstjames"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Saint
          </Link>
        </div>

        {/* Right side - Current time (hidden on mobile) */}
        <div className="hidden md:block text-gray-300">{formattedDateTime}</div>
      </div>
    </footer>
  );
}
