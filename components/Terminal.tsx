"use client";

import React from "react";
import { useState, useEffect, useRef, ReactElement } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useTerminal } from "@/contexts/TerminalContext";
import { loadMarkdown } from "@/utils/loadMarkdown";

interface Command {
  input: string;
  output: string | ReactElement;
  timestamp: string;
}

interface CommandConfig {
  description: string;
  action: () => string | ReactElement;
  aliases?: string[];
}

interface DirectoryConfig {
  welcomeMessage: string;
  availableCommands: string[];
  specialCommands?: Record<string, CommandConfig>;
}

const DIRECTORY_CONFIGS: Record<string, DirectoryConfig> = {
  "~": {
    welcomeMessage: "Welcome to stjames.dev terminal",
    availableCommands: [
      "help",
      "clear",
      "resume",
      "projects",
      "blog",
      "github",
      "linkedin",
      "twitter",
      "theme",
      "home",
    ],
  },
  "~/resume": {
    welcomeMessage: "Resume Directory - View and interact with my professional experience",
    availableCommands: ["help", "clear", "home", "download", "experience", "education", "skills"],
    specialCommands: {
      download: {
        description: "Download resume as PDF",
        action: () => {
          window.open("/resume.pdf", "_blank");
          return "Downloading resume...";
        },
      },
      experience: {
        description: "View work experience",
        action: () => "Displaying work experience...", // You can return a JSX element here
      },
      education: {
        description: "View education history",
        action: () => "Displaying education history...",
      },
      skills: {
        description: "View technical skills",
        action: () => "Displaying skills...",
      },
    },
  },
  "~/projects": {
    welcomeMessage: "Projects Directory - Browse my portfolio of work",
    availableCommands: ["help", "clear", "home", "list", "view", "github"],
    specialCommands: {
      list: {
        description: "List all projects",
        action: () => "Listing projects...",
      },
      view: {
        description: "View project details (usage: view <project-name>)",
        action: () => "Usage: view <project-name>",
      },
    },
  },
  "~/blog": {
    welcomeMessage: "Blog Directory - Read my latest posts",
    availableCommands: ["help", "clear", "home", "list", "read"],
    specialCommands: {
      list: {
        description: "List all blog posts",
        action: () => "Listing blog posts...",
      },
      read: {
        description: "Read a blog post (usage: read <post-id>)",
        action: () => "Usage: read <post-id>",
      },
    },
  },
};

