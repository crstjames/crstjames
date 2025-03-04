/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { socialLinks, type SocialLink } from "@/lib/constants";

interface NavLink {
  href: string;
  label: string;
}

const navigationLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/resume", label: "Resume" },
  { href: "/profile", label: "Profile" },
];

export default function TitleBar() {
  const [showBanner, setShowBanner] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowBanner(true);
    setTimeout(() => setShowBanner(false), 2000);
  };

  // Render icon function that handles the icon component properly
  const renderIcon = (IconComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>) => {
    return <IconComponent className="w-4 h-4" />;
  };

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 h-16 border-b bg-background z-50 px-4">
      <div className="h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative w-8 h-8 hover:opacity-80 transition-opacity">
          <Image src="/logo.svg" alt="Logo" fill className="object-contain invert-0 dark:invert" priority />
        </Link>

        {/* Mobile Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {/* Navigation Links */}
            {navigationLinks.map((link: NavLink) => (
              <DropdownMenuItem key={link.href} asChild>
                <Link href={link.href} className="w-full">
                  {link.label}
                </Link>
              </DropdownMenuItem>
            ))}

            <Separator className="my-2" />

            {/* Social Links */}
            {socialLinks.map((link: SocialLink) => {
              return link.type === "clipboard" ? (
                <DropdownMenuItem key={link.href} asChild>
                  <button
                    onClick={() => copyToClipboard(link.href)}
                    className="flex items-center gap-2 w-full text-left"
                  >
                    {renderIcon(link.icon)}
                    <span>{link.label}</span>
                  </button>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem key={link.href} asChild>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 w-full"
                  >
                    {renderIcon(link.icon)}
                    <span>{link.label}</span>
                  </Link>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Notification Banner */}
      {showBanner && (
        <div className="fixed top-16 right-4 bg-emerald-500 text-white px-4 py-2 rounded-md shadow-lg transition-opacity z-50 flex items-center">
          <span className="text-sm font-mono">Email copied to clipboard!</span>
        </div>
      )}
    </div>
  );
}
