"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
// import { loadMarkdown } from "@/utils/loadMarkdown";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function HomePage() {
  // State to track which character we're currently at across all lines
  const [charIndex, setCharIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Define all the text as a single string with line breaks
  const fullText = "stjames.dev\nHi, I'm Christopher St. James!\nWelcome to my personal site";

  // Split the text into lines for rendering
  const lines = fullText.split("\n");

  // Calculate which line and character we're currently at
  const calculatePosition = (index: number) => {
    let remainingChars = index;
    let lineIndex = 0;

    // Find which line we're currently on
    while (lineIndex < lines.length) {
      if (remainingChars <= lines[lineIndex].length) {
        // Found the line
        return {
          line: lineIndex,
          char: remainingChars,
        };
      }

      // Move to next line, subtract this line's length (+1 for the newline character)
      remainingChars -= lines[lineIndex].length + 1;
      lineIndex++;
    }

    // If we've typed all characters
    return {
      line: lines.length - 1,
      char: lines[lines.length - 1].length,
    };
  };

  // Get the current position
  const position = calculatePosition(charIndex);

  // Typing animation - faster speed (50ms instead of 100ms)
  useEffect(() => {
    // If we've typed all characters, stop
    if (charIndex >= fullText.length) {
      return;
    }

    const timeout = setTimeout(() => {
      setCharIndex((prev) => prev + 1);
    }, 50); // Reduced from 100ms to 50ms for faster typing

    return () => clearTimeout(timeout);
  }, [charIndex, fullText.length]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="flex h-[calc(100vh-106px)] flex-col items-center justify-start pt-32 overflow-hidden">
      <motion.div className="w-full px-4 flex justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex flex-col items-start">
          {/* Render each line with a typing effect */}
          {lines.map((line, lineIndex) => {
            // Determine if this line should be displayed yet
            const position = calculatePosition(charIndex);
            const isLineVisible = position.line > lineIndex || position.line === lineIndex;

            // For the current line, determine how many characters to show
            const charsToShow = position.line === lineIndex ? position.char : line.length;

            // Only show lines that should be visible
            if (!isLineVisible) return null;

            // For the first line (title), use special styling with ~$ prefix
            if (lineIndex === 0) {
              return (
                <div key={lineIndex} className="mb-4">
                  <div className="inline-flex items-center">
                    <span className="text-emerald-400 mr-0.5 text-xl md:text-2xl">~</span>
                    <span className="text-violet-400 text-xl md:text-2xl">$</span>
                    <span className="text-emerald-400 font-mono text-xl md:text-2xl ml-2">
                      {line.substring(0, charsToShow)}
                    </span>
                    {position.line === lineIndex && position.char === line.length && cursorVisible && (
                      <span className="animate-blink text-emerald-400 ml-0.5">▎</span>
                    )}
                  </div>
                </div>
              );
            }

            // For other lines (welcome text, name)
            else {
              return (
                <div key={lineIndex} className="mb-4">
                  <div className="inline-flex items-center">
                    <span className="text-gray-300 font-mono text-lg md:text-xl">{line.substring(0, charsToShow)}</span>
                    {position.line === lineIndex && position.char === line.length && cursorVisible && (
                      <span className="animate-blink text-gray-300 ml-0.5">▎</span>
                    )}
                  </div>
                </div>
              );
            }
          })}

          {/* Navigation buttons that fade in after typing is complete */}
          {position.line >= lines.length - 1 && position.char >= lines[lines.length - 1].length && (
            <motion.div
              className="flex flex-row space-x-4 mt-8 w-full justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <a
                href="/resume"
                className="font-mono text-sm sm:text-lg md:text-xl inline-flex items-center justify-center border border-emerald-500 rounded-md px-3 sm:px-4 py-2 text-emerald-400 hover:bg-emerald-500/10 transition-colors min-w-24 sm:min-w-32"
              >
                <span className="text-emerald-400">View Resume</span>
              </a>

              <a
                href="/work"
                className="font-mono text-sm sm:text-lg md:text-xl inline-flex items-center justify-center border border-emerald-500 rounded-md px-3 sm:px-4 py-2 text-emerald-400 hover:bg-emerald-500/10 transition-colors min-w-24 sm:min-w-32"
              >
                <span className="text-emerald-400">View Projects</span>
              </a>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
