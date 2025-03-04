"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut } from "lucide-react";

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  alt: string;
}

export default function ImageLightbox({ isOpen, onClose, imageSrc, alt }: ImageLightboxProps) {
  const [scale, setScale] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Reset scale when new image is opened
  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setImageLoaded(false);
    }
  }, [isOpen, imageSrc]);

  // Handle Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        e.stopPropagation(); // Prevent the event from bubbling up
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown, true); // Using capture phase to handle before other listeners
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [isOpen, onClose]);

  // Handle zoom controls
  const zoomIn = () => setScale((prev) => Math.min(prev + 0.25, 3));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));

  // Handle image load to adjust scale appropriately
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setImageLoaded(true);

    // Auto-fit image to viewport if it's larger than the viewport
    const img = e.currentTarget;
    const viewportWidth = window.innerWidth * 0.8; // 80% of viewport width
    const viewportHeight = window.innerHeight * 0.8; // 80% of viewport height

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const viewportRatio = viewportWidth / viewportHeight;

    // If image is larger than viewport in either dimension, scale it down
    if (img.naturalWidth > viewportWidth || img.naturalHeight > viewportHeight) {
      if (imgRatio > viewportRatio) {
        // Width constrained
        setScale(viewportWidth / img.naturalWidth);
      } else {
        // Height constrained
        setScale(viewportHeight / img.naturalHeight);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              e.stopPropagation(); // Prevent click from reaching elements behind
              onClose();
            }}
          />

          {/* Image container - centered in viewport */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              e.stopPropagation(); // Prevent click from reaching elements behind
              onClose();
            }}
          >
            {/* Image wrapper with scrolling capability */}
            <motion.div
              className="relative bg-transparent rounded-lg overflow-auto flex items-center justify-center"
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                width: "auto",
                height: "auto",
              }}
              onClick={(e) => e.stopPropagation()} // Prevent close when clicking on container
            >
              {/* Controls */}
              <div className="absolute top-2 right-2 flex gap-2 z-10">
                <button
                  className="p-2 rounded-full bg-black/70 text-white hover:bg-emerald-500/80 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    zoomIn();
                  }}
                  aria-label="Zoom in"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
                <button
                  className="p-2 rounded-full bg-black/70 text-white hover:bg-emerald-500/80 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    zoomOut();
                  }}
                  aria-label="Zoom out"
                >
                  <ZoomOut className="w-5 h-5" />
                </button>
                <button
                  className="p-2 rounded-full bg-black/70 text-white hover:bg-emerald-500/80 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Loading indicator */}
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-emerald-500/50 border-t-emerald-500 rounded-full animate-spin"></div>
                </div>
              )}

              {/* Image with scaling - centered */}
              <div className="flex items-center justify-center w-full h-full">
                <motion.img
                  src={imageSrc}
                  alt={alt}
                  className="object-contain"
                  style={{
                    transform: `scale(${scale})`,
                    opacity: imageLoaded ? 1 : 0,
                    transition: "opacity 0.3s ease, transform 0.3s ease",
                    maxWidth: "100%",
                    maxHeight: "100%",
                  }}
                  animate={{ scale }}
                  transition={{ type: "spring", damping: 20 }}
                  draggable={false}
                  onLoad={handleImageLoad}
                />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
