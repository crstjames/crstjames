/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, FileText, MessagesSquare, Home, Menu } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const socialLinks = [
  { href: "mailto:christopher.stjames@gmail.com", icon: Mail, label: "Email" },
  { href: "https://github.com/crstjames", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com/in/crstjames", icon: Linkedin, label: "LinkedIn" },
  { href: "https://twitter.com/crstjames", icon: Twitter, label: "Twitter" },
  { href: "https://t.me/crstjames", icon: MessagesSquare, label: "Telegram" },
  { href: "/resume", icon: FileText, label: "Resume" },
];

export default function Sidebar() {
  return (
    <div className="fixed left-0 top-0 h-full w-16 flex flex-col justify-between py-4 border-r bg-background">
      {/* Logo and Navigation Section */}
      <div className="flex flex-col items-center gap-4">
        <Link href="/" className="relative w-8 h-8 hover:opacity-80 transition-opacity">
          <Image src="/logo.svg" alt="Logo" fill className="object-contain invert-0 dark:invert" priority />
        </Link>
        <Link href="/" className="hover:text-foreground/80">
          <Home className="w-5 h-5" />
        </Link>

        {/* Mobile Menu - Shown on small screens */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-5 w-5">
                <Menu className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {socialLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link href={link.href} className="flex items-center gap-2 px-2 py-1.5">
                    <link.icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Desktop Social Links - Hidden on Mobile */}
      <div className="hidden md:flex flex-col gap-4 items-center pb-4">
        {socialLinks.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-foreground/80">
            <link.icon className="w-5 h-5" />
          </Link>
        ))}
      </div>
    </div>
  );
}
