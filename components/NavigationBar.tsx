/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  HomeIcon,
  LayersIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
  EnvelopeClosedIcon,
  ChatBubbleIcon,
  CodeIcon,
} from "@radix-ui/react-icons";
import { useTerminal } from "@/contexts/TerminalContext";

const IconButton = ({ icon: Icon, label, onClick }: { icon: typeof HomeIcon; label: string; onClick?: () => void }) => (
  <button onClick={onClick} className="group relative flex flex-col items-center" aria-label={label}>
    <Icon className="h-6 w-6 transition-all duration-200 group-hover:h-7 group-hover:w-7 text-muted-foreground group-hover:text-foreground" />
    <span className="absolute -bottom-8 scale-0 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 text-xs bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md whitespace-nowrap">
      {label}
    </span>
  </button>
);

const NavigationBar = () => {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { setIsTerminalOpen } = useTerminal();

  useEffect(() => {
    setMounted(true);
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        console.log("⌘K pressed");
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [setIsTerminalOpen]);

  if (!mounted) return null;

  const navItems = [
    { href: "/", icon: HomeIcon, label: "home" },
    { href: "/projects", icon: LayersIcon, label: "Projects" },
  ];

  const socialLinks = [
    { href: "https://github.com/crstjames", icon: GitHubLogoIcon, label: "GitHub" },
    { href: "https://linkedin.com/in/crstjames", icon: LinkedInLogoIcon, label: "LinkedIn" },
    { href: "https://twitter.com/crstjames", icon: TwitterLogoIcon, label: "Twitter" },
    { href: "mailto:chris@stjames.dev", icon: EnvelopeClosedIcon, label: "Email" },
    { href: "https://t.me/crstjames", icon: ChatBubbleIcon, label: "Telegram" },
  ];

  return (
    <div className="fixed bottom-8 left-0 right-0 flex justify-center z-40">
      <nav
        className={`${
          theme === "dark" ? "bg-black/90" : "bg-white/90"
        } backdrop-blur-md rounded-full border border-muted px-6 py-3 transition-all duration-300 hover:shadow-lg`}
      >
        <div className="flex items-center space-x-6">
          {navItems.map(({ href, icon: Icon, label }) => (
            <Link key={href} href={href} className="group relative flex flex-col items-center">
              <Icon
                className={`h-6 w-6 transition-all duration-200 group-hover:h-7 group-hover:w-7 ${
                  pathname === href ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                }`}
              />
              <span className="absolute -bottom-8 scale-0 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 text-xs bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md whitespace-nowrap">
                {label}
              </span>
            </Link>
          ))}

          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center"
              aria-label={label}
            >
              <Icon className="h-6 w-6 transition-all duration-200 group-hover:h-7 group-hover:w-7 text-muted-foreground group-hover:text-foreground" />
              <span className="absolute -bottom-8 scale-0 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 text-xs bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md whitespace-nowrap">
                {label}
              </span>
            </a>
          ))}

          <IconButton
            icon={CodeIcon}
            label="Terminal (⌘K)"
            onClick={() => {
              console.log("Terminal button clicked");
              setIsTerminalOpen((prev) => !prev);
            }}
          />
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;
