"use client";

import React, { createContext, useContext, Dispatch, SetStateAction } from "react";

interface TerminalContextType {
  currentDirectory: string;
  setCurrentDirectory: Dispatch<SetStateAction<string>>;
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

export function TerminalProvider({ children }: { children: React.ReactNode }) {
  const [currentDirectory, setCurrentDirectory] = React.useState("~");

  return (
    <TerminalContext.Provider value={{ currentDirectory, setCurrentDirectory }}>{children}</TerminalContext.Provider>
  );
}

export function useTerminal() {
  const context = useContext(TerminalContext);
  if (context === undefined) {
    throw new Error("useTerminal must be used within a TerminalProvider");
  }
  return context;
}