const Terminal = () => {
  const [input, setInput] = useState("");
  const [commands, setCommands] = useState<Command[]>([]);
  const { currentDirectory, setCurrentDirectory } = useTerminal();
  const inputRef = useRef<HTMLInputElement>(null);
  const commandsEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { setTheme } = useTheme();
  const [resumeContent, setResumeContent] = useState("");

  // Get current directory configuration
  const getCurrentConfig = () => DIRECTORY_CONFIGS[currentDirectory] || DIRECTORY_CONFIGS["~"];

  const BASE_COMMANDS: Record<string, CommandConfig> = {
    help: {
      description: "Show available commands",
      action: () => {
        const currentConfig = getCurrentConfig();
        const availableCommands = {
          ...BASE_COMMANDS,
          ...(currentConfig.specialCommands || {}),
        };
        return (
          <div className="mt-2">
            <div className="text-green-400">Available commands:</div>
            <div className="ml-4">
              {currentConfig.availableCommands.map((cmd) => {
                const command = availableCommands[cmd];
                return (
                  <div key={cmd}>
                    {cmd} - {command?.description}
                    {command?.aliases && ` (aliases: ${command.aliases.join(", ")})`}
                  </div>
                );
              })}
            </div>
          </div>
        );
      },
    },
    clear: {
      description: "Clear the terminal",
      action: () => {
        setCommands([]);
        setInput("");
        return "";
      },
    },
    resume: {
      description: "View resume page",
      action: () => {
        router.push("/resume");
        setCurrentDirectory("~/resume");
        return "Navigating to resume...";
      },
    },
    projects: {
      description: "View projects page",
      action: () => {
        router.push("/projects");
        setCurrentDirectory("~/projects");
        return "Navigating to projects...";
      },
    },
    blog: {
      description: "View blog page",
      action: () => {
        router.push("/blog");
        setCurrentDirectory("~/blog");
        return "Navigating to blog...";
      },
    },
    home: {
      description: "Go to home page",
      action: () => {
        router.push("/");
        setCurrentDirectory("~");
        return "Navigating home...";
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
      description: "Open X/Twitter profile",
      aliases: ["x"],
      action: () => {
        window.open("https://twitter.com/crstjames", "_blank");
        return "Opening X/Twitter profile...";
      },
    },
    theme: {
      description: "Change theme (usage: theme light|dark)",
      action: () => "Usage: theme light|dark",
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
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const timestamp = new Date().toLocaleTimeString();
    const currentConfig = getCurrentConfig();

    if (trimmedCmd === "") return;

    if (trimmedCmd === "clear") {
      setCommands([]);
      setInput("");
      return;
    }

    const newCommand: Command = {
      input: cmd,
      output: "",
      timestamp,
    };

    const availableCommands = {
      ...BASE_COMMANDS,
      ...(currentConfig.specialCommands || {}),
    };

    const commandEntry = Object.entries(availableCommands).find(([key, config]) => {
      return key === trimmedCmd || config.aliases?.includes(trimmedCmd);
    });

    if (commandEntry && currentConfig.availableCommands.includes(trimmedCmd.split(" ")[0])) {
      newCommand.output = commandEntry[1].action();
    } else {
      newCommand.output = `Command not found: ${cmd}. Type 'help' for available commands.`;
    }

    setCommands((prev) => [...prev, newCommand]);
    setInput("");
  };

  // Update directory when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname;
      const newDirectory = path === "/" ? "~" : `~${path}`;
      setCurrentDirectory(newDirectory);
    };

    handleRouteChange(); // Initial call
    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    commandsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [commands]);

  // Focus input on click anywhere in terminal
  useEffect(() => {
    const handleClick = () => inputRef.current?.focus();
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Add this effect to handle directory changes
  useEffect(() => {
    if (currentDirectory === "~/resume") {
      fetch("/api/resume")
        .then((res) => res.text())
        .then((content) => {
          setResumeContent(content);
          const formattedResume = (
            <div className="whitespace-pre-wrap font-mono text-sm space-y-1">
              {content.split("\n").map((line, i) => {
                if (line.startsWith("# ")) {
                  return (
                    <h1
                      key={i}
                      className="text-green-400 font-bold text-xl mt-6 mb-4 border-b border-green-400/20 pb-2"
                    >
                      {line.slice(2)}
                    </h1>
                  );
                }
                if (line.startsWith("## ")) {
                  return (
                    <h2 key={i} className="text-blue-400 font-bold text-lg mt-6 mb-3 border-b border-blue-400/20 pb-1">
                      {line.slice(3)}
                    </h2>
                  );
                }
                if (line.startsWith("### ")) {
                  return (
                    <h3 key={i} className="text-yellow-400 font-bold mt-4 mb-2 flex items-center">
                      <span className="mr-2">❯</span>
                      {line.slice(4)}
                    </h3>
                  );
                }
                if (line.startsWith("- ")) {
                  return (
                    <div key={i} className="ml-6 text-gray-300 flex items-start">
                      <span className="mr-2 text-blue-400">•</span>
                      <span>{line.slice(2)}</span>
                    </div>
                  );
                }
                if (line.startsWith("**")) {
                  return (
                    <div key={i} className="font-bold text-purple-400">
                      {line.replace(/\*\*/g, "")}
                    </div>
                  );
                }
                if (line.startsWith("_")) {
                  return (
                    <div key={i} className="text-gray-500 italic text-sm">
                      {line.replace(/_/g, "")}
                    </div>
                  );
                }
                if (line.includes("@") || line.includes("http")) {
                  return (
                    <div key={i} className="text-blue-300 hover:underline cursor-pointer">
                      {line}
                    </div>
                  );
                }
                if (line.trim() !== "") {
                  return (
                    <div key={i} className="text-gray-300">
                      {line}
                    </div>
                  );
                }
                return <div key={i} className="h-2" />;
              })}
            </div>
          );

          setCommands((prev) => [
            ...prev,
            {
              input: "cat resume.md",
              output: formattedResume,
              timestamp: new Date().toLocaleTimeString(),
            },
          ]);
        });
    }
  }, [currentDirectory]);

  return (
    <div className="font-mono text-sm bg-black/90 rounded-lg p-4 h-[80vh] overflow-y-auto">
      <div className="text-green-400 mb-4">{getCurrentConfig().welcomeMessage}</div>
      <div className="text-gray-400 mb-4">Type 'help' for available commands</div>

      {commands.map((command, i) => (
        <div key={i} className="mb-2">
          <div className="flex items-center text-gray-400">
            <span className="text-green-400">crstjames@dev</span>
            <span className="text-white mx-1">:</span>
            <span className="text-blue-400">{currentDirectory}</span>
            <span className="text-white mx-1">$</span>
            <span className="text-white">{command.input}</span>
          </div>
          <div className="text-white ml-4">{command.output}</div>
        </div>
      ))}

      <div className="flex items-center">
        <span className="text-green-400">crstjames@dev</span>
        <span className="text-white mx-1">:</span>
        <span className="text-blue-400">{currentDirectory}</span>
        <span className="text-white mx-1">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCommand(input);
            }
          }}
          className="flex-1 bg-transparent outline-none text-white caret-white"
          autoFocus
          spellCheck={false}
        />
      </div>
      <div ref={commandsEndRef} />
    </div>
  );
};

export default Terminal;
