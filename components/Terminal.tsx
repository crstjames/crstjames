/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useTerminal } from "@/contexts/TerminalContext";
import { FaGithub, FaLinkedin, FaTerminal, FaTwitter, FaTelegram } from "react-icons/fa";
import { cn } from "@/lib/utils";

// First, let's define types for our commands
type CommandAction = () => string | React.ReactNode;

interface Command {
  description: string;
  action: CommandAction;
}

interface Commands {
  [key: string]: Command;
}

// Define commands and actions
const commands: {
  [key: string]: {
    description: string;
    action: (args: string[], terminal: Terminal) => void;
  };
} = {
  help: {
    description: "Shows available commands",
    action: (_args, terminal) => {
      terminal.addToHistory({
        type: "system",
        content: (
          <div className="mb-2">
            <p className="text-yellow-400 mb-1">Available commands:</p>
            <ul className="pl-4 space-y-1">
              {Object.entries(commands).map(([cmd, { description }]) => (
                <li key={cmd} className="flex">
                  <span className="text-emerald-400 w-28 font-mono">{cmd}</span>
                  <span className="text-gray-400">{description}</span>
                </li>
              ))}
            </ul>
          </div>
        ),
      });
    },
  },
  clear: {
    description: "Clears the terminal",
    action: (_args, terminal) => {
      terminal.clearHistory();
    },
  },
  hello: {
    description: "Greets you",
    action: (_args, terminal) => {
      terminal.addToHistory({
        type: "system",
        content: <p>Hello there! Welcome to my terminal.</p>,
      });
    },
  },
  cd: {
    description: "Change directory",
    action: (args, terminal) => {
      const targetDir = args[0] || "~";

      if (targetDir === "..") {
        const currentDirParts = terminal.currentDirectory.split("/").filter(Boolean);
        if (currentDirParts.length > 0) {
          currentDirParts.pop();
          const newDir = currentDirParts.join("/") || "~";
          terminal.setCurrentDirectory(newDir);
          terminal.addToHistory({
            type: "system",
            content: <p>Changed directory to {newDir}</p>,
          });
        } else {
          terminal.addToHistory({
            type: "error",
            content: <p>Already at root directory</p>,
          });
        }
      } else if (targetDir === "~") {
        terminal.setCurrentDirectory("~");
        terminal.addToHistory({
          type: "system",
          content: <p>Changed directory to ~</p>,
        });
      } else {
        const newDir = terminal.currentDirectory === "~" ? targetDir : `${terminal.currentDirectory}/${targetDir}`;
        terminal.setCurrentDirectory(newDir);
        terminal.addToHistory({
          type: "system",
          content: <p>Changed directory to {newDir}</p>,
        });
      }
    },
  },
  ls: {
    description: "List directory contents",
    action: (_args, terminal) => {
      const directories: { [key: string]: string[] } = {
        "~": ["documents", "projects", "contacts"],
        "~/documents": ["resume.pdf", "bio.txt"],
        "~/projects": ["portfolio.js", "blog.js", "experiments"],
        "~/contacts": ["github.txt", "linkedin.txt", "email.txt"],
        "~/projects/experiments": ["ai.js", "web3.js", "terminal.js"],
      };

      const currentDir = terminal.currentDirectory;
      const contents = directories[currentDir];

      if (contents) {
        terminal.addToHistory({
          type: "system",
          content: (
            <div className="grid grid-cols-3 gap-2">
              {contents.map((item) => (
                <span
                  key={item}
                  className={cn("font-mono", item.includes(".") ? "text-blue-400" : "text-emerald-400 font-bold")}
                >
                  {item}
                </span>
              ))}
            </div>
          ),
        });
      } else {
        terminal.addToHistory({
          type: "system",
          content: <p className="text-gray-400 italic">Empty directory</p>,
        });
      }
    },
  },
  // Function to handle navigation and clearing terminal state
  clearAndNavigate: {
    description: "Internal function for navigation",
    action: (args, terminal) => {
      const [url, isExternal, message] = args;

      terminal.addToHistory({
        type: "system",
        content: <p>{message || `Navigating to ${url}...`}</p>,
      });

      // Set a small timeout to show the navigation message
      setTimeout(() => {
        if (isExternal === "true") {
          window.open(url, "_blank");
        } else {
          terminal.router.push(url);
        }
        terminal.clearHistory();
        terminal.setIsTerminalOpen(false);
      }, 500);
    },
  },
  home: {
    description: "Go to home page",
    action: (_args, terminal) => {
      commands.clearAndNavigate.action(["/", "false", "Taking you home..."], terminal);
    },
  },
  resume: {
    description: "Go to resume page",
    action: (_args, terminal) => {
      commands.clearAndNavigate.action(["/resume", "false", "Opening resume..."], terminal);
    },
  },
  work: {
    description: "Go to work page",
    action: (_args, terminal) => {
      commands.clearAndNavigate.action(["/work", "false", "Showing work experience..."], terminal);
    },
  },
  github: {
    description: "Open GitHub profile",
    action: (_args, terminal) => {
      commands.clearAndNavigate.action(["https://github.com/crstjames", "true", "Opening GitHub profile..."], terminal);
    },
  },
  linkedin: {
    description: "Open LinkedIn profile",
    action: (_args, terminal) => {
      commands.clearAndNavigate.action(
        ["https://linkedin.com/in/crstjames", "true", "Opening LinkedIn profile..."],
        terminal
      );
    },
  },
  twitter: {
    description: "Open Twitter profile",
    action: (_args, terminal) => {
      commands.clearAndNavigate.action(
        ["https://twitter.com/crstjames", "true", "Opening Twitter profile..."],
        terminal
      );
    },
  },
  telegram: {
    description: "Open Telegram profile",
    action: (_args, terminal) => {
      commands.clearAndNavigate.action(["https://t.me/crstjames", "true", "Opening Telegram channel..."], terminal);
    },
  },
  about: {
    description: "Display information about me",
    action: (_args, terminal) => {
      terminal.addToHistory({
        type: "system",
        content: (
          <div className="space-y-2">
            <p className="text-yellow-400 font-bold">About Me</p>
            <p>I&apos;m a passionate developer focused on creating modern web experiences.</p>
            <p>My skills include React, Next.js, TypeScript, and more.</p>
            <div className="flex space-x-4 mt-2">
              <a
                href="https://github.com/crstjames"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://linkedin.com/in/crstjames"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="https://twitter.com/crstjames"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://t.me/crstjames"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTelegram size={20} />
              </a>
            </div>
          </div>
        ),
      });
    },
  },
  echo: {
    description: "Display a message",
    action: (args, terminal) => {
      terminal.addToHistory({
        type: "system",
        content: <p>{args.join(" ")}</p>,
      });
    },
  },
  date: {
    description: "Display current date and time",
    action: (_args, terminal) => {
      terminal.addToHistory({
        type: "system",
        content: <p>{new Date().toString()}</p>,
      });
    },
  },
};

