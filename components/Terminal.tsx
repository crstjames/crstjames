"use client";

import React from "react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useTerminal } from "@/contexts/TerminalContext";

interface Command {
  input: string;
  output: string | React.ReactNode;
  timestamp: string;
}

const Terminal = () => {
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<Command[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { currentDirectory, setCurrentDirectory } = useTerminal();
  const router = useRouter();
  const { setTheme } = useTheme();

  const commands = {
    help: {
      description: "Show available commands",
      action: () => (
        <div className="mt-2">
          <div className="text-green-400 mb-2">Available commands:</div>
          {Object.entries(commands).map(([cmd, info]) => (
            <div key={cmd} className="ml-4 text-gray-400">
              {cmd} - {info.description}
            </div>
          ))}
        </div>
      ),
    },
    clear: {
      description: "Clear terminal",
      action: () => {
        setCommandHistory([]);
        return "";
      },
    },
    home: {
      description: "Go to home page",
      action: () => {
        router.push("/");
        return "Navigating to home...";
      },
    },
    projects: {
      description: "View projects page",
      action: () => {
        router.push("/projects");
        return "Navigating to projects...";
      },
    },
    github: {
      description: "Open GitHub profile",
      action: () => {
        window.open("https://github.com/crstjames", "_blank");
        return "Opening GitHub profile...";
      },
    },
    linkedin: {
      description: "Open LinkedIn profile",
      action: () => {
        window.open("https://linkedin.com/in/crstjames", "_blank");
        return "Opening LinkedIn profile...";
      },
    },
    twitter: {
      description: "Open Twitter profile",
      action: () => {
        window.open("https://twitter.com/crstjames", "_blank");
        return "Opening Twitter profile...";
      },
    },
    "theme light": {
      description: "Switch to light theme",
      action: () => {
        setTheme("light");
        return "Switching to light theme...";
      },
    },
    "theme dark": {
      description: "Switch to dark theme",
      action: () => {
        setTheme("dark");
        return "Switching to dark theme...";
      },
    },
    theme: {
      description: "Usage: theme light|dark",
      action: () => "Usage: theme light|dark",
    },
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim().toLowerCase();

    if (!trimmedInput) return;

    // Special handling for clear command
    if (trimmedInput === "clear") {
      setCommandHistory([]);
      setInput("");
      return;
    }

    const newCommand: Command = {
      input: input,
      output: "",
      timestamp: new Date().toLocaleTimeString(),
    };

    if (commands[trimmedInput]) {
      newCommand.output = commands[trimmedInput].action();
    } else {
      newCommand.output = `Command not found: ${input}. Type 'help' for available commands.`;
    }

    setCommandHistory((prev) => [...prev, newCommand]);
    setInput("");
  };

  // Focus input on mount and click
  useEffect(() => {
    inputRef.current?.focus();
    const handleClick = () => inputRef.current?.focus();
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="h-full font-mono text-sm p-4 text-green-400">
      <div className="flex items-center text-xs mb-2">
        <span className="text-gray-500">crstjames@Christophers-MacBook-Pro</span>
        <span className="text-gray-500 mx-1">%</span>
      </div>

      {commandHistory.map((cmd, i) => (
        <div key={i} className="mb-2">
          <div className="flex items-center">
            <span className="text-gray-500">$</span>
            <span className="ml-2">{cmd.input}</span>
          </div>
          {cmd.output && <div className="mt-1 ml-4">{cmd.output}</div>}
        </div>
      ))}

      <form onSubmit={handleCommand} className="flex items-center">
        <span className="text-gray-500">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 ml-2 bg-transparent outline-none"
          autoFocus
          spellCheck={false}
        />
      </form>
    </div>
  );
};

export default Terminal;
