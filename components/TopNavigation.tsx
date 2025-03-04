"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useState } from "react";
import { Github, Linkedin, Twitter, Mail, FileText, MessagesSquare } from "lucide-react";

export default function TopNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const socialLinks = [
    { href: "mailto:chris@eversaint.com", icon: Mail, label: "Email" },
    { href: "https://github.com/crstjames", icon: Github, label: "GitHub" },
    { href: "https://linkedin.com/in/crstjames", icon: Linkedin, label: "LinkedIn" },
    { href: "https://twitter.com/crstjames", icon: Twitter, label: "Twitter" },
    { href: "https://t.me/crstjames", icon: MessagesSquare, label: "Telegram" },
    { href: "/resume", icon: FileText, label: "Resume" },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex fixed right-4 top-4 gap-4">
        <Link href="/" className="hover:text-foreground/80">
          home
        </Link>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed right-4 top-4">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            <SheetTitle>Navigation</SheetTitle>
            <div className="flex flex-col gap-6 mt-8">
              <Link href="/" className="hover:text-foreground/80 text-lg" onClick={() => setIsOpen(false)}>
                home
              </Link>
              <div className="h-px bg-border" /> {/* Divider */}
              {/* Social Links */}
              <div className="flex flex-col gap-4">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-3 hover:text-foreground/80"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
