"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
// import { loadMarkdown } from "@/utils/loadMarkdown";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import MatrixRain from "@/components/MatrixRain";

export default function HomePage() {
  // Force a repaint on component mount to ensure animations are visible
  useEffect(() => {
    // Small timeout to ensure the component is fully mounted
    const timer = setTimeout(() => {
      // Force a repaint by toggling a class on the body
      document.body.classList.add("force-repaint");
      setTimeout(() => {
        document.body.classList.remove("force-repaint");
      }, 10);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black max-w-7xl mx-auto px-4 pt-24 pb-32 font-mono flex flex-col items-center relative overflow-hidden">
      {/* Matrix Rain effect in the background */}
      <MatrixRain />

      {/* Position the content in the top 1/4 of the page */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 backdrop-blur-sm bg-black/30 p-8 rounded-lg border border-emerald-500/20 mt-8"
      >
        <div className="relative text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-foreground/90">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-emerald-500"
            >
              stjames.dev
            </motion.span>
          </h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex justify-center items-center gap-2 text-muted-foreground"
          >
            <span className="text-emerald-500">&gt;</span>
            <span className="text-sm md:text-base text-emerald-300">Welcome to my personal site</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Add spacer to ensure no overlap with terminal */}
      <div className="h-32"></div>
    </div>
  );
}
