/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Link from "next/link";
import { Home } from "lucide-react";
import Image from "next/image";
import { socialLinks } from "@/lib/constants";

export default function Sidebar() {
  return (
    <div className="hidden md:fixed md:flex left-0 top-0 h-full w-16 flex-col justify-between py-4 border-r bg-background">
      {/* Logo and Navigation Section */}
      <div className="flex flex-col items-center gap-4">
        <Link href="/" className="relative w-8 h-8 hover:opacity-80 transition-opacity">
          <Image src="/logo.svg" alt="Logo" fill className="object-contain invert-0 dark:invert" priority />
        </Link>
        <Link href="/" className="hover:text-foreground/80">
          <Home className="w-5 h-5" />
        </Link>
      </div>

      {/* Social Links */}
      <div className="flex flex-col gap-4 items-center pb-4">
        {socialLinks.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-foreground/80">
            <link.icon className="w-5 h-5" />
          </Link>
        ))}
      </div>
    </div>
  );
}
