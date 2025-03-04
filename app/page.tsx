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
  const fullText = "stjames.dev\nWelcome to the personal site of\nChristopher St. James";

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

  // Typing animation
  useEffect(() => {
    // If we've typed all characters, stop
    if (charIndex >= fullText.length) {
      return;
    }

    const timeout = setTimeout(() => {
      setCharIndex((prev) => prev + 1);
    }, 100);

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
    <div className="h-screen bg-black max-w-7xl mx-auto px-4 font-mono flex flex-col relative overflow-hidden">
      {/* Retro grid background */}
      <div className="absolute inset-0 retro-grid opacity-20"></div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex justify-center"
        style={{ marginTop: "20vh" }}
      >
        <div className="flex flex-col items-start max-w-xl">
          {lines.map((line, lineIndex) => {
            // Determine if this line should be displayed yet
            const shouldDisplay = position.line > lineIndex || position.line === lineIndex;

            if (!shouldDisplay) return null;

            // Calculate how much of this line to show
            const displayText = position.line === lineIndex ? line.substring(0, position.char) : line;

            // Add indentation to lines after the first
            const indentClass = lineIndex === 0 ? "" : "ml-8";

            return (
              <div key={lineIndex} className={`flex items-center mb-3 ${indentClass}`}>
                {lineIndex === 0 && <span className="text-emerald-400 mr-2 text-2xl md:text-3xl">$</span>}
                <p
                  className={`font-mono ${
                    lineIndex === 0 ? "text-2xl md:text-3xl text-emerald-300" : "text-xl md:text-2xl text-gray-300"
                  } tracking-wide`}
                  style={lineIndex === 0 ? { filter: "drop-shadow(0 0 2px rgba(16, 185, 129, 0.3))" } : {}}
                >
                  {displayText}
                  {position.line === lineIndex && (
                    <span
                      className={`inline-block w-2.5 h-6 bg-emerald-400 ml-1 cursor-blink ${
                        cursorVisible ? "opacity-100" : "opacity-0"
                      }`}
                    ></span>
                  )}
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
