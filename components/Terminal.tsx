/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useTerminal } from "@/contexts/TerminalContext";

// First, let's define types for our commands
type CommandAction = () => string | JSX.Element;

interface Command {
  description: string;
  action: CommandAction;
}

interface Commands {
  [key: string]: Command;
}

const Terminal = () => {
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<Command[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { setIsTerminalOpen } = useTerminal();
  const router = useRouter();
  const { setTheme } = useTheme();

  const commands: Commands = {
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
    close: {
      description: "Close the terminal window",
      action: () => {
        setTimeout(() => setIsTerminalOpen(false), 500);
        return "Closing terminal...";
      },
    },
    quit: {
      description: "Close the terminal window",
      action: () => {
        setTimeout(() => setIsTerminalOpen(false), 500);
        return "Closing terminal...";
      },
    },
    exit: {
      description: "Close the terminal window",
      action: () => {
        setTimeout(() => setIsTerminalOpen(false), 500);
        return "Closing terminal...";
      },
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
      description: input,
      action: () => "",
    };

    if (commands[trimmedInput as keyof typeof commands]) {
      newCommand.action = commands[trimmedInput].action;
    } else {
      newCommand.action = () => `Command not found: ${input}. Type 'help' for available commands.`;
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
      {commandHistory.map((cmd, i) => (
        <div key={i} className="mb-2">
          <div className="flex items-center text-xs">
            <span className="text-gray-500">anon@stjames.dev %</span>
            <span className="ml-2">{cmd.description}</span>
          </div>
          {cmd.action() && <div className="mt-1 ml-4 text-xs">{cmd.action()}</div>}
        </div>
      ))}

      <form onSubmit={handleCommand} className="flex items-center text-xs">
        <span className="text-gray-500">anon@stjames.dev %</span>
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
