"use client";

import React, { useEffect, useRef, useState } from "react";

interface MatrixRainProps {
  className?: string;
}

const MatrixRain: React.FC<MatrixRainProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationRef = useRef<number>(0);

  // Set up the canvas dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current && canvasRef.current.parentElement) {
        const { clientWidth, clientHeight } = canvasRef.current.parentElement;
        setDimensions({
          width: clientWidth,
          height: clientHeight,
        });
      }
    };

    // Initial setup
    updateDimensions();

    // Listen for resize events
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Matrix animation effect
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0 || dimensions.height === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Set canvas dimensions with device pixel ratio for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    ctx.scale(dpr, dpr);

    // Style settings
    canvas.style.width = `${dimensions.width}px`;
    canvas.style.height = `${dimensions.height}px`;

    // Character set - using just binary for the Matrix look
    const chars = "01";
    const fontSize = 16;
    // Reduce column spacing slightly for better flow
    const columnSpacing = 1.5;
    const columns = Math.floor(dimensions.width / (fontSize * columnSpacing));

    // Color palette inspired by the gradient on the work page
    const colorPalette = [
      { main: "rgba(139, 92, 246, 0.9)", fade: "rgba(139, 92, 246, 0.5)" }, // Purple
      { main: "rgba(79, 70, 229, 0.9)", fade: "rgba(79, 70, 229, 0.5)" }, // Indigo
      { main: "rgba(59, 130, 246, 0.9)", fade: "rgba(59, 130, 246, 0.5)" }, // Blue
      { main: "rgba(16, 185, 129, 0.9)", fade: "rgba(16, 185, 129, 0.5)" }, // Emerald
      { main: "rgba(5, 150, 105, 0.9)", fade: "rgba(5, 150, 105, 0.5)" }, // Green
    ];

    // Drops start position - initialized outside visible area for a staggered entrance
    const drops: Array<{ pos: number; colorIndex: number }> = Array(columns)
      .fill(0)
      .map(() => ({
        pos: -Math.floor(Math.random() * 150),
        colorIndex: Math.floor(Math.random() * colorPalette.length),
      }));

    // For smoother animation, reduce frame skipping
    const isMobile = window.innerWidth < 768;
    const frameSkip = isMobile ? 1 : 1; // No frame skipping for smoother animation
    let frameCount = 0;

    // Speed control - adjusted to be moderately slow but not too slow
    const speedFactor = 0.18; // Faster than 0.12 but still slower than original
    let dropCounter = 0;

    // Pre-fill with black for better performance
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, 0, dimensions.width, dimensions.height);

    // Animation function
    const draw = () => {
      // Smoother frame rendering
      frameCount = (frameCount + 1) % frameSkip;
      if (frameCount !== 0) {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }

      // Semi-transparent black for smoother fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)"; // Adjusted for smoother transitions
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Set main style for characters
      ctx.font = `${fontSize}px monospace`;

      // Only increment drops on certain frames based on speedFactor
      dropCounter += speedFactor;
      const shouldUpdatePosition = dropCounter >= 1;

      if (shouldUpdatePosition) {
        dropCounter = 0;
      }

      // Draw the characters
      for (let i = 0; i < columns; i++) {
        // Reduce randomness but still skip some columns for performance
        if (Math.random() > 0.85) {
          continue; // Skip fewer columns (15% vs 30% before)
        }

        // Choose a random character
        const char = chars[Math.floor(Math.random() * chars.length)];

        // Get the drop's current color
        const dropColor = colorPalette[drops[i].colorIndex];

        // Use vibrant color for the bottom character (creating the "head")
        ctx.fillStyle = dropColor.main;

        // Draw the character
        const x = i * (fontSize * columnSpacing);
        const y = drops[i].pos * fontSize;

        // Only draw if within bounds
        if (y >= 0 && y < dimensions.height) {
          ctx.fillText(char, x, y);
        }

        // Draw a fading trail behind the head
        if (y >= fontSize && y < dimensions.height) {
          ctx.fillStyle = dropColor.fade;
          // Draw trailing characters with consistent density
          for (let j = 1; j <= 3; j++) {
            if (y - j * fontSize >= 0) {
              // Reduced randomness for smoother trails
              if (Math.random() > 0.15) {
                ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, y - j * fontSize);
              }
            }
          }
        }

        // Move the drop down and reset if it reaches bottom or randomly reset some drops
        if (drops[i].pos * fontSize > dimensions.height && Math.random() > 0.98) {
          drops[i].pos = 0;
          // Chance to change color when resetting
          if (Math.random() > 0.5) {
            drops[i].colorIndex = Math.floor(Math.random() * colorPalette.length);
          }
        }

        // Only update positions at the specified speed
        if (shouldUpdatePosition) {
          drops[i].pos++;
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    // Cleanup animation on unmount
    return () => cancelAnimationFrame(animationRef.current);
  }, [dimensions]);

  return <canvas ref={canvasRef} className={`absolute inset-0 z-0 ${className}`} style={{ opacity: 0.85 }} />;
};

export default MatrixRain;
