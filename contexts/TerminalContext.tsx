"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface TerminalContextType {
  isTerminalOpen: boolean;
  setIsTerminalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentDirectory: string;
  setCurrentDirectory: React.Dispatch<React.SetStateAction<string>>;
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

export function TerminalProvider({ children }: { children: React.ReactNode }) {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [currentDirectory, setCurrentDirectory] = useState("~");

  useEffect(() => {
    console.log("Terminal state changed:", isTerminalOpen);
  }, [isTerminalOpen]);

  return (
    <TerminalContext.Provider
      value={{
        isTerminalOpen,
        setIsTerminalOpen,
        currentDirectory,
        setCurrentDirectory,
      }}
    >
      {children}
    </TerminalContext.Provider>
  );
}

export function useTerminal() {
  const context = useContext(TerminalContext);
  if (!context) {
    throw new Error("useTerminal must be used within TerminalProvider");
  }
  return context;
}
