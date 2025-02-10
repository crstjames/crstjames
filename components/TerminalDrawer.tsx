import { useState, useEffect, useRef } from "react";
import Terminal from "./Terminal";
import { Cross2Icon, GripIcon } from "@radix-ui/react-icons";

interface TerminalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const TerminalDrawer = ({ isOpen, onClose }: TerminalDrawerProps) => {
  console.log("TerminalDrawer render:", { isOpen });

  const [height, setHeight] = useState(400); // Default height in pixels
  const dragRef = useRef<HTMLDivElement>(null);
  const startDragRef = useRef<{ y: number; height: number } | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!startDragRef.current) return;
      const dy = startDragRef.current.y - e.clientY;
      const newHeight = Math.max(200, Math.min(800, startDragRef.current.height + dy));
      setHeight(newHeight);
    };

    const handleMouseUp = () => {
      startDragRef.current = null;
      document.body.style.cursor = "";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Terminal Window */}
      <div
        style={{ height: `${height}px` }}
        className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl transform transition-all duration-300 ease-out ${
          isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        {/* Drag Handle */}
        <div
          ref={dragRef}
          className="absolute -top-3 left-0 right-0 h-6 flex justify-center items-center cursor-ns-resize group"
          onMouseDown={(e) => {
            startDragRef.current = { y: e.clientY, height };
            document.body.style.cursor = "ns-resize";
          }}
        >
          <div className="w-20 h-1 rounded-full bg-muted-foreground/20 group-hover:bg-muted-foreground/40 transition-colors" />
        </div>

        <div className="relative h-full bg-black border border-muted rounded-t-lg overflow-hidden">
          {/* Title Bar */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-black/50 backdrop-blur-sm border-b border-muted flex items-center justify-between px-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" onClick={onClose} />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="text-xs text-muted-foreground">Terminal</div>
            <div className="w-20" /> {/* Spacer for symmetry */}
          </div>

          {/* Terminal Content */}
          <div className="h-full pt-8">
            <Terminal />
          </div>
        </div>
      </div>
    </>
  );
};

export default TerminalDrawer;