// History item types
export type HistoryItem = {
  type: "command" | "response" | "system" | "error";
  content: React.ReactNode;
};

// Terminal component
export interface Terminal {
  addToHistory: (item: HistoryItem) => void;
  clearHistory: () => void;
  currentDirectory: string;
  setCurrentDirectory: (dir: string) => void;
  router: ReturnType<typeof useRouter>;
  setIsTerminalOpen: (isOpen: boolean) => void;
}

const Terminal = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { currentDirectory, setCurrentDirectory, setIsTerminalOpen } = useTerminal();

  useEffect(() => {
    inputRef.current?.focus();

    // Welcome message
    addToHistory({
      type: "system",
      content: (
        <div className="space-y-2">
          <div className="text-emerald-400 font-bold flex items-center">
            <FaTerminal className="mr-2" />
            Welcome to my interactive terminal!
          </div>
          <p className="text-gray-400">
            Type <span className="text-yellow-400 font-mono">help</span> to see available commands.
          </p>
        </div>
      ),
    });

    // Event listener for focus
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Scroll to bottom when history changes
  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!input.trim()) return;

    // Add command to history display
    addToHistory({
      type: "command",
      content: <span className="font-mono">{input}</span>,
    });

    // Process command
    const [command, ...args] = input.trim().split(" ");
    const cmd = commands[command.toLowerCase()];

    if (cmd) {
      cmd.action(args, {
        addToHistory,
        clearHistory,
        currentDirectory,
        setCurrentDirectory,
        router,
        setIsTerminalOpen,
      });
    } else {
      addToHistory({
        type: "error",
        content: <p>Command not found: {command}</p>,
      });
    }

    // Update command history for up/down navigation
    setCommandHistory((prev) => [input, ...prev].slice(0, 50));
    setCurrentCommandIndex(-1);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (currentCommandIndex < commandHistory.length - 1) {
        const newIndex = currentCommandIndex + 1;
        setCurrentCommandIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (currentCommandIndex > 0) {
        const newIndex = currentCommandIndex - 1;
        setCurrentCommandIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else if (currentCommandIndex === 0) {
        setCurrentCommandIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Simple tab completion
      const [partialCommand] = input.trim().split(" ");
      if (partialCommand) {
        const matches = Object.keys(commands).filter((cmd) => cmd.startsWith(partialCommand.toLowerCase()));
        if (matches.length === 1) {
          setInput(matches[0]);
        }
      }
    }
  };

  const addToHistory = (item: HistoryItem) => {
    setHistory((prev) => [...prev, item]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div
      className="h-full bg-black text-green-500 p-4 font-mono text-sm overflow-y-auto"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="space-y-2 pb-16">
        {history.map((item, index) => (
          <div key={index} className="leading-relaxed">
            {item.type === "command" && (
              <div className="flex">
                <span className="text-emerald-500 mr-2">
                  {currentDirectory}
                  <span className="text-purple-400">$</span>
                </span>
                <span className="text-white">{item.content}</span>
              </div>
            )}
            {item.type === "response" && <div className="text-green-400">{item.content}</div>}
            {item.type === "system" && <div className="text-gray-300">{item.content}</div>}
            {item.type === "error" && <div className="text-red-400">{item.content}</div>}
          </div>
        ))}
        <div ref={historyEndRef} />

        {/* Input Line */}
        <form onSubmit={handleSubmit} className="fixed bottom-4 left-4 right-4">
          <div className="flex items-center">
            <span className="text-emerald-500 whitespace-nowrap mr-2">
              {currentDirectory}
              <span className="text-purple-400">$</span>
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-white caret-green-500"
              autoComplete="off"
              spellCheck="false"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Terminal;
