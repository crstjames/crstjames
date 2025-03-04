"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTerminal } from "@/contexts/TerminalContext";
import { socialLinks } from "@/lib/constants";
import { Terminal } from "lucide-react";

export default function TopNavBar() {
  const pathname = usePathname();
  const { setIsTerminalOpen } = useTerminal();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/work", label: "Work" },
    { href: "/resume", label: "Resume" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full px-4 py-3 bg-black/40 backdrop-blur-xl border-b border-emerald-500/10 shadow-lg shadow-emerald-500/5">
      <div className="flex items-center justify-center max-w-screen-xl w-full">
        <div className="flex bg-black/20 backdrop-blur-lg border border-emerald-500/10 rounded-full px-2 py-1.5">
          {/* Navigation Links */}
          <div className="flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-5 py-1.5 rounded-full transition-all duration-200 ${
                  pathname === link.href
                    ? "text-emerald-400 bg-emerald-500/10"
                    : "text-gray-300 hover:text-emerald-300 hover:bg-emerald-500/5"
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                {pathname === link.href && (
                  <span className="absolute inset-0 rounded-full bg-emerald-500/5 animate-pulse"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Social Links */}
          <div className="h-5 mx-3 border-r border-emerald-500/20"></div>
          <div className="flex space-x-1 px-1">
            {socialLinks.slice(0, 3).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-gray-300 hover:text-emerald-300 transition-colors"
                aria-label={link.label}
              >
                <link.icon className="w-4 h-4" />
              </Link>
            ))}
          </div>

          {/* Terminal Button */}
          <div className="h-5 mx-2 border-r border-emerald-500/20"></div>
          <button
            onClick={() => setIsTerminalOpen(true)}
            className="p-1.5 mx-1 text-gray-300 hover:text-emerald-300 transition-colors rounded-full hover:bg-emerald-500/5"
            aria-label="Open terminal"
          >
            <Terminal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
