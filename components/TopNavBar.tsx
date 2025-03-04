"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTerminal } from "@/contexts/TerminalContext";
import { socialLinks } from "@/lib/constants";
import { Terminal, Menu, X } from "lucide-react";

export default function TopNavBar() {
  const pathname = usePathname();
  const { setIsTerminalOpen } = useTerminal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/resume", label: "Resume" },
    { href: "/work", label: "Work" },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowBanner(true);
    setTimeout(() => setShowBanner(false), 2000);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full px-4 py-3 font-mono bg-background/80 backdrop-blur-sm border-b border-gray-800/30">
      <div className="max-w-screen-xl mx-auto flex items-center">
        {/* Terminal prompt - centered at all widths */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <span className="flex items-center">
              <span className="text-md text-emerald-400 mr-0.5">~</span>
              <span className="text-md text-violet-400">$</span>
              <span className="text-md text-emerald-400 mr-0.5 ml-1">stjames.dev</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-4 py-1 transition-all duration-200 ${
                pathname === link.href ? "text-emerald-400" : "text-gray-300 hover:text-emerald-300"
              }`}
            >
              <span className="relative z-10">{pathname === link.href ? `> ${link.label}` : link.label}</span>
            </Link>
          ))}
        </div>

        {/* Right side items */}
        <div className="ml-auto flex items-center space-x-3">
          {/* Social Links - Desktop only */}
          <div className="hidden sm:flex space-x-3">
            {socialLinks.map((link) =>
              link.type === "clipboard" ? (
                <button
                  key={link.href}
                  onClick={() => copyToClipboard(link.href)}
                  className="text-gray-300 hover:text-emerald-300 transition-colors text-sm"
                  aria-label={link.label}
                >
                  <link.icon className="w-4 h-4" />
                </button>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-emerald-300 transition-colors text-sm"
                  aria-label={link.label}
                >
                  <link.icon className="w-4 h-4" />
                </Link>
              )
            )}
          </div>

          {/* Terminal Button */}
          <button
            onClick={() => setIsTerminalOpen(true)}
            className="text-emerald-400 hover:text-emerald-300 transition-colors"
            aria-label="Open terminal"
          >
            <Terminal className="w-4 h-4 inline-block" />
          </button>

          {/* Mobile menu button */}
          <button
            className="sm:hidden text-emerald-400 hover:text-emerald-300 transition-colors ml-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden mt-3 pb-2 border-t border-emerald-800/30 pt-2">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-1.5 transition-all duration-200 ${
                  pathname === link.href ? "text-emerald-400" : "text-gray-300 hover:text-emerald-300"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{pathname === link.href ? `> ${link.label}` : link.label}</span>
              </Link>
            ))}
            <div className="border-t border-emerald-800/30 my-1"></div>
            <div className="flex space-x-4 px-4 py-1.5">
              {socialLinks.map((link) =>
                link.type === "clipboard" ? (
                  <button
                    key={link.href}
                    onClick={() => copyToClipboard(link.href)}
                    className="text-gray-300 hover:text-emerald-300 transition-colors"
                    aria-label={link.label}
                  >
                    <link.icon className="w-4 h-4" />
                  </button>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-emerald-300 transition-colors"
                    aria-label={link.label}
                  >
                    <link.icon className="w-4 h-4" />
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* Notification Banner */}
      {showBanner && (
        <div className="fixed top-16 right-4 bg-emerald-500 text-white px-4 py-2 rounded-md shadow-lg transition-opacity z-50 flex items-center">
          <span className="text-sm font-mono">Email copied to clipboard!</span>
        </div>
      )}
    </div>
  );
}
