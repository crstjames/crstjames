import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, FileText, MessagesSquare } from "lucide-react";
import Image from "next/image";

export default function Sidebar() {
  return (
    <div className="fixed left-0 top-0 h-full w-16 flex flex-col justify-between py-4 border-r bg-background">
      {/* Logo Section */}
      <div className="flex justify-center">
        <Link href="/" className="relative w-8 h-8 hover:opacity-80 transition-opacity">
          <Image src="/logo.svg" alt="Logo" fill className="object-contain invert-0 dark:invert" priority />
        </Link>
      </div>

      {/* Social Links - Hidden on Mobile */}
      <div className="hidden md:flex flex-col gap-4 items-center pb-4">
        <Link href="mailto:christopher.stjames@gmail.com" className="hover:text-foreground/80">
          <Mail className="w-5 h-5" />
        </Link>
        <Link href="https://github.com/crstjames" className="hover:text-foreground/80">
          <Github className="w-5 h-5" />
        </Link>
        <Link href="https://linkedin.com/in/crstjames" className="hover:text-foreground/80">
          <Linkedin className="w-5 h-5" />
        </Link>
        <Link href="https://twitter.com/crstjames" className="hover:text-foreground/80">
          <Twitter className="w-5 h-5" />
        </Link>
        <Link href="https://t.me/crstjames" className="hover:text-foreground/80">
          <MessagesSquare className="w-5 h-5" />
        </Link>
        <Link href="/resume" className="hover:text-foreground/80">
          <FileText className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
