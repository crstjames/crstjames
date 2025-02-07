"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  HomeIcon,
  PersonIcon,
  LayersIcon,
  MixIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
  SunIcon,
  MoonIcon,
} from "@radix-ui/react-icons";
import { useTerminal } from "@/contexts/TerminalContext";

const NavigationBar = () => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { setCurrentDirectory } = useTerminal();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Prevent theme icon flash during hydration
  const themeIcon = mounted && theme === "dark" ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />;

  const navItems = [
    { name: "Home", path: "/", icon: <HomeIcon className="w-5 h-5" /> },
    { name: "Resume", path: "/resume", icon: <PersonIcon className="w-5 h-5" /> },
    { name: "Projects", path: "/projects", icon: <LayersIcon className="w-5 h-5" /> },
    { name: "Blog", path: "/blog", icon: <MixIcon className="w-5 h-5" /> },
    {
      name: "GitHub",
      path: "https://github.com/crstjames",
      icon: <GitHubLogoIcon className="w-5 h-5" />,
      external: true,
    },
    {
      name: "LinkedIn",
      path: "https://linkedin.com/in/crstjames",
      icon: <LinkedInLogoIcon className="w-5 h-5" />,
      external: true,
    },
    {
      name: "Twitter",
      path: "https://twitter.com/crstjames",
      icon: <TwitterLogoIcon className="w-5 h-5" />,
      external: true,
    },
    {
      name: "Theme",
      path: "#",
      icon: themeIcon,
      onClick: handleThemeToggle,
    },
  ];

  const handleNavigation = (path: string) => {
    const directory = path === "/" ? "~" : `~${path}`;
    setCurrentDirectory(directory);
  };

  if (!mounted) {
    return null; // or a loading skeleton
  }

  return (
    <nav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-nav-background backdrop-blur-lg rounded-full px-6 py-3 shadow-lg">
      <ul className="flex items-center justify-center gap-6">
        {navItems.map((item) => {
          const isActive = pathname === item.path;

          if (item.external) {
            return (
              <li key={item.name} className="flex items-center">
                <a
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-125"
                  title={item.name}
                >
                  {item.icon}
                </a>
              </li>
            );
          }

          if (item.onClick) {
            return (
              <li key={item.name} className="flex items-center">
                <button
                  onClick={item.onClick}
                  className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-125"
                  title={item.name}
                >
                  {item.icon}
                </button>
              </li>
            );
          }

          return (
            <li key={item.name} className="flex items-center">
              <Link
                href={item.path}
                className={`${
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                } transition-all duration-200 hover:scale-125`}
                title={item.name}
                onClick={() => handleNavigation(item.path)}
              >
                {item.icon}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavigationBar;
